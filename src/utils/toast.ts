import { toast } from 'react-toastify';

let timeAutoClose = 1500;

const toastSuccessTop = (messege: string, toastId: string | number) =>
  toast.success(messege, {
    toastId: new Date().getTime().toString(),
    position: 'top-right',
    autoClose: timeAutoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });

const toastSuccessBottom = (messege: string) =>
  toast.success(messege, {
    position: 'bottom-right',
    toastId: new Date().getTime().toString(),
    autoClose: timeAutoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });

const toastDangerTop = (messege: string) =>
  toast.warning(messege, {
    position: 'top-right',
    toastId: new Date().getTime().toString(),
    autoClose: timeAutoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });

export { toastSuccessTop, toastSuccessBottom, toastDangerTop };
