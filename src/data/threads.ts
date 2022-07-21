import React from "react";
import { api } from "../plugins/axios";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export type apiThreadsReq = {
  offset: number;
};
export type apiThreadsRes = threadType[];
export type threadType = {
  id: string;
  title: string;
};
const getThreads = async (offset: number) => {
  const apiParam: apiThreadsReq = {
    offset: offset,
  };
  const requestConfig: AxiosRequestConfig = {
    url: "/threads",
    method: "GET",
    params: apiParam,
  };
  return api(requestConfig)
    .then((res: AxiosResponse<apiThreadsRes>) => {
      return res.data;
    })
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });
};
export const useThreads = () => {
  const [threads, setThreads] = React.useState<apiThreadsRes>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const fetchThreads = async () => {
    setIsLoading(true);
    try {
      const res = await getThreads(threads.length);
      setThreads((prevState) => [...prevState, ...res]);
      setErrorText('');
    } catch (e) {
      if (e instanceof Error) {
        setErrorText(e.message)
      } else {
        setErrorText('予期せぬエラー')
      }
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    fetchThreads();
  }, []);
  return {
    threads,
    isLoading,
    errorText,
    fetchThreads,
  };
};
