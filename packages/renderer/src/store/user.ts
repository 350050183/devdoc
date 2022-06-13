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
    } as User;
  },
  persist: true,
  actions: {
    async setValue(userInfo: User) {
      const {id, email, avatar, mobile, token} = userInfo;
      this.id = id;
      this.email = email;
      this.avatar = avatar;
      this.mobile = mobile;
      this.token = token;
    },
  },

});

