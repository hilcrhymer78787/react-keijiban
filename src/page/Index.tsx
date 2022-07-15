import React from "react";
import { api } from "../plugins/axios";
import { Box, Button, CardHeader, Card, List, ListItem, ListItemAvatar, ListItemText, Avatar, Container, Typography } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Loading from './../component/Loading'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useNavigate } from 'react-router-dom';

export type apiThreadsReq = {
  offset: number;
}
export type apiThreadsRes = threadType[];
export type threadType = {
  id: string;
  title: string;
}

export const getThreads = async (offset: number) => {
  const apiParam: apiThreadsReq = {
    offset: offset
  };
  const requestConfig: AxiosRequestConfig = {
    url: "/threads",
    method: "GET",
    params: apiParam
  };
  return api(requestConfig)
    .then((res: AxiosResponse<apiThreadsRes>) => res.data)
    .catch((err: AxiosError) => [])
}
const useThreads = () => {
  const [threads, setThreads] = React.useState<apiThreadsRes>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const fetchThreads = async () => {
    setIsLoading(true);
    const res = await getThreads(threads.length);
    setIsLoading(false);
    setThreads((prevState) => {
      return [...prevState, ...res]
    });
  }
  React.useEffect(() => {
    fetchThreads()
  }, []);
  return {
    threads,
    isLoading,
    fetchThreads,
  }
}

function Index() {
  const { threads, isLoading, fetchThreads } = useThreads();
  const navigate = useNavigate();
  return (
    <Container>
      <Typography color="primary" variant="h4" sx={{ mb: '20px' }}>スレッド一覧画面</Typography>
      <Card>
        <CardHeader title="スレッド一覧" />
        <List sx={{ width: '100%' }}>
          {threads.map((thread, index) => (
            <ListItem key={index} onClick={() => {
              navigate(`/thread/${thread.id}`)
            }}>
              <ListItemAvatar>
                <Avatar>
                  <ContentPasteIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={thread.title} secondary={`id:${thread.id}`} />
            </ListItem>
          ))}
        </List>
        {!Boolean(threads.length) && isLoading && (
          <Loading />
        )}
      </Card>
      <Box sx={{ mt: '20px', textAlign: 'center' }}>
        <LoadingButton
          onClick={fetchThreads}
          loading={isLoading}
          variant="contained">読み込む
        </LoadingButton>
      </Box>
    </Container>
  );
}
export default Index;
