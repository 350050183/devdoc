import { defineStore } from 'pinia';
import type { TMiddleResultType, TResultType} from 'store';
import type {State} from 'store';
import docNodeCate from '/@/api/docNodeCate';
import docNode from '/@/api/docNode';

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
      map_id:0,
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
    async getLeftMenu(map_id:number) {
      const result: TResultType = await docNodeCate.tree(this.parent_id,map_id);
      this.leftMenu = result.data.items;
      this.middleMenu = [];
    },
    async getMiddleList(id:number,token:string) {
      const result: TMiddleResultType = await docNode.tree(id,token);
      this.middleMenu = result.data.items;
    },
  },

});

