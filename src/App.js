import logo from './logo.svg';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/HomeComponent';
import Footer from './pages/FooterComponent';
import Services from './pages/Services/ServicesComponent';
import ServiceDetail from './pages/ServiceDetail/ServicesComponent';


function App() {
  return (
  <div className="page-outer">
    <div className="app-shell">
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/services" element={<Services />} />
        <Route path="/service-detail/:id" element={<ServiceDetail />}/>
      </Routes>

      <Footer/>
    </BrowserRouter>
    </div>
  </div>
  );
}

export default App;
