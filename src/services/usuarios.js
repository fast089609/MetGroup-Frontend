import http from "../utils/http";
const base = import.meta.env.RUTA_API || "http://127.0.0.1:3000/api";

const login = (options) => {
  return new Promise((resolve, reject) => {
    http
      .post({
        url:  `${base}/login`,
        ...options,
      })
      .then((res) => resolve(res))
      .catch((res) => reject(res));
  });
};

const registrar = (options) => {
    return new Promise((resolve, reject) => {
      http
        .post({
          url:  `${base}/registrar`,
          ...options,
        })
        .then((res) => resolve(res))
        .catch((res) => reject(res));
    });
  };


export default {
    login,
    registrar
}