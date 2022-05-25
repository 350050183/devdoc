import axios from 'axios';

const api_middle_list = 'http://devdocs.secret8.net/api/docUrl/tree';

function tree(left_menu_id = 0, page = 1, page_size = 200) {
  const config = {params: {left_menu_id: left_menu_id, page: page, page_size: page_size}};
  return axios.get(api_middle_list,config).then((res) => res.data);
}

export default {
  tree,
};
