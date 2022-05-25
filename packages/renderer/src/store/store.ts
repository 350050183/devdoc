import type {InjectionKey} from 'vue';
import type {Store,Commit} from 'vuex';
import {createStore, useStore as baseUseStore} from 'vuex';
import docCate from '/@/api/docCate';
import docUrl from '/@/api/docUrl';

export interface State {
  count: number,
  parent_id: number,
  url: string,
  leftMenu:TLeftMenu[],
  left_menu_id:number,
  middleMenu:TMiddleMenu[],
}

const state:State = {
  count: 0,
  parent_id: 0,
  url: '',
  leftMenu:[],
  left_menu_id:0,
  middleMenu:[],
};

const mutations = {
  setValue(state: State, payload: number) {
    console.log('mutations:setValue',payload);
    state.parent_id = payload;
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


interface TLeftMenu {
  text: string,
  children: {'text':string,'id':number}[],
}
interface TResultType {
  success: boolean,
  msg: string,
  data: {
    items: TLeftMenu[],
    pagination: {
      page: number, page_size: number, total: number
    }
  }
}


interface TMiddleMenu {
    string:[{
      icon: string,
      text: string,
      url:string,
      is_new:number,
    }]
}
interface TMiddleResultType {
  success: boolean,
  msg: string,
  data: {
    items: TMiddleMenu[],
    pagination: {
      page: number, page_size: number, total: number
    }
  }
}

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
