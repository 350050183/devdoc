import type {InjectionKey} from 'vue';
import type {Store,Commit} from 'vuex';
import {createStore, useStore as baseUseStore} from 'vuex';
import docCate from '/@/api/docCate';
import docUrl from '/@/api/docUrl';
import type {State, TMiddleResultType, TResultType} from 'store';

const state:State = {
  count: 0,
  parent_id: 0,
  url: '',
  leftMenu:[],
  left_menu_id:0,
  middleMenu:[],
};

const mutations = {
  setValue(state: State, payload: string) {
    console.log('mutations:setValue',payload);
    state.parent_id = parseInt(payload);
  },
  setLeftMenu(state: State, payload: []) {
    console.log('mutations:setLeftMenu',payload);
    state.leftMenu = payload;
  },
  setLeftMenuValue(state: State, payload: number) {
    console.log('mutations:setLeftMenuValue',payload);
    state.left_menu_id = payload;
  },
  setMiddleList(state: State, payload: []) {
    console.log('mutations:setMiddleList',payload);
    state.middleMenu = payload;
  },
};

const actions = {
  async getLeftMenu({ commit }:{commit:Commit}) {
    console.log('call action getLeftMenu');
    const result: TResultType = await docCate.tree(state.parent_id);
    commit('setLeftMenu', result.data.items);
    commit('setMiddleList',[]);
    console.log(result);
  },
  async getMiddleList({ commit }:{commit:Commit}) {
    console.log('call action getMiddleList');
    const result: TMiddleResultType = await docUrl.tree(state.left_menu_id);
    commit('setMiddleList', result.data.items);
    console.log(result);
  },
};

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state,
  mutations,
  actions,
});

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key);
}
