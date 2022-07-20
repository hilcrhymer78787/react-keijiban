import React from "react";
import { LoadingButton } from "@mui/lab";
import { TextField, CardHeader, Card, Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Container, Typography } from '@mui/material';
import Loading from './../../component/Loading'
import { useParams } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message';
import { usePostData } from '../../data/posts'


function Detail() {
  const params = useParams()
  const { postData, fetchLoading, fetchPostData, createLoading, createPostData, getErrorText } = usePostData();
  const [newPost, setNewPost] = React.useState('');
  const [postErrorText, setPostErrorText] = React.useState('');

  const onClickSubmit = async () => {
    try {
      await createPostData(newPost)
      setPostErrorText('');
      setNewPost('');

    } catch (e) {
      if (e instanceof Error) {
        setPostErrorText(e.message);
      } else {
        setPostErrorText('予期せぬエラー');
      }

    }
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
          helperText={postErrorText}
          error={!!postErrorText}
          onChange={(e) => {
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
          subheader={`ID：${params?.thread_id}`}
        />
        {!postData?.posts.length && fetchLoading && (
          <Loading />
        )}
        {!postData?.posts.length && !fetchLoading && (
          <Box sx={{ textAlign: 'center', p: '30px' }}>
            <Typography variant="h6">まだメッセージはありません</Typography>
          </Box>
        )}
        {!!postData?.posts.length && (
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
      {!!getErrorText && (
        <Box sx={{ mt: '20px', textAlign: 'center' }}>
          <Typography color="red" variant="h6" sx={{ mb: '20px' }}>{getErrorText}</Typography>
        </Box>
      )}
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
