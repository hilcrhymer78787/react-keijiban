import React from "react";
import { api } from "../../plugins/axios";
import '../../App.css';
import { Button, Container, TextField } from '@mui/material';

export const New = () => {
  const [title, setTitle] = React.useState('');
  const createThread = () => {
    const requestConfig = {
      url: "/threads",
      method: "POST",
      data: {
        title: title
      }
    };
    api(requestConfig)
      .then((res) => {
        console.log(res);
      });
  }
  return (
    <Container>
      <h1>新規作成</h1>
      <TextField
        sx={{mr:'10px'}}
        size='small'
        value={title}
        onChange={(e) => { setTitle(e.currentTarget.value); }}
        variant="outlined" color="primary"
      />
      <Button onClick={createThread} variant="contained">ボタン</Button>
      <pre>{JSON.stringify(title, null, 2)}</pre>
    </Container>
  );
}

export default New;
