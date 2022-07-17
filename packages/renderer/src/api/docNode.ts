import axios from 'axios';
// const api_middle_list = 'http://devdocs.secret8.net/api/docNode/tree';
const api_middle_list = import.meta.env.VITE_API_SERVER_URL + '/docNode/tree';
const api_docNode_my = import.meta.env.VITE_API_SERVER_URL + '/docNode/myurl';
const api_docNode_index = import.meta.env.VITE_API_SERVER_URL + '/docNode/index';
const api_docNode_add = import.meta.env.VITE_API_SERVER_URL + '/docNode/add';
const api_docNode_upload = import.meta.env.VITE_API_SERVER_URL + '/docFile/upload';
const api_docNode_edit = import.meta.env.VITE_API_SERVER_URL + '/docNode/edit';
const api_docNode_del = import.meta.env.VITE_API_SERVER_URL + '/docNode/del';

function tree(left_menu_id = 0,token: string, page = 1, size = 200) {
  const config = {params: {token: token, parent_id: left_menu_id, page: page, size: size}};
  return axios.get(api_middle_list, config).then((res) => res.data);
}

function myurl(token: string, map_id:number, page = 1, size = 200) {
  const config = {params: {token: token, map_id:map_id,page: page, size: size}};
  return axios.get(api_docNode_my, config).then((res) => res.data);
}
function search(map_id:number, page = 1, size = 200) {
  const config = {params: {map_id:map_id, page: page, size: size}};
  return axios.get(api_docNode_index, config).then((res) => res.data);
}

function add(params: object, token: string) {
  const config = {
    params:{
      'token': token,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Access-Control-Allow-Origin' : '*',
      // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      // 'Strict-Origin-When-Cross-Origin': false,
    },
  };
  return axios.post(api_docNode_add, params, config).then((res) => res.data);
}

function edit(params: object, token: string) {
  const config = {
    params:{
      'token': token,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios.post(api_docNode_edit, params, config).then((res) => res.data);
}

function del(id:number,token: string) {
  const config = {params: {token: token, id: id}};
  return axios.get(api_docNode_del, config).then((res) => res.data);
}

export default {
  tree,
  myurl,
  search,
  add,
  api_docNode_upload,
  edit,
  del,
};
