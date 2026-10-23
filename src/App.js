import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/HomeComponent';
import Footer from './pages/FooterComponent';
import Services from './pages/Services/ServicesComponent';
import ServiceDetail from './pages/ServiceDetail/ServicesComponent';
import SpecialistProfile from './pages/SpecialistProfile/SpecialistProfileComponent';
import Profile from './pages/Profile/ProfileComponent';
import Journey from './pages/Journey/JourneyComponent';
import AppointmentsDet from './pages/Appointments/AppointmentsDetailComponent';
import Appointments from './pages/Appointments/AppointmentsComponent';
import Consultation from './pages/Consultation/ConsultationComponent';
import Booking from './pages/Booking/BookingComponent';
import Login from './pages/Auth/LoginComponent';
import Register from './pages/Auth/RegisterComponent';
import AuthCheckComponent from './components/AuthCheckComponent';

function App() {
    return (
        <div className="page-outer">
            <div className="app-shell">
                <BrowserRouter>
                    <Routes>
                        {/* صفحات عمومی */}
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/service-detail/:id" element={<ServiceDetail />} />
                        <Route path="/specialist-profile/:id" element={<SpecialistProfile />} />

                        {/* صفحات ورود و ثبت‌نام */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* صفحات نیازمند ورود */}
                        <Route element={<AuthCheckComponent />}>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/journey" element={<Journey />} />
                            <Route path="/appointments" element={<Appointments />} />
                            <Route path="/appointments/detail/:id" element={<AppointmentsDet />} />
                            <Route path="/booking" element={<Booking />} />
                            <Route path="/consultation" element={<Consultation />} />
                        </Route>
                    </Routes>

                    <Footer />
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;