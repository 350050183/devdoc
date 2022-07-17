import axios from 'axios';
const api_dofavoritecurl_add = import.meta.env.VITE_API_SERVER_URL + '/docMapDefault/add';

function add(map_id:number,token: string) {
  const config = {params: {token: token, map_id: map_id}};
  return axios.get(api_dofavoritecurl_add, config).then((res) => res.data);
}


export default {
  add,
};
