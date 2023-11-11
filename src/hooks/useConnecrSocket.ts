import { useEffect, useState } from 'react';
import * as io from 'socket.io-client';
import { useAppSelector } from './useActionRedux';

interface SocketHookProps {
  event: string;
}

const useSocket = ({ event }: SocketHookProps) => {
  const [socket, setSocket] = useState<any | null>(null);
  const [messages, setMessages] = useState<any>(null);
  const token = useAppSelector((state) => state.auth.accessToken.token);
  useEffect(() => {
    const newSocket = io.connect(import.meta.env.VITE_API_URL, {
      transports: ['websocket', 'polling'],
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    newSocket.on(event, (data: any) => {
      setMessages(data);
      console.log(data);
    });

    setSocket(newSocket);
  }, []);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.emit('clientMessage', { message });
    }
  };

  return { messages, sendMessage };
};

export default useSocket;
