// App.js
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './components/common/LoadingSpinner';
import TopSection from './components/common/Top'; // Import the new component
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/login/LoginPage';
import SignUpPage from './pages/auth/signup/SignUpPage';
import NotificationPage from './pages/notification/NotificationPage';
import ProfilePage from './pages/profile/ProfilePage';
import Landing from './pages/landing/Landing';
import ServicesSection from './components/services/ServiceSection';
import Sidebar from './components/Sidebar'
import About from './components/about/About'; // Import the new component
import PatientsPage from './pages/patients/PatientsPage';
import  Doctors  from './components/services/Doctors';
import DoctorPage from './pages/doctor/DoctorPage';
import DoctorProfilePage from './components/services/DoctorProfilePage';
import BottomNavigation from './components/BottomNavigation';


function App() {
    const doctors = [
        { id: 1, name: "Dr. Gedion", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714413116/ud5hxekv1kjrnye9k3bu.jpg", profession: "Cardiologist", Bio: "Dr. Gedion is a skilled surgeon" },
        { id: 2, name: "Dr. Jane", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714938261/c3_caagpo.jpg", profession: "Nephrologist" , Bio: "Dr. Jane is a skilled surgeon"},
        { id: 3, name: "Dr. Christine", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1714938261/c5_nqwsbg.jpg", profession: "Neurology" , Bio: "Dr. Christine is a skilled surgeon"},
        { id: 4, name: "Dr. Sarah", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1713302476/medplus/lqpitkwtbmrkopmf9fn6.jpg", profession: "Pediatrician", Bio: "Dr. Sarah is a skilled surgeon"},
        { id: 5, name: "Dr. David", image: "https://res.cloudinary.com/dws2bgxg4/image/upload/v1713424680/medplus/vdhawsoagg1029odkjsj.jpg", profession: "Psychiatrist", Bio: "Dr. David is a skilled surgeon"},
        // Add more doctors as needed
      ];
    
    const { data: authUser, isLoading } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            try {
                const res = await fetch('/api/auth/me');
                const data = await res.json();
                if (data.error) return null;
                if (!res.ok) {
                    throw new Error(data.error || 'Something went wrong');
                }

                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        retry: false,
    });

    const location = useLocation();
    const isLandingPage = location.pathname === '/landing';
    const isDoctorPage = /\/doctor\/\d+/.test(location.pathname); // Check if the current page is the DoctorPage

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="w-full font-sans">
            {!isLandingPage && <TopSection authUser={authUser} />} {/* Render the TopSection component */}
            
            <Routes>
                {authUser && (
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                )}
                {!authUser && <Route path="/" element={<Navigate to="/login" />} />}
                <Route
                    path="/login"
                    element={!authUser ? <LoginPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/signup"
                    element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/notifications"
                    element={
                        authUser ? <NotificationPage /> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/profile/:username"
                    element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/landing"
                    element={authUser ? <Landing /> : <Navigate to="/login" />}
                />
                <Route
                    path="/services"
                    element={authUser ? <ServicesSection doctors={doctors} authUser={authUser}/> : <Navigate to="login" />}
                />

               <Route path="/doctor/:doctorId" element={authUser ? <DoctorPage authUser={authUser} userId={authUser._id} /> : <Navigate to='login' />} 
               />
                {/* add the route to about component */}
                <Route
    path="/doctors"
    element={authUser ? <Doctors authUser={authUser} userId={authUser._id}/> : <Navigate to="login" />}
/>


                <Route
                    path="/about"
                    element={authUser ? <About /> : <Navigate to="login" />}
                />
                {/* add route to DoctorPage  */}


        
                
            </Routes>
            {authUser && !isLandingPage && !isDoctorPage && <Sidebar />} {/* Exclude sidebar from landing page and DoctorPage */}
            <Toaster />
        </div>
    );
}

export default App;
