import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { RState } from './store';

declare module '@vue/runtime-core' {
    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<RState>;
    }
}
