// store.ts
import type { InjectionKey } from 'vue';
import type { Store } from 'vuex';
// import { createStore } from 'vuex';

// 为 store state 声明类型
interface State {
  count: number
}

const state = {
  count: 0,
};

// 定义 injection key
const key: InjectionKey<Store<State>> = Symbol();

const mutations = {};
const actions = {};

export {
  state,
  key,
  mutations,
  actions,
};
