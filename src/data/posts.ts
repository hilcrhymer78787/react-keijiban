import React from "react";
import { api } from "../plugins/axios";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useParams } from "react-router-dom";
export type apiGetPostDataReq = {
  offset: number;
};
export type apiGetPostDataRes = {
  title: string;
  posts: Post[];
};
export type Post = {
  id: number;
  post: string;
};

export const apiCreatePostData = async (threadId: string, newPost: string) => {
  const requestConfig = {
    url: `/threads/${threadId}/posts`,
    method: "POST",
    data: {
      post: newPost,
    },
  };
  return api(requestConfig)
    .then(() => {
      return;
    })
    .catch((err: AxiosError) => {
      throw err;
    });
};

export const getPostData = async (threadId: string, offset: number) => {
  const apiParam: apiGetPostDataReq = {
    offset: offset,
  };
  const requestConfig: AxiosRequestConfig = {
    url: `/threads/${threadId}/posts`,
    method: "GET",
    params: apiParam,
  };
  return api(requestConfig)
    .then((res: AxiosResponse<apiGetPostDataRes>) => {
      return res.data;
    })
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });
};
export const usePostData = () => {
  const params = useParams();
  const [postData, setPostData] = React.useState<apiGetPostDataRes>({
    title: "",
    posts: [],
  });
  const [fetchLoading, setFetchLoading] = React.useState(true);
  const [createLoading, setCreateLoading] = React.useState(false);
  const [getErrorText, setGetErrorText] = React.useState("");
  
  const fetchPostData = async () => {
    setFetchLoading(true);
    try {
      const res = await getPostData(
        params.thread_id ?? "",
        postData.posts.length
      );
      setPostData((prevState) => {
        return {
          title: res.title,
          posts: [...prevState.posts, ...res.posts],
        };
      });
      setGetErrorText("");
    } catch (e) {
      if (e instanceof Error) {
        setGetErrorText(e.message);
      } else {
        setGetErrorText("予期せぬエラー");
      }
    } finally {
      setFetchLoading(false);
    }
  };
  const createPostData = async (newPost: string) => {
    if (!newPost){
      throw new Error("文字を入力してください")
    }
    setCreateLoading(true);
    try {
      await apiCreatePostData(params.thread_id ?? "", newPost);
      fetchPostData();
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      } else {
        throw new Error("予期せぬエラー")
      }
    } finally {
      setCreateLoading(false);
    }
  };
  React.useEffect(() => {
    fetchPostData();
  }, []);
  return {
    postData,
    fetchLoading,
    fetchPostData,
    createLoading,
    createPostData,
    getErrorText,
  };
};
