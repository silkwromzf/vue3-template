import { Action, createStore, Module, Dispatch, Payload } from "vuex";
import user, { UserState } from "./modules/user";
export interface RState {
  count: number;
}

enum Types {
  increase = "INCREASE",
}
interface IncreasePayload extends Payload{
  num: number;
  type: Types.increase
}
let increase: Dispatch = ( payload: IncreasePayload ) => Promise.resolve();

export default createStore({
  state: {
    count: 0,
  },
  mutations: {
    INCREASE(state) {
      state.count++;
    },
  },
  actions: {
    increase({ commit, state }) {
      commit("INCREASE");
    },
  },
  modules: {
    user,
  },
});
