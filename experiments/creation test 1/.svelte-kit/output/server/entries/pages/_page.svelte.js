import { L as source, N as increment, S as effect_tracking, T as render_effect, U as queue_micro_task, V as without_reactive_context, bt as noop, c as setContext, d as active_effect, et as safe_not_equal, f as active_reaction, g as untrack, h as set_active_reaction, ht as EFFECT_TRANSPARENT, m as set_active_effect, mt as EFFECT_PRESERVED, n as derived, o as spread_props, p as get$1, r as head, s as getContext, t as bind_props, u as subscribe_to_store, yt as define_property } from "../../chunks/server.js";
import "../../chunks/index-server.js";
import * as THREE from "three";
import { REVISION, SphereGeometry } from "three";
import FastNoiseLite from "fastnoise-lite";
// node_modules/svelte/src/store/shared/index.js
/** @import { Readable, StartStopNotifier, Subscriber, Unsubscriber, Updater, Writable } from '../public.js' */
/** @import { Stores, StoresValues, SubscribeInvalidateTuple } from '../private.js' */
/**
* @type {Array<SubscribeInvalidateTuple<any> | any>}
*/
var subscriber_queue = [];
/**
* Creates a `Readable` store that allows reading by subscription.
*
* @template T
* @param {T} [value] initial value
* @param {StartStopNotifier<T>} [start]
* @returns {Readable<T>}
*/
function readable(value, start) {
	return { subscribe: writable(value, start).subscribe };
}
/**
* Create a `Writable` store that allows both updating and reading by subscription.
*
* @template T
* @param {T} [value] initial value
* @param {StartStopNotifier<T>} [start]
* @returns {Writable<T>}
*/
function writable(value, start = noop) {
	/** @type {Unsubscriber | null} */
	let stop = null;
	/** @type {Set<SubscribeInvalidateTuple<T>>} */
	const subscribers = /* @__PURE__ */ new Set();
	/**
	* @param {T} new_value
	* @returns {void}
	*/
	function set(new_value) {
		if (safe_not_equal(value, new_value)) {
			value = new_value;
			if (stop) {
				const run_queue = !subscriber_queue.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue.length; i += 2) subscriber_queue[i][0](subscriber_queue[i + 1]);
					subscriber_queue.length = 0;
				}
			}
		}
	}
	/**
	* @param {Updater<T>} fn
	* @returns {void}
	*/
	function update(fn) {
		set(fn(value));
	}
	/**
	* @param {Subscriber<T>} run
	* @param {() => void} [invalidate]
	* @returns {Unsubscriber}
	*/
	function subscribe(run, invalidate = noop) {
		/** @type {SubscribeInvalidateTuple<T>} */
		const subscriber = [run, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) stop = start(set, update) || noop;
		run(value);
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0 && stop) {
				stop();
				stop = null;
			}
		};
	}
	return {
		set,
		update,
		subscribe
	};
}
/**
* Get the current value from a store by subscribing and immediately unsubscribing.
*
* @template T
* @param {Readable<T>} store
* @returns {T}
*/
function get(store) {
	let value;
	subscribe_to_store(store, (_) => value = _)();
	return value;
}
// node_modules/svelte/src/store/index-server.js
/** @import { Readable, Writable } from './public.js' */
/**
* @template V
* @overload
* @param {() => V} get
* @param {(v: V) => void} set
* @returns {Writable<V>}
*/
/**
* @template V
* @overload
* @param {() => V} get
* @returns {Readable<V>}
*/
/**
* Create a store from a function that returns state, and (to make a writable store), an
* optional second function that sets state.
*
* ```ts
* import { toStore } from 'svelte/store';
*
* let count = $state(0);
*
* const store = toStore(() => count, (v) => (count = v));
* ```
* @template V
* @param {() => V} get
* @param {(v: V) => void} [set]
* @returns {Writable<V> | Readable<V>}
*/
function toStore(get, set) {
	const store = writable(get());
	if (set) return {
		set,
		update: (fn) => set(fn(get())),
		subscribe: store.subscribe
	};
	return { subscribe: store.subscribe };
}
/**
* @template V
* @overload
* @param {Writable<V>} store
* @returns {{ current: V }}
*/
/**
* @template V
* @overload
* @param {Readable<V>} store
* @returns {{ readonly current: V }}
*/
/**
* Convert a store to an object with a reactive `current` property. If `store`
* is a readable store, `current` will be a readonly property.
*
* ```ts
* import { fromStore, get, writable } from 'svelte/store';
*
* const store = writable(0);
*
* const count = fromStore(store);
*
* count.current; // 0;
* store.set(1);
* count.current; // 1
*
* count.current += 1;
* get(store); // 2
* ```
* @template V
* @param {Writable<V> | Readable<V>} store
*/
function fromStore(store) {
	if ("set" in store) return {
		get current() {
			return get(store);
		},
		set current(v) {
			store.set(v);
		}
	};
	return { get current() {
		return get(store);
	} };
}
// node_modules/@threlte/core/dist/context/fragments/dom.svelte.js
var useDOM = () => {
	const context = getContext("threlte-dom-context");
	if (!context) throw new Error("useDOM can only be used in a child component to <Canvas>.");
	return context;
};
// node_modules/@threlte/core/dist/frame-scheduling/DAG.js
var DAG = class {
	allVertices = /* @__PURE__ */ new Map();
	/** Nodes that are fully unlinked */
	isolatedVertices = /* @__PURE__ */ new Map();
	connectedVertices = /* @__PURE__ */ new Map();
	sortedConnectedValues = [];
	needsSort = false;
	listeners = /* @__PURE__ */ new Map();
	emit(type, data) {
		const set = this.listeners.get(type);
		if (set) for (const handler of set) handler(data);
	}
	on(type, handler) {
		let set = this.listeners.get(type);
		if (!set) {
			set = /* @__PURE__ */ new Set();
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
		if (!vertex) return;
		this.isolatedVertices.set(key, vertex);
		this.connectedVertices.delete(key);
	}
	moveToConnected(key) {
		const vertex = this.isolatedVertices.get(key);
		if (!vertex) return;
		this.connectedVertices.set(key, vertex);
		this.isolatedVertices.delete(key);
	}
	getKey = (v) => {
		if (typeof v === "object") return v.key;
		return v;
	};
	add(key, value, options) {
		let vertex = this.allVertices.get(key);
		if (vertex && vertex.value !== void 0) throw new Error(`A node with the key ${key.toString()} already exists`);
		if (!vertex) {
			vertex = {
				value,
				previous: /* @__PURE__ */ new Set(),
				next: /* @__PURE__ */ new Set()
			};
			this.allVertices.set(key, vertex);
		} else if (vertex.value === void 0) vertex.value = value;
		const hasEdges = vertex.next.size > 0 || vertex.previous.size > 0;
		if (!options?.after && !options?.before && !hasEdges) {
			this.isolatedVertices.set(key, vertex);
			this.emit("node:added", {
				key,
				type: "isolated",
				value
			});
			return;
		} else this.connectedVertices.set(key, vertex);
		if (options?.after) {
			const afterArr = Array.isArray(options.after) ? options.after : [options.after];
			for (const after of afterArr) vertex.previous.add(this.getKey(after));
			for (const after of afterArr) {
				const afterKey = this.getKey(after);
				const linkedAfter = this.allVertices.get(afterKey);
				if (!linkedAfter) {
					const newVertex = {
						value: void 0,
						previous: /* @__PURE__ */ new Set(),
						next: /* @__PURE__ */ new Set([key])
					};
					this.allVertices.set(afterKey, newVertex);
					this.connectedVertices.set(afterKey, newVertex);
				} else {
					linkedAfter.next.add(key);
					this.moveToConnected(afterKey);
				}
			}
		}
		if (options?.before) {
			const beforeArr = Array.isArray(options.before) ? options.before : [options.before];
			for (const before of beforeArr) vertex.next.add(this.getKey(before));
			for (const before of beforeArr) {
				const beforeKey = this.getKey(before);
				const linkedBefore = this.allVertices.get(beforeKey);
				if (!linkedBefore) {
					const newVertex = {
						value: void 0,
						previous: /* @__PURE__ */ new Set([key]),
						next: /* @__PURE__ */ new Set()
					};
					this.allVertices.set(beforeKey, newVertex);
					this.connectedVertices.set(beforeKey, newVertex);
				} else {
					linkedBefore.previous.add(key);
					this.moveToConnected(beforeKey);
				}
			}
		}
		this.emit("node:added", {
			key,
			type: "connected",
			value
		});
		this.needsSort = true;
	}
	remove(key) {
		const removeKey = this.getKey(key);
		if (this.isolatedVertices.get(removeKey)) {
			this.isolatedVertices.delete(removeKey);
			this.allVertices.delete(removeKey);
			this.emit("node:removed", {
				key: removeKey,
				type: "isolated"
			});
			return;
		}
		const linkedVertex = this.connectedVertices.get(removeKey);
		if (!linkedVertex || linkedVertex.value === void 0) return;
		for (const nextKey of linkedVertex.next) {
			const nextVertex = this.connectedVertices.get(nextKey);
			if (nextVertex) {
				nextVertex.previous.delete(removeKey);
				if (nextVertex.previous.size === 0 && nextVertex.next.size === 0) this.moveToIsolated(nextKey);
			}
		}
		for (const prevKey of linkedVertex.previous) {
			const prevVertex = this.connectedVertices.get(prevKey);
			if (prevVertex) {
				prevVertex.next.delete(removeKey);
				if (prevVertex.previous.size === 0 && prevVertex.next.size === 0) this.moveToIsolated(prevKey);
			}
		}
		this.connectedVertices.delete(removeKey);
		this.allVertices.delete(removeKey);
		this.emit("node:removed", {
			key: removeKey,
			type: "connected"
		});
		this.needsSort = true;
	}
	mapNodes(callback) {
		if (this.needsSort) this.sort();
		const result = [];
		this.forEachNode((value, index) => {
			result.push(callback(value, index));
		});
		return result;
	}
	forEachNode(callback) {
		if (this.needsSort) this.sort();
		let index = 0;
		for (; index < this.sortedConnectedValues.length; index++) callback(this.sortedConnectedValues[index], index);
		for (const vertex of this.isolatedVertices.values()) if (vertex.value !== void 0) callback(vertex.value, index++);
	}
	getValueByKey(key) {
		return this.allVertices.get(key)?.value;
	}
	sort() {
		const inDegree = /* @__PURE__ */ new Map();
		const zeroInDegreeQueue = [];
		const result = [];
		for (const [key, vertex] of this.connectedVertices) if (vertex.value !== void 0) inDegree.set(key, 0);
		for (const [vertexKey] of inDegree) {
			const vertex = this.connectedVertices.get(vertexKey);
			for (const next of vertex.next) if (inDegree.has(next)) inDegree.set(next, inDegree.get(next) + 1);
		}
		for (const [key, degree] of inDegree) if (degree === 0) zeroInDegreeQueue.push(key);
		let queueIndex = 0;
		while (queueIndex < zeroInDegreeQueue.length) {
			const vertexKey = zeroInDegreeQueue[queueIndex++];
			result.push(vertexKey);
			const nextSet = this.connectedVertices.get(vertexKey)?.next;
			if (nextSet) for (const adjVertex of nextSet) {
				const adjVertexInDegree = (inDegree.get(adjVertex) || 0) - 1;
				inDegree.set(adjVertex, adjVertexInDegree);
				if (adjVertexInDegree === 0) zeroInDegreeQueue.push(adjVertex);
			}
		}
		if (result.length !== inDegree.size) throw new Error("The graph contains a cycle, and thus can not be sorted topologically.");
		this.sortedConnectedValues.length = 0;
		for (let i = 0; i < result.length; i++) {
			const value = this.connectedVertices.get(result[i]).value;
			if (value !== void 0) this.sortedConnectedValues.push(value);
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
		return typeof value === "string" || typeof value === "symbol";
	}
	static isValue(value) {
		return typeof value === "object" && "key" in value;
	}
};
// node_modules/@threlte/core/dist/context/fragments/scheduler.svelte.js
var useScheduler = () => {
	const context = getContext("threlte-scheduler-context");
	if (!context) throw new Error("useScheduler can only be used in a child component to <Canvas>.");
	return context;
};
globalThis.Date;
globalThis.Set;
globalThis.Map;
globalThis.URL;
globalThis.URLSearchParams;
// node_modules/@threlte/core/dist/context/fragments/camera.svelte.js
var useCamera$1 = () => {
	const context = getContext("threlte-camera-context");
	if (!context) throw new Error("useCamera can only be used in a child component to <Canvas>.");
	return context;
};
// node_modules/@threlte/core/dist/context/fragments/disposal.svelte.js
var useDisposal = () => {
	const context = getContext("threlte-disposal-context");
	if (!context) throw new Error("useDisposal can only be used in a child component to <Canvas>.");
	return context;
};
// node_modules/@threlte/core/dist/context/fragments/parent.js
var parentContextKey = Symbol("threlte-parent-context");
/**
* The parent context is used to access the parent object created by a `<T>`
* component.
*/
var createParentContext = (parent) => {
	const context = { get current() {
		return parent();
	} };
	setContext(parentContextKey, context);
	return context;
};
/**
* The parent context is used to access the parent object created by a `<T>`
* component.
*
* @example
* ```svelte
* <T.Mesh>
*   <CustomComponent />
* </T.Mesh>
* ```
*
* The parent as retrieved inside the component `<CustomComponent>`
* will be the mesh created by the `<T.Mesh>` component.
*/
var useParent = () => {
	return getContext(parentContextKey);
};
// node_modules/@threlte/core/dist/context/fragments/parentObject3D.js
var parentObject3DContextKey = Symbol("threlte-parent-object3d-context");
/**
* The parentObject3D context is used to access the parent `THREE.Object3D`
* created by a `<T>` component. The context is automatically merged with the
* parentObject3D context of the parent component when the local context store
* is `undefined`.
*/
var createParentObject3DContext = (object) => {
	const parentObject3D = getContext(parentObject3DContextKey);
	const context = { get current() {
		return object() ?? parentObject3D.current;
	} };
	setContext(parentObject3DContextKey, context);
	return context;
};
/**
* The parentObject3D context is used to access the parent `THREE.Object3D`
* created by a `<T>` component.
*
* @example
* ```svelte
* <T.Mesh>
*   <T.MeshStandardMaterial>
*     <CustomComponent />
*   </T.MeshStandardMaterial>
* </T.Mesh>
* ```
*
* The parentObject3D as retrieved inside the component `<CustomComponent>`
* will be the mesh created by the `<T.Mesh>` component.
*/
var useParentObject3D = () => {
	return getContext(parentObject3DContextKey);
};
// node_modules/svelte/src/internal/client/dom/elements/events.js
/**
* Used on elements, as a map of event type -> event handler,
* and on events themselves to track which element handled an event
*/
var event_symbol = Symbol("events");
/**
* @param {string} event_name
* @param {EventTarget} dom
* @param {EventListener} [handler]
* @param {AddEventListenerOptions} [options]
*/
function create_event(event_name, dom, handler, options = {}) {
	/**
	* @this {EventTarget}
	*/
	function target_handler(event) {
		if (!options.capture) handle_event_propagation.call(dom, event);
		if (!event.cancelBubble) return without_reactive_context(() => {
			return handler?.call(this, event);
		});
	}
	if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
		target_handler.__removed = false;
		queue_micro_task(() => {
			if (!target_handler.__removed) dom.addEventListener(event_name, target_handler, options);
		});
	} else dom.addEventListener(event_name, target_handler, options);
	return target_handler;
}
/**
* Attaches an event handler to an element and returns a function that removes the handler. Using this
* rather than `addEventListener` will preserve the correct order relative to handlers added declaratively
* (with attributes like `onclick`), which use event delegation for performance reasons
*
* @param {EventTarget} element
* @param {string} type
* @param {EventListener} handler
* @param {AddEventListenerOptions} [options]
*/
function on(element, type, handler, options = {}) {
	var target_handler = create_event(type, element, handler, options);
	return () => {
		target_handler.__removed = true;
		element.removeEventListener(type, target_handler, options);
	};
}
var last_propagated_event = null;
var last_propagated_event_clear_scheduled = false;
/**
* @this {EventTarget}
* @param {Event} event
* @returns {void}
*/
function handle_event_propagation(event) {
	var handler_element = this;
	var owner_document = handler_element.ownerDocument;
	var event_name = event.type;
	var path = event.composedPath?.() || [];
	var current_target = path[0] || event.target;
	last_propagated_event = event;
	if (!last_propagated_event_clear_scheduled) {
		last_propagated_event_clear_scheduled = true;
		setTimeout(() => {
			last_propagated_event_clear_scheduled = false;
			last_propagated_event = null;
		});
	}
	var path_idx = 0;
	var handled_at = last_propagated_event === event && event[event_symbol];
	if (handled_at) {
		var at_idx = path.indexOf(handled_at);
		if (at_idx !== -1 && (handler_element === document || handler_element === window)) {
			event[event_symbol] = handler_element;
			return;
		}
		var handler_idx = path.indexOf(handler_element);
		if (handler_idx === -1) return;
		if (at_idx <= handler_idx) path_idx = at_idx;
	}
	current_target = path[path_idx] || event.target;
	if (current_target === handler_element) return;
	define_property(event, "currentTarget", {
		configurable: true,
		get() {
			return current_target || owner_document;
		}
	});
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		/**
		* @type {unknown}
		*/
		var throw_error;
		/**
		* @type {unknown[]}
		*/
		var other_errors = [];
		while (current_target !== null) {
			if (current_target === handler_element) break;
			try {
				var delegated = current_target[event_symbol]?.[event_name];
				if (delegated != null && (!current_target.disabled || event.target === current_target)) delegated.call(current_target, event);
			} catch (error) {
				if (throw_error) other_errors.push(error);
				else throw_error = error;
			}
			if (event.cancelBubble) break;
			path_idx++;
			current_target = path_idx < path.length ? path[path_idx] : null;
		}
		if (throw_error) {
			for (let error of other_errors) queueMicrotask(() => {
				throw error;
			});
			throw throw_error;
		}
	} finally {
		event[event_symbol] = handler_element;
		delete event.currentTarget;
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
// node_modules/svelte/src/reactivity/create-subscriber.js
/**
* Returns a `subscribe` function that integrates external event-based systems with Svelte's reactivity.
* It's particularly useful for integrating with web APIs like `MediaQuery`, `IntersectionObserver`, or `WebSocket`.
*
* If `subscribe` is called inside an effect (including indirectly, for example inside a getter),
* the `start` callback will be called with an `update` function. Whenever `update` is called, the effect re-runs.
*
* If `start` returns a cleanup function, it will be called when the effect is destroyed.
*
* If `subscribe` is called in multiple effects, `start` will only be called once as long as the effects
* are active, and the returned teardown function will only be called when all effects are destroyed.
*
* It's best understood with an example. Here's an implementation of [`MediaQuery`](https://svelte.dev/docs/svelte/svelte-reactivity#MediaQuery):
*
* ```js
* import { createSubscriber } from 'svelte/reactivity';
* import { on } from 'svelte/events';
*
* export class MediaQuery {
* 	#query;
* 	#subscribe;
*
* 	constructor(query) {
* 		this.#query = window.matchMedia(`(${query})`);
*
* 		this.#subscribe = createSubscriber((update) => {
* 			// when the `change` event occurs, re-run any effects that read `this.current`
* 			const off = on(this.#query, 'change', update);
*
* 			// stop listening when all the effects are destroyed
* 			return () => off();
* 		});
* 	}
*
* 	get current() {
* 		// This makes the getter reactive, if read in an effect
* 		this.#subscribe();
*
* 		// Return the current state of the query, whether or not we're in an effect
* 		return this.#query.matches;
* 	}
* }
* ```
* @param {(update: () => void) => (() => void) | void} start
* @since 5.7.0
*/
function createSubscriber(start) {
	let subscribers = 0;
	let version = source(0);
	/** @type {(() => void) | void} */
	let stop;
	return () => {
		if (effect_tracking()) {
			get$1(version);
			render_effect(() => {
				if (subscribers === 0) stop = untrack(() => start(() => increment(version)));
				subscribers += 1;
				return () => {
					queue_micro_task(() => {
						subscribers -= 1;
						if (subscribers === 0) {
							stop?.();
							stop = void 0;
							increment(version);
						}
					});
				};
			});
		}
	};
}
// node_modules/svelte/src/reactivity/reactive-value.js
/**
* @template T
*/
var ReactiveValue = class {
	#fn;
	#subscribe;
	/**
	*
	* @param {() => T} fn
	* @param {(update: () => void) => void} onsubscribe
	*/
	constructor(fn, onsubscribe) {
		this.#fn = fn;
		this.#subscribe = createSubscriber(onsubscribe);
	}
	get current() {
		this.#subscribe();
		return this.#fn();
	}
};
globalThis?.window?.trustedTypes;
EFFECT_TRANSPARENT | EFFECT_PRESERVED;
if (typeof HTMLElement === "function");
new ReactiveValue(() => void 0, (update) => on(window, "scroll", update));
new ReactiveValue(() => void 0, (update) => on(window, "scroll", update));
new ReactiveValue(() => void 0, (update) => on(window, "resize", update));
new ReactiveValue(() => void 0, (update) => on(window, "resize", update));
new ReactiveValue(() => void 0, (update) => on(window, "resize", update));
new ReactiveValue(() => void 0, (update) => on(window, "resize", update));
new ReactiveValue(() => void 0, (update) => {
	let value = window.screenLeft;
	let frame = requestAnimationFrame(function check() {
		frame = requestAnimationFrame(check);
		if (value !== (value = window.screenLeft)) update();
	});
	return () => {
		cancelAnimationFrame(frame);
	};
});
new ReactiveValue(() => void 0, (update) => {
	let value = window.screenTop;
	let frame = requestAnimationFrame(function check() {
		frame = requestAnimationFrame(check);
		if (value !== (value = window.screenTop)) update();
	});
	return () => {
		cancelAnimationFrame(frame);
	};
});
new ReactiveValue(() => void 0, (update) => {
	const unsub_online = on(window, "online", update);
	const unsub_offline = on(window, "offline", update);
	return () => {
		unsub_online();
		unsub_offline();
	};
});
// node_modules/@threlte/core/dist/utilities/isInstanceOf.js
/**
* Check if an object is an instance of a given THREE class. Can be used as a
* type guard and as an alternative to `instanceof` which is prone to error and
* slower. It uses the `isFoo` property that THREE classes have to determine if
* an object is of a particular class.
*
* @example
* ```ts
* const obj = new THREE.Object3D()
* isInstanceOf(obj, 'Object3D') // true
* ```
*
* @param obj - The object to check.
* @param type - The class name to check against.
* @returns `true` if the object is an instance of the class, `false` otherwise.
*/
var isInstanceOf = (obj, type) => {
	return obj?.[`is${type}`] === true;
};
// node_modules/@threlte/core/dist/components/T/utils/useCamera.svelte.js
var useCamera = (camera, manual, makeDefault, props) => {
	const { camera: defaultCamera, manual: defaultManual, makeDefaultCameras, makeDefaultCameraManual } = useCamera$1();
	const { invalidate } = useScheduler();
	const { size: sizeStore } = useDOM();
	fromStore(sizeStore);
};
// node_modules/@threlte/core/dist/Canvas.svelte
function Canvas($$renderer, $$props) {
	let { children, $$slots, $$events, ...rest } = $$props;
	$$renderer.push(`<div class="svelte-clyidt"><canvas class="svelte-clyidt">`);
	$$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></canvas></div>`);
}
// node_modules/@threlte/core/dist/components/T/utils/useAttach.svelte.js
var useAttach = (ref, attach) => {
	const { invalidate } = useScheduler();
	useParent();
	useParentObject3D();
};
// node_modules/@threlte/core/dist/components/T/utils/useDispose.svelte.js
var contextName = Symbol("threlte-disposable-object-context");
var useDispose = (object, dispose) => {
	const { disposableObjectMounted, disposableObjectUnmounted, removeObjectFromDisposal } = useDisposal();
	const parentDispose = getContext(contextName);
	const mergedDispose = derived(() => {
		const local = dispose();
		if (local !== void 0) return local !== false;
		if (parentDispose?.() === false) return false;
		return true;
	});
	setContext(contextName, () => mergedDispose());
};
// node_modules/@threlte/core/dist/components/T/utils/useIs.js
var currentIs;
var setIs = (is) => {
	currentIs = is;
};
var useIs = () => {
	const is = currentIs;
	currentIs = void 0;
	return is;
};
// node_modules/@threlte/core/dist/plugins/types.js
var pluginContextKey = "threlte-plugin-context";
// node_modules/@threlte/core/dist/components/T/utils/usePlugins.js
var usePlugins = (args) => {
	const plugins = getContext(pluginContextKey);
	if (!plugins) return;
	const pluginsProps = [];
	const pluginsArray = Object.values(plugins);
	if (pluginsArray.length > 0) for (let i = 0; i < pluginsArray.length; i++) {
		const plugin = pluginsArray[i];
		const p = plugin(args);
		if (p && p.pluginProps) pluginsProps.push(...p.pluginProps);
	}
	return { pluginsProps };
};
// node_modules/@threlte/core/dist/components/T/utils/useProps.svelte.js
var useProps = (object, props, pluginProps) => {
	const { invalidate } = useScheduler();
	/**
	* Prop keys are tracked separately from their values, so a key added after
	* mount (e.g. to a spread object) still gets its own effect below. The same
	* array is returned while the keys are unchanged, so value changes don't
	* re-run that effect. `Reflect.ownKeys` avoids reading values where it can.
	*/
	let previousKeys = [];
	derived(() => {
		const nextKeys = Reflect.ownKeys(props()).filter((key) => typeof key === "string");
		if (nextKeys.length !== previousKeys.length || nextKeys.some((key, index) => key !== previousKeys[index])) previousKeys = nextKeys;
		return previousKeys;
	});
};
// node_modules/@threlte/core/dist/components/T/utils/utils.js
/**
* Short cicruits if the input is not a function, then calls toString on Function with guaranteed safe behavior
*/
var isClass = (input) => {
	return typeof input === "function" && Function.prototype.toString.call(input).startsWith("class ");
};
var determineRef = (is, args) => {
	if (isClass(is)) {
		if (Array.isArray(args)) return new is(...args);
		else return new is();
	}
	return is;
};
// node_modules/@threlte/core/dist/components/T/Camera.svelte
function Camera($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref, manual = false, makeDefault = false, $$slots, $$events, ...rest } = $$props;
		useCamera(() => ref, () => manual, () => makeDefault, () => rest);
	});
}
// node_modules/@threlte/core/dist/components/T/T.svelte
function T$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { is = useIs(), args, attach, dispose, ref = void 0, oncreate, children, makeDefault, manual, $$slots, $$events, ...props } = $$props;
		/**
		* When "is" or "args" change, we need to create a new ref.
		*/
		const internalRef = derived(() => determineRef(is, args));
		const plugins = usePlugins({
			get ref() {
				return internalRef();
			},
			get args() {
				return args;
			},
			get attach() {
				return attach;
			},
			get manual() {
				return manual;
			},
			get makeDefault() {
				return makeDefault;
			},
			get dispose() {
				return dispose;
			},
			get props() {
				return props;
			}
		});
		useProps(() => internalRef(), () => props, () => plugins?.pluginsProps);
		useAttach(() => internalRef(), () => attach);
		useDispose(() => internalRef(), () => dispose);
		createParentObject3DContext(() => isInstanceOf(internalRef(), "Object3D") ? internalRef() : void 0);
		createParentContext(() => internalRef());
		if (isInstanceOf(internalRef(), "PerspectiveCamera") || isInstanceOf(internalRef(), "OrthographicCamera")) {
			$$renderer.push("<!--[0-->");
			Camera($$renderer, spread_props([{
				ref: internalRef(),
				manual,
				makeDefault
			}, props]));
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		children?.($$renderer, { ref: internalRef() });
		$$renderer.push(`<!---->`);
		bind_props($$props, { ref });
	});
}
// node_modules/@threlte/core/dist/components/T/T.js
var catalogue = {};
/**
* ## `<T>`
*
* Threlte's `<T>` component is a wrapper around Three.js objects. It is a generic component that can be used to create any Three.js object.
*
* @example
*
* ```svelte
* <script>
* 	import { T } from 'threlte'
* <\/script>
*
* <T.PerspectiveCamera makeDefault />
*
* <T.Mesh>
* 	<T.BoxGeometry />
* 	<T.MeshBasicMaterial color="red" />
* </T.Mesh>
* ```
*/
var T = new Proxy(T$1, { get(_target, is) {
	if (typeof is !== "string") return Reflect.get(_target, is);
	const module = catalogue[is] || THREE[is];
	if (module === void 0) throw new Error(`No Three.js module found for ${is}. Did you forget to extend the catalogue?`);
	return (...args) => {
		setIs(module);
		return T$1(...args);
	};
} });
// node_modules/@threlte/core/dist/utilities/browser.js
var browser = typeof window !== "undefined";
// node_modules/@threlte/core/dist/hooks/useTask.svelte.js
function useTask(keyOrFn, fnOrOptions, options) {
	if (!browser) return {
		task: void 0,
		start: () => void 0,
		stop: () => void 0,
		started: readable(false)
	};
	let key;
	let fn;
	let opts;
	if (DAG.isKey(keyOrFn)) {
		key = keyOrFn;
		fn = fnOrOptions;
		opts = options;
	} else {
		key = Symbol("useTask");
		fn = keyOrFn;
		opts = fnOrOptions;
	}
	const schedulerCtx = useScheduler();
	opts?.autoInvalidate;
	let stage = schedulerCtx.mainStage;
	let running = derived(() => opts?.running?.() ?? opts?.autoStart ?? true);
	if (opts) {
		if (opts.stage) {
			if (DAG.isValue(opts.stage)) stage = opts.stage;
			else {
				const maybeStage = schedulerCtx.scheduler.getStage(opts.stage);
				if (!maybeStage) throw new Error(`No stage found with key ${opts.stage.toString()}`);
				stage = maybeStage;
			}
		} else if (opts.after) {
			if (Array.isArray(opts.after)) for (let index = 0; index < opts.after.length; index++) {
				const element = opts.after[index];
				if (DAG.isValue(element)) {
					stage = element.stage;
					break;
				}
			}
			else if (DAG.isValue(opts.after)) stage = opts.after.stage;
		} else if (opts.before) {
			if (Array.isArray(opts.before)) for (let index = 0; index < opts.before.length; index++) {
				const element = opts.before[index];
				if (DAG.isValue(element)) {
					stage = element.stage;
					break;
				}
			}
			else if (DAG.isValue(opts.before)) stage = opts.before.stage;
		}
	}
	return {
		task: stage.createTask(key, fn, opts),
		start: () => {
			running(true);
		},
		stop: () => {
			running(false);
		},
		started: toStore(() => running())
	};
}
// node_modules/@threlte/core/dist/utilities/observe.svelte.js
var signal = Symbol();
var isStore = (dep) => {
	return typeof dep?.subscribe === "function";
};
var runObserve = (dependencies, callback, pre) => {
	const stores = dependencies().map((d) => {
		if (isStore(d)) return fromStore(d);
		return signal;
	});
	derived(() => dependencies().map((d, i) => {
		if (stores[i] === signal) return d;
		return stores[i].current;
	}));
	if (pre) {}
};
var observePost = (dependencies, callback) => {
	return runObserve(dependencies, callback, false);
};
/**
* ### `observe.pre`
*
* Observe multiple stores and reactive values and call a callback when they
* change to trigger side effects. The callback can return a cleanup function
* that will be called when the dependencies change again or when the effect
* root (most likely a component) is destroyed. Under the hood, `observe.pre` uses
* Svelte's `$effect` to track dependencies and trigger the callback. For a
* version that uses `$effect`, use `observe`.
*
* ```ts
* const count = writable(0)
* let name = $state('John')
*
* observe.pre(() => [count, name], ([count, name]) => {
*  console.log(count, name) // 0 John
* })
* ```
*
* The callback can return a cleanup function that will be called when the
* dependencies change again or when the component is destroyed.
*
* ```ts
* const count = writable(0)
*
* observe.pre(() => [count], ([count]) => {
*  console.log(count) // 0
*  return () => {
*    console.log('cleanup')
*  }
* })
* ```
*
* @param dependencies - A function that returns an array of dependencies.
* @param callback - A function that will be called with the current values of
* the dependencies. The callback can return a cleanup function that will be
* called when the dependencies change again or when the component is destroyed.
*/
var observePre = (dependencies, callback) => {
	return runObserve(dependencies, callback, true);
};
Object.assign(observePost, { pre: observePre });
REVISION.replace("dev", "");
// src/lib/planetGeometry.js
function createPlanetGeometry({ radius, segments, mountainHeight = 0, valleyDepth = 0, noiseSeed = 1337, noiseFrequency = 2 }) {
	const geometry = new SphereGeometry(radius, segments, segments);
	const positions = geometry.attributes.position;
	const noise = new FastNoiseLite(noiseSeed);
	noise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);
	noise.SetFrequency(noiseFrequency);
	const height = Math.max(0, mountainHeight);
	const depth = Math.min(Math.max(0, valleyDepth), radius * .95);
	for (let index = 0; index < positions.count; index++) {
		const x = positions.getX(index);
		const y = positions.getY(index);
		const z = positions.getZ(index);
		const length = Math.hypot(x, y, z);
		if (length === 0) continue;
		const value = Math.max(-1, Math.min(1, noise.GetNoise(x / length, y / length, z / length)));
		const scale = (radius + value * (value >= 0 ? height : depth)) / length;
		positions.setXYZ(index, x * scale, y * scale, z * scale);
	}
	positions.needsUpdate = true;
	geometry.computeVertexNormals();
	geometry.computeBoundingSphere();
	geometry.computeBoundingBox();
	return geometry;
}
// src/lib/Planet.svelte
function Planet($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { config } = $$props;
		let mesh = void 0;
		let geometry = derived(() => createPlanetGeometry(config));
		useTask((delta) => {
			if (mesh && config.visible) mesh.rotation.y += delta * config.rotationSpeed;
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (T.Group) {
				$$renderer.push("<!--[-->");
				T.Group($$renderer, {
					position: config.position,
					"rotation.z": config.tilt,
					visible: config.visible,
					children: ($$renderer) => {
						if (T.Mesh) {
							$$renderer.push("<!--[-->");
							T.Mesh($$renderer, {
								name: config.name,
								geometry: geometry(),
								get ref() {
									return mesh;
								},
								set ref($$value) {
									mesh = $$value;
									$$settled = false;
								},
								children: ($$renderer) => {
									if (T.MeshStandardMaterial) {
										$$renderer.push("<!--[-->");
										T.MeshStandardMaterial($$renderer, {
											color: config.color,
											roughness: config.roughness,
											metalness: config.metalness
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
// src/lib/planets.svelte.js
var planets = [{
	id: "planet-1",
	name: "Planet 1",
	position: [
		0,
		0,
		0
	],
	radius: 1.15,
	mountainHeight: .18,
	valleyDepth: .1,
	noiseSeed: 1337,
	noiseFrequency: 2,
	segments: 8,
	color: "#18314f",
	roughness: 4.42,
	metalness: .12,
	rotationSpeed: .22,
	tilt: 0,
	visible: true
}];
// src/lib/PlanetScene.svelte
function PlanetScene($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let activePlanet = derived(() => planets.find((planet) => planet.id === "planet-1"));
		if (T.PerspectiveCamera) {
			$$renderer.push("<!--[-->");
			T.PerspectiveCamera($$renderer, {
				makeDefault: true,
				position: [
					0,
					0,
					4.5
				]
			});
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		$$renderer.push(` `);
		if (T.AmbientLight) {
			$$renderer.push("<!--[-->");
			T.AmbientLight($$renderer, { intensity: .8 });
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		$$renderer.push(` `);
		if (T.PointLight) {
			$$renderer.push("<!--[-->");
			T.PointLight($$renderer, {
				position: [
					3,
					3,
					4
				],
				intensity: 22
			});
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		$$renderer.push(` `);
		if (activePlanet()) {
			$$renderer.push(`<!--[0--><!---->`);
			Planet($$renderer, { config: activePlanet() });
			$$renderer.push(`<!---->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
// src/routes/+page.svelte
function _page($$renderer) {
	head("1uha8ag", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Creation Test 1 — Threlte Playground</title>`);
		});
		$$renderer.push(`<meta name="description" content="A SvelteKit and Threlte playground for creating 3D scenes with Three.js."/>`);
	});
	$$renderer.push(`<main><section class="intro"><p class="eyebrow">EXPERIMENT 01 · 3D PLAYGROUND</p> <h1>Creation Test 1</h1> <p class="description">A first look at building a little world with SvelteKit, Threlte and Three.js.</p></section> <section class="scene" aria-label="A rotating 3D planet">`);
	Canvas($$renderer, {
		children: ($$renderer) => {
			PlanetScene($$renderer, {});
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> <p class="scene-caption">A small rotating planet, rendered in real time</p></section> <footer><span>Made with SvelteKit</span> <span>Three.js · Threlte</span></footer></main>`);
}
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map