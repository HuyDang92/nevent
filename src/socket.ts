import { io } from 'socket.io-client';
import { useAppSelector } from './hooks/useActionRedux';

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_API_URL;
const token = useAppSelector((state) => state.auth.accessToken.token);

export const socket = io(URL, {
  transports: ['websocket', 'polling'],
  extraHeaders: {
    Authorization: `Bearer ${token}`,
  },
});
