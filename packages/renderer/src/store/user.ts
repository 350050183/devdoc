import {defineStore} from 'pinia';
import type {User} from 'store';

export const userStore = defineStore('user', {
  state: () => {
    return {
      id: 0,
      email: '',
      avatar: '',
      mobile: '',
      token: '',
      default_map_id: 1,
      default_map_name: '',
    } as User;
  },
  persist: true,
  actions: {
    async setValue(userInfo: User) {
      const {id, email, avatar, mobile, token, default_map_id} = userInfo;
      this.id = id;
      this.email = email;
      this.avatar = avatar;
      this.mobile = mobile;
      this.token = token;
      this.default_map_id = default_map_id;
    },
    async setDefaultMapId(map_id: number) {
      this.default_map_id = map_id;
    },
    async setToken(token: string) {
      this.token = token;
    },
  },

});

