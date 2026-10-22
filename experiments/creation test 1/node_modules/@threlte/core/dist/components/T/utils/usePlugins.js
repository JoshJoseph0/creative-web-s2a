import { getContext } from 'svelte';
import { pluginContextKey } from '../../../plugins/types.js';
export const usePlugins = (args) => {
    const plugins = getContext(pluginContextKey);
    if (!plugins)
        return;
    const pluginsProps = [];
    const pluginsArray = Object.values(plugins);
    if (pluginsArray.length > 0) {
        // initalize plugins
        for (let i = 0; i < pluginsArray.length; i++) {
            const plugin = pluginsArray[i];
            // initialize plugin
            const p = plugin(args);
            if (p && p.pluginProps) {
                pluginsProps.push(...p.pluginProps);
            }
        }
    }
    return {
        pluginsProps
    };
};
