import jwtAxios from '@crema/services/auth/jwt-auth/jwt-api';
import Toastify from 'toastify-js';

export const isEmpty = (obj: any) => {
  if (obj === null || obj === '' || obj === undefined) return true;
  if (!Object.entries(obj).length) return true;
  return false;
};

export const showError = (
  data: any,
  config = {gravity: 'bottom', position: 'center', color: '#ff4154'},
) => {
  if (data) {
    Object.keys(data).forEach((key) => {
      Toastify({
        text: data[key],
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: config?.gravity, // `top` or `bottom`
        position: config?.position, // `left`, `center` or `right`
        backgroundColor: config?.color,
        stopOnFocus: true, // Prevents dismissing of toast on hover
      }).showToast();
    });
  } else return;
};

export const showMessage = (
  data: any,
  config = {gravity: 'top', position: 'right', color: '#6A4CCD'},
) => {
  if (data) {
    Toastify({
      text: data,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: config?.gravity, // `top` or `bottom`
      position: config?.position, // `left`, `center` or `right`
      backgroundColor: config?.color,
      stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
  } else return;
};


export const ConvertBuffer = (buffer: any) => {
  const host = 'http://157.175.55.250:8001';
  return host + buffer;
}






