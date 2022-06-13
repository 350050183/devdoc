import axios from 'axios';

// const api = 'http://devdocs.secret8.net/api/docCate/index?parent_id=0';
// const api_left_menu = 'http://devdocs.secret8.net/api/docCate/tree';
const api = import.meta.env.VITE_API_SERVER_URL + '/docCate/index';
const api_left_menu = import.meta.env.VITE_API_SERVER_URL + '/docCate/tree';

function index(parent_id = 0, page = 1, page_size = 20) {
  const config = {params: {parent_id: parent_id, page: page, page_size: page_size}};
  return axios.get(api, config).then((res) => res.data.data.items);
}

function listByLevel(level = 0, page = 1, page_size = 20) {
  const config = {params: {level: level, page: page, page_size: page_size}};
  return axios.get(api, config).then((res) => res.data.data.items);
}

function tree(parent_id = 0, page = 1, page_size = 20) {
  const config = {params: {parent_id: parent_id, page: page, page_size: page_size}};
  return axios.get(api_left_menu,config).then((res) => res.data);
}

export default {
  index,
  tree,
  listByLevel,
};
