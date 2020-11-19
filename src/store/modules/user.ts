import { ModuleState } from '@/store/types';
import { getToken, setToken, removeToken } from '@/utils/cookies';
import { User } from '@/api/user';
import router, { Role } from '@/router';

export interface UserState extends Partial<User> {
    token: string | undefined;
}

const user: ModuleState<UserState> = {
    namespaced: true,
    state: {
        token: getToken(),
        name: '',
        role: undefined,
        id: undefined
    },
    mutations: {
        SET_TOKEN(state, token: string) {
            state.token = token;
        },
        SET_ROLE(state, role?: Role) {
            state.role = role;
        },
        LOGIN(state, user: User) {
            state.name = user.name;
            state.id = user.id;
        }
    },
    actions: {
        logout({ dispatch }) {
            dispatch('resetToken');
            router.push('/login');
        },
        resetToken({ commit }) {
            removeToken();
            commit('SET_TOKEN', '');
            commit('SET_ROLE', null);
        },
        async getToken({ commit }) {
            const token = 'token';
            setToken(token);
            commit('SET_TOKEN', token);
        },
        async getUserInfo({ commit, dispatch }) {
            commit('LOGIN', {
                name: 'silk',
                id: 444
            });

            const role = Role.admin;
            commit('SET_ROLE', role);

            dispatch('permission/generateRoutes', role, {
                root: true
            });
        }
    }
};

export default user;
