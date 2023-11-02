import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import db from '~/firebase';
export const useGetTicketsUser = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);

  const getTickets = async (idUser: string) => {
    setError(null);
    setIsPending(true);

    try {
      const q = query(collection(db, 'ticketUsers'), where('owner', '==', idUser));
      let data: any[] = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data());
      });

      setError(null);
      setIsPending(false);
      setData(data);
      return data;
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.log(errorCode, errorMessage);
      setError(errorCode);
      setIsPending(false);
      setData([]);
      return null;
    }
  };
  return { getTickets, data, isPending, error };
};
export const useBuyTicket = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const buyTicket = async (ticketData: any) => {
    setError(null);
    setIsPending(true);

    try {
      const ticketRef = collection(db, 'ticketUsers');
      const newDoc = await addDoc(ticketRef, ticketData);
      console.log('New ticket added with ID: ', newDoc.id);

      setError(null);
      setIsPending(false);
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.log(errorCode, errorMessage);
      setError(errorCode);
      setIsPending(false);
    }
  };

  return { buyTicket, isPending, error };
};
