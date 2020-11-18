import { ModuleState } from "@/store/types";
import { getToken, setToken, removeToken } from "@/utils/cookies";
import { Role } from "@/store/modules/permission";
interface User {
  uid: string;
  name: string;
}
export interface UserState {
  uid: string;
  name: string;
  token: string | undefined;
}

const user: ModuleState<UserState> = {
  namespaced: true,
  state: {
    token: getToken(),
    uid: "",
    name: ""
  },
  mutations: {
    SET_TOKEN(state, token: string) {
      state.token = token;
    },
    LOGIN(state, user: User) {
      state.uid = user.uid;
      state.name = user.name;
    }
  },
  actions: {
    login({ commit, dispatch }) {
      const role = Role.teacher;
      const token = "....";
      setToken(token);
      commit("SET_TOKEN", token);

      dispatch("permission/generateRoutes", role, {
        root: true
      });
      // commit('LOGIN', payload);
    }
  }
};

export default user;
