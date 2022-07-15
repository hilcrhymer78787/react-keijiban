import { Box, CircularProgress } from '@mui/material';
export const Loading = () => {
  return (
    <Box sx={{
      width: '100%',
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <CircularProgress />
    </Box>
  )
}
export default Loading;