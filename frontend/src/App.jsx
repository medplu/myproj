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

function App() {
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
                    element={authUser ? <ServicesSection authUser={authUser}/> : <Navigate to="login" />}
                />
                {/* add the route to about component */}
                <Route
                    path="/about"
                    element={authUser ? <About /> : <Navigate to="login" />}
                />
            </Routes>
            {authUser && !isLandingPage && <Sidebar />} {/* Exclude sidebar from landing page */}
            <Toaster />
        </div>
    );
}

export default App;
