import { Box, CardHeader, Card, List, ListItem, ListItemAvatar, ListItemText, Avatar, Container, Typography } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Loading from './../component/Loading'
import { useNavigate } from 'react-router-dom';
import { useThreads } from '../data/threads'

function Index() {
  const { threads, isLoading, fetchThreads, errorText } = useThreads();
  const navigate = useNavigate();
  return (
    <Container>
      <Typography color="primary" variant="h4" sx={{ mb: '20px' }}>スレッド一覧画面</Typography>
      <Card>
        <CardHeader title="スレッド一覧" />
        <List sx={{ width: '100%' }}>
          {threads.map((thread) => (
            <ListItem key={thread.id} sx={{ cursor: 'pointer' }} onClick={() => {
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
        {!threads.length && isLoading && (
          <Loading />
        )}
      </Card>
      {!!errorText && (
        <Box sx={{ mt: '20px', textAlign: 'center' }}>
          <Typography color="red" variant="h6" sx={{ mb: '20px' }}>{errorText}</Typography>
        </Box>
      )}
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
