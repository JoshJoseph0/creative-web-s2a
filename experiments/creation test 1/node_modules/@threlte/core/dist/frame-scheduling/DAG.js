export class DAG {
    allVertices = new Map();
    /** Nodes that are fully unlinked */
    isolatedVertices = new Map();
    connectedVertices = new Map();
    sortedConnectedValues = [];
    needsSort = false;
    listeners = new Map();
    emit(type, data) {
        const set = this.listeners.get(type);
        if (set) {
            for (const handler of set)
                handler(data);
        }
    }
    on(type, handler) {
        let set = this.listeners.get(type);
        if (!set) {
            set = new Set();
            this.listeners.set(type, set);
        }
        set.add(handler);
    }
    off(type, handler) {
        this.listeners.get(type)?.delete(handler);
    }
    get sortedVertices() {
        return this.mapNodes((value) => value);
    }
    moveToIsolated(key) {
        const vertex = this.connectedVertices.get(key);
        if (!vertex)
            return;
        this.isolatedVertices.set(key, vertex);
        this.connectedVertices.delete(key);
    }
    moveToConnected(key) {
        const vertex = this.isolatedVertices.get(key);
        if (!vertex)
            return;
        this.connectedVertices.set(key, vertex);
        this.isolatedVertices.delete(key);
    }
    getKey = (v) => {
        if (typeof v === 'object') {
            return v.key;
        }
        return v;
    };
    add(key, value, options) {
        let vertex = this.allVertices.get(key);
        if (vertex && vertex.value !== undefined) {
            throw new Error(`A node with the key ${key.toString()} already exists`);
        }
        if (!vertex) {
            vertex = {
                value: value,
                previous: new Set(),
                next: new Set()
            };
            // add the vertex to the list of all vertices
            this.allVertices.set(key, vertex);
        }
        else if (vertex.value === undefined) {
            vertex.value = value;
        }
        // if another node referenced this node before, we have inverse links
        const hasEdges = vertex.next.size > 0 || vertex.previous.size > 0;
        if (!options?.after && !options?.before && !hasEdges) {
            // the node we're about to add is fully unlinked
            this.isolatedVertices.set(key, vertex);
            this.emit('node:added', {
                key,
                type: 'isolated',
                value
            });
            return;
        }
        else {
            this.connectedVertices.set(key, vertex);
        }
        if (options?.after) {
            const afterArr = Array.isArray(options.after) ? options.after : [options.after];
            // we need to update the vertex to include the new "after" nodes
            for (const after of afterArr) {
                vertex.previous.add(this.getKey(after));
            }
            for (const after of afterArr) {
                const afterKey = this.getKey(after);
                // we get the vertex from the list of all vertices
                const linkedAfter = this.allVertices.get(afterKey);
                if (!linkedAfter) {
                    // if it doesn't exist, we create it
                    const newVertex = {
                        value: undefined, // uninitialized
                        previous: new Set(),
                        next: new Set([key])
                    };
                    this.allVertices.set(afterKey, newVertex);
                    this.connectedVertices.set(afterKey, newVertex);
                }
                else {
                    // if it does exist, we update it
                    linkedAfter.next.add(key);
                    // we might need to move the vertex from isolated to connected
                    this.moveToConnected(afterKey);
                }
            }
        }
        if (options?.before) {
            const beforeArr = Array.isArray(options.before) ? options.before : [options.before];
            // we need to update the vertex to include the new "before" nodes
            for (const before of beforeArr) {
                vertex.next.add(this.getKey(before));
            }
            for (const before of beforeArr) {
                const beforeKey = this.getKey(before);
                // we get the vertex from the list of all vertices
                const linkedBefore = this.allVertices.get(beforeKey);
                if (!linkedBefore) {
                    // if it doesn't exist, we create it
                    const newVertex = {
                        value: undefined, // uninitialized
                        previous: new Set([key]),
                        next: new Set()
                    };
                    this.allVertices.set(beforeKey, newVertex);
                    this.connectedVertices.set(beforeKey, newVertex);
                }
                else {
                    // if it does exist, we update it
                    linkedBefore.previous.add(key);
                    // we might need to move the vertex from isolated to connected
                    this.moveToConnected(beforeKey);
                }
            }
        }
        this.emit('node:added', {
            key,
            type: 'connected',
            value
        });
        // Mark the graph as needing a re-sort
        this.needsSort = true;
    }
    remove(key) {
        const removeKey = this.getKey(key);
        // check if it's an unlinked vertex
        const unlinkedVertex = this.isolatedVertices.get(removeKey);
        if (unlinkedVertex) {
            this.isolatedVertices.delete(removeKey);
            this.allVertices.delete(removeKey);
            this.emit('node:removed', {
                key: removeKey,
                type: 'isolated'
            });
            return;
        }
        // if it's not, it's a bit more complicated
        const linkedVertex = this.connectedVertices.get(removeKey);
        if (!linkedVertex || linkedVertex.value === undefined) {
            // The node does not exist in the graph, or is a phantom placeholder
            // created by another node's before/after constraint. Don't remove
            // phantoms — they hold ordering edges for the real node when it arrives.
            return;
        }
        // Update the 'next' nodes that this node points to
        for (const nextKey of linkedVertex.next) {
            const nextVertex = this.connectedVertices.get(nextKey);
            if (nextVertex) {
                nextVertex.previous.delete(removeKey);
                if (nextVertex.previous.size === 0 && nextVertex.next.size === 0) {
                    this.moveToIsolated(nextKey);
                }
            }
        }
        // Update the 'previous' nodes that point to this node
        for (const prevKey of linkedVertex.previous) {
            const prevVertex = this.connectedVertices.get(prevKey);
            if (prevVertex) {
                prevVertex.next.delete(removeKey);
                if (prevVertex.previous.size === 0 && prevVertex.next.size === 0) {
                    this.moveToIsolated(prevKey);
                }
            }
        }
        // Finally, remove the node from the graph
        this.connectedVertices.delete(removeKey);
        this.allVertices.delete(removeKey);
        this.emit('node:removed', {
            key: removeKey,
            type: 'connected'
        });
        // Mark the graph as needing a re-sort
        this.needsSort = true;
    }
    mapNodes(callback) {
        if (this.needsSort) {
            this.sort();
        }
        const result = [];
        this.forEachNode((value, index) => {
            result.push(callback(value, index));
        });
        return result;
    }
    forEachNode(callback) {
        if (this.needsSort) {
            this.sort();
        }
        let index = 0;
        for (; index < this.sortedConnectedValues.length; index++) {
            callback(this.sortedConnectedValues[index], index);
        }
        for (const vertex of this.isolatedVertices.values()) {
            if (vertex.value !== undefined)
                callback(vertex.value, index++);
        }
    }
    getValueByKey(key) {
        return this.allVertices.get(key)?.value;
    }
    sort() {
        const inDegree = new Map();
        const zeroInDegreeQueue = [];
        const result = [];
        // Initialize inDegree for connected vertices that have a value
        for (const [key, vertex] of this.connectedVertices) {
            if (vertex.value !== undefined) {
                inDegree.set(key, 0);
            }
        }
        // Calculate inDegree for each vertex
        for (const [vertexKey] of inDegree) {
            const vertex = this.connectedVertices.get(vertexKey);
            for (const next of vertex.next) {
                if (inDegree.has(next)) {
                    inDegree.set(next, inDegree.get(next) + 1);
                }
            }
        }
        // Enqueue vertices with inDegree 0
        for (const [key, degree] of inDegree) {
            if (degree === 0) {
                zeroInDegreeQueue.push(key);
            }
        }
        // Process vertices with inDegree 0 and decrease inDegree of adjacent vertices
        let queueIndex = 0;
        while (queueIndex < zeroInDegreeQueue.length) {
            const vertexKey = zeroInDegreeQueue[queueIndex++];
            result.push(vertexKey);
            const nextSet = this.connectedVertices.get(vertexKey)?.next;
            if (nextSet) {
                for (const adjVertex of nextSet) {
                    const adjVertexInDegree = (inDegree.get(adjVertex) || 0) - 1;
                    inDegree.set(adjVertex, adjVertexInDegree);
                    if (adjVertexInDegree === 0) {
                        zeroInDegreeQueue.push(adjVertex);
                    }
                }
            }
        }
        // Check for cycles in the graph
        if (result.length !== inDegree.size) {
            throw new Error('The graph contains a cycle, and thus can not be sorted topologically.');
        }
        this.sortedConnectedValues.length = 0;
        for (let i = 0; i < result.length; i++) {
            const value = this.connectedVertices.get(result[i]).value;
            if (value !== undefined) {
                this.sortedConnectedValues.push(value);
            }
        }
        this.needsSort = false;
    }
    clear() {
        this.allVertices.clear();
        this.isolatedVertices.clear();
        this.connectedVertices.clear();
        this.sortedConnectedValues = [];
        this.needsSort = false;
    }
    static isKey(value) {
        return typeof value === 'string' || typeof value === 'symbol';
    }
    static isValue(value) {
        return typeof value === 'object' && 'key' in value;
    }
}
