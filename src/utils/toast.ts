import { toast } from 'react-toastify';

let timeAutoClose = 1500;

const toastSuccessTop = (messege: string) =>
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

const toastWarningTop = (messege: string) =>
  toast.warning(messege, {
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

const toastDangerBottom = (messege: string) =>
  toast.error(messege, {
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

export {
  toastSuccessTop,
  toastSuccessBottom,
  toastWarningTop,
  toastDangerBottom,
};
