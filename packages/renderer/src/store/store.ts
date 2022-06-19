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
  isNeedRefreshFavUrl: false,
  isNeedRefreshCate: false,
  isNeedRefreshCateOption: false,
};

const mutations = {
  setValue(state: State, payload: string) {
    state.parent_id = parseInt(payload);
  },
  setLeftMenu(state: State, payload: []) {
    state.leftMenu = payload;
  },
  setLeftMenuValue(state: State, payload: number) {
    state.left_menu_id = payload;
  },
  setMiddleList(state: State, payload: []) {
    state.middleMenu = payload;
  },
};

const actions = {
  async getLeftMenu({ commit }:{commit:Commit}) {
    const result: TResultType = await docCate.tree(state.parent_id);
    commit('setLeftMenu', result.data.items);
    commit('setMiddleList',[]);
  },
  async getMiddleList({ commit }:{commit:Commit}) {
    const result: TMiddleResultType = await docUrl.tree(state.left_menu_id,'');
    commit('setMiddleList', result.data.items);
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
