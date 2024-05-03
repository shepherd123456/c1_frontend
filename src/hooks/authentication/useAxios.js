import { useEffect, useState } from "react";
import axios from "axios";

import useRefreshToken from "./useRefreshToken"
import { useCtx } from '../context/useCtx';

function useAxios(config) {

  const { ctx } = useCtx();
  const refresh = useRefreshToken();

  const [a] = useState(() => {
    return axios.create({
      baseURL: config.baseURL,
      withCredentials: true
    })
  })

  useEffect(() => {
    let requestUrl = '';

    const requestInterceptor = a.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${ctx?.accessToken || ''}`;
        }
        requestUrl = config.url;
        return config;
      }, error => Promise.reject(error)
    );

    const responseInterceptor = a.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const accessToken = await refresh();
          prevRequest.headers.Authorization = `Bearer ${accessToken}`;
          return a(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      a.interceptors.request.eject(requestInterceptor);
      a.interceptors.response.eject(responseInterceptor);
    }
  }, [a, ctx]);

  return a;
}

export default useAxios