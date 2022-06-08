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
  }

  interface TLeftMenu {
    text: string,
    children: { 'text': string, 'id': number }[],
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
    string: {
      icon: string,
      text: string,
      url: string,
      is_new: number,
      id: number,
    };
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
}
