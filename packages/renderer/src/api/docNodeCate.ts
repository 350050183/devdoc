import axios from 'axios';

// const api = 'http://devdocs.secret8.net/api/docNodeCate/index?parent_id=0';
// const api_left_menu = 'http://devdocs.secret8.net/api/docNodeCate/tree';
const api = import.meta.env.VITE_API_SERVER_URL + '/docNodeCate/index';
const api_left_menu = import.meta.env.VITE_API_SERVER_URL + '/docNodeCate/tree';
const api_cate_tree2 = import.meta.env.VITE_API_SERVER_URL + '/docNodeCate/tree2';
const api_cate_del = import.meta.env.VITE_API_SERVER_URL + '/docNodeCate/del';
const api_cate_add = import.meta.env.VITE_API_SERVER_URL + '/docNodeCate/add';
const api_cate_edit = import.meta.env.VITE_API_SERVER_URL + '/docNodeCate/edit';

function index(parent_id = 0, map_id:number, page = 1, size = 20) {
  const config = {params: {parent_id: parent_id, map_id: map_id, page: page, size: size}};
  return axios.get(api, config).then((res) => res.data.data.items);
}

function listByLevel(level = 0,map_id:number, page = 1, size = 20) {
  const config = {params: {level: level, map_id: map_id, page: page, size: size}};
  return axios.get(api, config).then((res) => res.data.data.items);
}

function tree(parent_id = 0, map_id:number, page = 1, size = 20) {
  const config = {params: {parent_id: parent_id, map_id:map_id, page: page, size: size}};
  return axios.get(api_left_menu,config).then((res) => res.data);
}

function tree2(parent_id = 0, token:string, map_id:number, page = 1, size = 20) {
  const config = {params: {parent_id: parent_id, map_id: map_id, page: page, size: size,token: token}};
  return axios.get(api_cate_tree2,config).then((res) => res.data);
}

function add(cate_name:string,parent_id:number,token: string, map_id:number) {
  const config = {params: {token: token}, headers: { 'Content-Type': 'multipart/form-data' }};
  return axios.post(api_cate_add,{'cate_name':cate_name,'parent_id':parent_id, 'map_id':map_id},config).then((res) => res.data);
}

function edit(id:number,cate_name:string,token: string, map_id:number) {
  const config = {params: {token: token}, headers: { 'Content-Type': 'multipart/form-data' }};
  return axios.post(api_cate_edit,{'cate_name':cate_name,'id':id, 'map_id':map_id},config).then((res) => res.data);
}

function del<TResult>(id:number,token: string) {
  const config = {params: {token: token, id: id}};
  return axios.get(api_cate_del, config).then((res) => res.data as TResult);
}
export default {
  index,
  tree,
  tree2,
  add,
  edit,
  del,
  listByLevel,
};
