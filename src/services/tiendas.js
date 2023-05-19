import http from "../utils/http";
const base = process.env.RUTA_API || "http://127.0.0.1:3000/api";

const token = localStorage.getItem('authToken');

const obtener = (options) => {
  return new Promise((resolve, reject) => {
    http
      .get({
        url:  `${base}/tiendas`,
        headers: {'Authorization': `Bearer ${token}`},
        ...options,
      })
      .then((res) => resolve(res))
      .catch((res) => reject(res));
  });
};

const eliminar = (options, id) => {
  return new Promise((resolve, reject) => {
    http
      .delete({
        url:  `${base}/tiendas/${id}`,
        headers: {'Authorization': `Bearer ${token}`},
        ...options,
      })
      .then((res) => resolve(res))
      .catch((res) => reject(res));
  });
};

const actualizar = (options, id) => {
  return new Promise((resolve, reject) => {
    http
      .put({
        url:  `${base}/tiendas/${id}`,
        headers: {'Authorization': `Bearer ${token}`},
        ...options,
      })
      .then((res) => resolve(res))
      .catch((res) => reject(res));
  });
};

const crear = (options) => {
  return new Promise((resolve, reject) => {
    http
      .post({
        url:  `${base}/tiendas`,
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