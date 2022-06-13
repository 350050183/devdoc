import axios from 'axios';
// const api_middle_list = 'http://devdocs.secret8.net/api/docUrl/tree';
const api_middle_list = import.meta.env.VITE_API_SERVER_URL + '/docUrl/tree';
const api_docurl_my = import.meta.env.VITE_API_SERVER_URL + '/docUrl/myurl';
const api_docurl_add = import.meta.env.VITE_API_SERVER_URL + '/docUrl/add';
const api_docurl_upload = import.meta.env.VITE_API_SERVER_URL + '/docFile/upload';
const api_docurl_edit = import.meta.env.VITE_API_SERVER_URL + '/docUrl/edit';
const api_docurl_del = import.meta.env.VITE_API_SERVER_URL + '/docUrl/del';

function tree(left_menu_id = 0, page = 1, size = 200) {
  const config = {params: {parent_id: left_menu_id, page: page, size: size}};
  return axios.get(api_middle_list, config).then((res) => res.data);
}

function myurl(token: string, page = 1, size = 200) {
  const config = {params: {token: token, page: page, size: size}};
  return axios.get(api_docurl_my, config).then((res) => res.data);
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
  return axios.post(api_docurl_add, params, config).then((res) => res.data);
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
  return axios.post(api_docurl_edit, params, config).then((res) => res.data);
}

function del(id:number,token: string) {
  const config = {params: {token: token, id: id}};
  return axios.get(api_docurl_del, config).then((res) => res.data);
}

export default {
  tree,
  myurl,
  add,
  api_docurl_upload,
  edit,
  del,
};
