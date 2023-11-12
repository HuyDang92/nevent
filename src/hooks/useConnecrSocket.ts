import { useEffect, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from './useActionRedux';

const useSocket = () => {
  const token = useAppSelector((state) => state.auth.accessToken.token);

  const socket = useMemo(() => {
    return io(import.meta.env.VITE_API_URL, {
      transports: ['websocket'],
      auth: {
        authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  return socket;
};

export default useSocket;
