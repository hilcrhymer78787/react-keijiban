import React from "react";
import { api } from "../../plugins/axios";
import '../../App.scss';
import { Button, Container, TextField, Typography } from '@mui/material';

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
  }
  return (
    <Container>
      <Typography color="primary" variant="h4" sx={{mb:'20px'}}>新規作成</Typography>
      <TextField
        sx={{ mr: '10px' }}
        size='small'
        value={title}
        onChange={(e) => { setTitle(e.currentTarget.value); }}
        variant="outlined" color="primary"
      />
      <Button onClick={createThread} variant="contained">ボタン</Button>
      {/* <pre>{JSON.stringify(title, null, 2)}</pre> */}
    </Container>
  );
}

export default New;
