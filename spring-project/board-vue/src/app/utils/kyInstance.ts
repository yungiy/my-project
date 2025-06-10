import ky from 'ky';
import { useUserStore } from '@/domain/user/store/userStore';

export const kyInstance = () => {
  const userStore = useUserStore();
  return ky.create({
    prefixUrl: 'https://yungiy-blog.loca.lt',
    hooks: {
      beforeRequest: [
        request => {
          if (userStore.jwt) {
            request.headers.set('Authorization', `Bearer ${userStore.jwt}`);
          }
        },
      ],
    },
  });
};