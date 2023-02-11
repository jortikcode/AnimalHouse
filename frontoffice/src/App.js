import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Forum from './pages/Forum';
import Marketplace from './pages/Marketplace';
import Services from './pages/Services';
import Navbar from './components/Navbar/Navbar'
import LoginRegisterPage from './pages/LoginRegisterPage';
import QuestionDetails from './components/Forum/QuestionDetails';
import ProductDetails from './components/Marketplace/ProductDetails';

function App() {
  return (
  <div className="w-full min-h-screen">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/forum' element={<Forum />} />
        <Route path='/forum/:id' element={<QuestionDetails />} />
        <Route path='/marketplace' element={<Marketplace />} />
        <Route path='/marketplace/:id' element={<ProductDetails />} />
        <Route path='/services' element={<Services />} />
        <Route path='/login' element={<LoginRegisterPage login={true} />} />
        <Route path='/signup' element={<LoginRegisterPage signup={true} />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
