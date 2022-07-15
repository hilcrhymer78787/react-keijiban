import React from "react";
import { api } from "../plugins/axios";
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Container, Typography } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Loading from './../component/Loading'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export type apiThreadsReq = {
  offset: number;
}
export type apiThreadsRes = threadType[];
export type threadType = {
  id: string;
  title: string;
}

export const getThreads = async () => {
  const apiParam: apiThreadsReq = {
    offset: 10
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
    const res = await getThreads();
    setIsLoading(false);
    setThreads(res);
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
  const { threads, isLoading } = useThreads();
  if (isLoading) return <Loading />;
  return (
    <Container>
      <Typography color="primary" variant="h4" sx={{ mb: '20px' }}>一覧</Typography>
      <List sx={{ width: '100%' }}>
        {threads.map((thread) => (
          <ListItem key={thread.id}>
            <ListItemAvatar>
              <Avatar>
                <ContentPasteIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={thread.title} secondary={`id:${thread.id}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
export default Index;
