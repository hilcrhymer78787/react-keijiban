import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './page/Index'
import New from './page/thread/New'
import FooterNavigation from './component/FooterNavigation'

const App = () => {
  return (
    <BrowserRouter>
      <FooterNavigation />
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/thread/new" element={<New />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
