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
      isNeedRefreshFavUrl:false,
      isNeedRefreshCate:false,
      isNeedRefreshCateOption:false,
    } as State;
  },
  actions:{
    setValue(payload: string) {
      this.parent_id = parseInt(payload);
    },
    setLeftMenu(payload: []) {
      this.leftMenu = payload;
    },
    setLeftMenuValue(payload: number) {
      this.left_menu_id = payload;
    },
    setMiddleList(payload: []) {
      this.middleMenu = payload;
    },
    async getLeftMenu() {
      const result: TResultType = await docCate.tree(this.parent_id);
      this.leftMenu = result.data.items;
      this.middleMenu = [];
    },
    async getMiddleList(id:number,token:string) {
      const result: TMiddleResultType = await docUrl.tree(id,token);
      this.middleMenu = result.data.items;
    },
  },

});

