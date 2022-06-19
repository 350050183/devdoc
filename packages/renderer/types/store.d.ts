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
    isNeedRefreshFavUrl: boolean,
    isNeedRefreshCate: boolean,
    isNeedRefreshCateOption: boolean,
  }

  interface User {
    id: number,
    email:string,
    avatar:string,
    mobile:string,
    token: string,
    nickname: string,
  }

  interface TZGUrl {
    id:string,
    cate_id: string;
    title: string;
    url: string;
    icon_class: string;
    alpha: string;
    is_new: string;
    logo: string;
    description: string;
  }

  interface TZGCate {
    id:string,
    name: string;
    parent_id: string;
  }

  interface TLeftMenu {
    text: string,
    children: { 'text': string, 'id': number }[],
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
