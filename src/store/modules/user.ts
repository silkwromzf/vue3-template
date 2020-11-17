import { Module } from "vuex";
import  { RState } from '../index';


export interface UserState {
    id: number | null,
    name: string | null,
}

const user: Module<UserState, RState> = {
    namespaced: true,
    state: () => {
        return {
            id: null,
            name: null
        }
    },
    mutations: {
        LOGIN(state, payload) {
            state.id = payload.id
        }
    },
    actions: {
        login({commit}, payload: UserState) {
            commit('LOGIN', payload)
        }
    },
}

export default user