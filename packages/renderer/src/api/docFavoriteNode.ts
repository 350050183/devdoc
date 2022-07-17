import axios from 'axios';
const api_dofavoritecurl_myurl = import.meta.env.VITE_API_SERVER_URL + '/docFavoriteNode/myurl';
const api_dofavoritecurl_del = import.meta.env.VITE_API_SERVER_URL + '/docFavoriteNode/del';
const api_dofavoritecurl_add = import.meta.env.VITE_API_SERVER_URL + '/docFavoriteNode/add';

function myurl(token: string, page = 1, size = 200) {
  const config = {params: {token: token, page: page, size: size}};
  return axios.get(api_dofavoritecurl_myurl, config).then((res) => res.data);
}

function add(id:number,token: string) {
  const config = {params: {token: token, id: id}};
  return axios.get(api_dofavoritecurl_add, config).then((res) => res.data);
}

function del(id:number,token: string) {
  const config = {params: {token: token, id: id}};
  return axios.get(api_dofavoritecurl_del, config).then((res) => res.data);
}

export default {
  myurl,
  del,
  add,
};
