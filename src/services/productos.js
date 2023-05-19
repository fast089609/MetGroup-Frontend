import http from "../utils/http";
const base = process.env.RUTA_API || "http://127.0.0.1:3000/api";

const obtener = (options) => {
  const token = localStorage.getItem('authToken');
  return new Promise((resolve, reject) => {
    http
      .get({
        url:  `${base}/articulo`,
        headers: {'Authorization': `Bearer ${token}`},
        ...options,
      })
      .then((res) => resolve(res))
      .catch((res) => reject(res));
  });
};

const eliminar = (options, id) => {
  const token = localStorage.getItem('authToken');
  return new Promise((resolve, reject) => {
    http
      .delete({
        url:  `${base}/articulo/${id}`,
        headers: {'Authorization': `Bearer ${token}`},
        ...options,
      })
      .then((res) => resolve(res))
      .catch((res) => reject(res));
  });
};

const actualizar = (options, id) => {
  const token = localStorage.getItem('authToken');
  return new Promise((resolve, reject) => {
    http
      .put({
        url:  `${base}/articulo/${id}`,
        headers: {'Authorization': `Bearer ${token}`},
        ...options,
      })
      .then((res) => resolve(res))
      .catch((res) => reject(res));
  });
};

const crear = (options) => {
  const token = localStorage.getItem('authToken');
  return new Promise((resolve, reject) => {
    http
      .post({
        url:  `${base}/articulo`,
        headers: {'Authorization': `Bearer ${token}`},
        ...options,
      })
      .then((res) => resolve(res))
      .catch((res) => reject(res));
  });
};


export default {
    obtener,
    eliminar,
    actualizar,
    crear
}