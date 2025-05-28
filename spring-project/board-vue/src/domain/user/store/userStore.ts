import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    nickname: '',
    jwt: localStorage.getItem('jwt') || '',
  }),
  actions: {
    setNickname(nickname: string) {
      this.nickname = nickname;
    },
    setJwt(token: string) {
      this.jwt = token;
      localStorage.setItem('jwt', token);
    },
    logout() {
      this.nickname = '';
      this.jwt = '';
      localStorage.removeItem('jwt');
    },
  },
});