import React from "react";
import { api } from "../../plugins/axios";
import { LoadingButton } from "@mui/lab";
import { CircularProgress, TextField, CardHeader, Card, Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Container, Typography } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Loading from './../../component/Loading'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { BrowserRouter, useParams } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message';

export type apiGetPostDataReq = {
  offset: number;
}
export type apiGetPostDataRes = {
  threadId: number,
  title: string,
  posts: Post[]
}
export type Post = {
  id: number,
  post: string
}

export const apiCreatePostData = async (threadId: string, newPost: string) => {
  const requestConfig = {
    url: `/threads/${threadId}/posts`,
    method: "POST",
    data: {
      post: newPost
    }
  };
  return api(requestConfig)
}

export const getPostData = async (threadId: string, offset: number) => {
  const apiParam: apiGetPostDataReq = {
    offset: offset
  };
  const requestConfig: AxiosRequestConfig = {
    url: `/threads/${threadId}/posts`,
    method: "GET",
    params: apiParam
  };
  return api(requestConfig)
    .then((res: AxiosResponse<apiGetPostDataRes>) => res.data)
}
const usePostData = () => {
  const params = useParams()
  const [postData, setPostData] = React.useState<apiGetPostDataRes>({
    threadId: 0,
    title: '',
    posts: []
  });
  const [fetchLoading, setFetchLoading] = React.useState(true);
  const [createLoading, setCreateLoading] = React.useState(false);
  const fetchPostData = async () => {
    setFetchLoading(true);
    const res = await getPostData(params.thread_id ?? '', postData.posts.length);
    setFetchLoading(false);
    setPostData((prevState) => {
      return {
        threadId: res.threadId,
        title: res.title,
        posts: [...prevState.posts, ...res.posts]
      }
    });
  }
  const createPostData = async (newPost: string) => {
    if (!newPost) return '文字を入力してください';
    setCreateLoading(true);
    await apiCreatePostData(params.thread_id ?? '', newPost);
    fetchPostData()
    setCreateLoading(false);
    return '';
  }
  React.useEffect(() => {
    fetchPostData()
  }, []);
  return {
    postData,
    fetchLoading,
    fetchPostData,
    createLoading,
    createPostData,
  }
}

function Detail() {
  const { postData, fetchLoading, fetchPostData, createLoading, createPostData, } = usePostData();
  const [newPost, setNewPost] = React.useState('');
  const [errorText, setErrorText] = React.useState('');
  const onClickSubmit = async () => {
    const error = await createPostData(newPost)
    setErrorText(error)
    if (!error) setNewPost('');
  }
  if (fetchLoading && !postData) return <Loading />;
  return (
    <Container>
      <Typography color="primary" variant="h4" sx={{ mb: '20px' }}>スレッド内投稿一覧画面</Typography>
      <Box sx={{ mb: '20px' }}>
        <TextField
          sx={{ mr: '10px' }}
          size='small'
          value={newPost}
          helperText={errorText}
          error={Boolean(errorText)}
          onChange={(e) => {
            setErrorText('')
            setNewPost(e.currentTarget.value);
          }}
          onKeyDown={async (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.keyCode !== 13) return;
            e.target.blur();
            onClickSubmit();
          }}
          variant="outlined" color="primary"
        />
        <LoadingButton
          onClick={onClickSubmit}
          loading={createLoading}
          disabled={fetchLoading}
          variant="contained">送信
        </LoadingButton>
      </Box>
      <Card>
        <CardHeader
          title={postData?.title}
          subheader={`ID：${postData?.threadId}`}
        />
        {!Boolean(postData?.posts.length) && fetchLoading && (
          <Loading />
        )}
        {!Boolean(postData?.posts.length) && !fetchLoading && (
          <Box sx={{ textAlign: 'center', p: '30px' }}>
            <Typography variant="h6">まだメッセージはありません</Typography>
          </Box>
        )}
        {Boolean(postData?.posts.length) && (
          <List sx={{ width: '100%' }}>
            {postData?.posts.map((post) => (
              <ListItem key={post.id}>
                <ListItemAvatar>
                  <Avatar>
                    <MessageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={post.post} secondary={`id:${post.id}`} />
              </ListItem>
            ))}
          </List>
        )}
      </Card>
      <Box sx={{ mt: '20px', textAlign: 'center' }}>
        <LoadingButton
          onClick={fetchPostData}
          loading={fetchLoading}
          disabled={createLoading}
          variant="contained">読み込む
        </LoadingButton>
      </Box>
    </Container>
  );
}
export default Detail;
