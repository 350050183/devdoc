import axios from 'axios';
const api_user_login = import.meta.env.VITE_API_SERVER_URL + '/docUser/login';
const api_user_register = import.meta.env.VITE_API_SERVER_URL + '/docUser/register';
const api_set_default_map_id = import.meta.env.VITE_API_SERVER_URL + '/docUser/setDefaultMapId';

function login(params:object) {
  const config = {headers: { 'Content-Type': 'multipart/form-data' }};
  return axios.post(api_user_login,params,config).then((res) => res.data);
}

function register(params:object) {
  const config = {headers: { 'Content-Type': 'multipart/form-data' }};
  return axios.post(api_user_register,params,config).then((res) => res.data);
}

function setDefaultMapId(map_id:number, token:string) {
  const config = {
    params:{
      'token': token,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const params = {'map_id':map_id,'token':token};
  return axios.post(api_set_default_map_id,params,config).then((res) => res.data);
}

export default {
  login,
  register,
  setDefaultMapId,
};
