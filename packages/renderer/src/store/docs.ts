import { defineStore } from 'pinia';
import type { TMiddleResultType, TResultType} from 'store';
import type {State} from 'store';
import docCate from '/@/api/docCate';
import docUrl from '/@/api/docUrl';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const docsStore = defineStore('docs', {
  state:()=>{
    return {
      count: 0,
      parent_id: 0,
      url: '',
      leftMenu:[],
      left_menu_id:0,
      middleMenu:[],
    } as State;
  },
  actions:{
    setValue(payload: string) {
      console.log('mutations:setValue',payload);
      this.parent_id = parseInt(payload);
    },
    setLeftMenu(payload: []) {
      console.log('mutations:setLeftMenu',payload);
      this.leftMenu = payload;
    },
    setLeftMenuValue(payload: number) {
      console.log('mutations:setLeftMenuValue',payload);
      this.left_menu_id = payload;
    },
    setMiddleList(payload: []) {
      console.log('mutations:setMiddleList',payload);
      this.middleMenu = payload;
    },
    async getLeftMenu() {
      console.log('call action getLeftMenu');
      const result: TResultType = await docCate.tree(this.parent_id);
      this.leftMenu = result.data.items;
      this.middleMenu = [];
      console.log(result);
    },
    async getMiddleList(id:number) {
      console.log('call action getMiddleList');
      const result: TMiddleResultType = await docUrl.tree(id);
      this.middleMenu = result.data.items;
      console.log(result);
    },
  },

});

