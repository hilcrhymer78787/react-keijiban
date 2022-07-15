import React from "react";
import { api } from "../plugins/axios";
import '../App.css';
import {Container} from '@mui/material';


export const Index = () => {
  const [res, setRes] = React.useState(null);
  React.useEffect(() => {
    const requestConfig = {
      url: "/threads",
      method: "GET",
      params: {
        offset: 10
      }
    };
    api(requestConfig)
      .then((res) => {
        setRes(res.data);
      });
  },[]);
  return (
    <Container>
      <h1>一覧</h1>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </Container>
  );
}

export default Index;
