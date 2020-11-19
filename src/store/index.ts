import { createStore } from 'vuex';
import permission from './modules/permission';
import user from './modules/user';

export interface RootState {
    count: number;
}

export default createStore<RootState>({
    state: {
        count: 0
    },
    mutations: {
        INCREASE(state) {
            state.count++;
        }
    },
    actions: {
        increase({ commit }) {
            commit('INCREASE');
        }
    },
    modules: {
        user,
        permission
    }
});
