import toast from 'react-hot-toast';

export const successNotify = (message: string) => {
  toast.success(message, {
    position: 'bottom-left',
  });
};

export const errorNotify = (message: string) => {
  toast.error(message, {
    position: 'bottom-left',
  });
};
