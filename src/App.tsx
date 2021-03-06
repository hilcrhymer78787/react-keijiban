import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './page/Index'
import New from './page/thread/New'
import Detail from './page/thread/Detail'
import FooterNavigation from './component/FooterNavigation'
import { Box } from '@mui/material';


const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{ pb: '80px', pt: '30px' }}>
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/thread/new" element={<New />}></Route>
          <Route path='/thread/:thread_id' element={<Detail />}></Route>
        </Routes>
        <FooterNavigation />
      </Box>
    </BrowserRouter>
  );
}

export default App;
