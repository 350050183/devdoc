declare module 'store' {
  interface Counter {
    main?: number;
  }

  interface docs {
    url?: string;
    menuIdx?: number;
  }

  interface State {
    count: number,
    parent_id: number,
    url: string,
    leftMenu: TLeftMenu[],
    left_menu_id: number,
    middleMenu: TMiddleMenu[],
    isNeedRefreshFavUrl: boolean,//是否要刷新收藏地址
    isNeedRefreshCate: boolean,//是否需要刷新顶部菜单
    isNeedRefreshCateOption: boolean,//是否需要刷新图谱子类别
    map_id: number
  }

  interface User {
    id: number,
    email:string,
    avatar:string,
    mobile:string,
    token: string,
    nickname: string,
    default_map_id: number,
    default_map_name: string,
  }

  interface TZGNode {
    id:string,
    cate_id: string;
    cate_name: string;
    title: string;
    url: string;
    icon_class: string;
    alpha: string;
    is_new: string;
    logo: string;
    description: string;
  }

  interface TZGNodeCate {
    id:string,
    title: string;
    parent_id: string;
  }

  interface TZGTree {
    id: string
    label: string
    level: number
    is_mine: number
    children?: TZGTree[]
  }

  interface TLeftMenu {
    id: string,
    text: string,
    children: TLeftMenu[],
  }

  interface TResultType {
    success: boolean,
    message: string,
    data: {
      items: TLeftMenu[],
      pagination: {
        page: number, page_size: number, total: number
      }
    }
  }

  interface TMiddleMenu {
    string: {
      icon: string,
      text: string,
      url: string,
      is_new: number,
      id: number,
      logo: string,
      description: string,
      is_fav: boolean,
    };
  }

  interface TMiddleResultType {
    success: boolean,
    message: string,
    data: {
      items: TMiddleMenu[],
      pagination: {
        page: number, page_size: number, total: number
      }
    }
  }

  interface TResult {
    success:boolean,
    message:string,
    code:number,
    data:{
      items: Array<object>,
      pagination: {
        page: number, page_size: number, total: number
      }
    },
  }

  interface TResultOfOp {
    success:boolean,
    message:string,
    code:number,
    data:{
      id:number,
      level:number,
    },
  }
}
