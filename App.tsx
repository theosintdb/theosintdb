
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import News from './pages/News';
import CTU from './pages/CTU';
import AHTU from './pages/AHTU';
import Resources from './pages/Resources';
import Learn from './pages/Learn';
import Opsec from './pages/Opsec';
import About from './pages/About';
import Donate from './pages/Donate';
import Report from './pages/Report';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';
import ProtectedRoute from './components/ProtectedRoute';
import OwnerProtectedRoute from './components/OwnerProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';
import ManageHomepage from './pages/admin/ManageHomepage';
import ManageNews from './pages/admin/ManageNews';
import ManageResources from './pages/admin/ManageResources';
import ManageApplications from './pages/admin/ManageApplications';
import ManageReports from './pages/admin/ManageReports';
import ManageCorePages from './pages/admin/ManageCorePages';
import ManageTraining from './pages/admin/ManageTraining';
import OwnerLayout from './pages/owner/OwnerLayout';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import ManageSystem from './pages/owner/ManageSystem';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ContentProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<News />} />
                <Route path="/ctu" element={<CTU />} />
                <Route path="/ahtu" element={<AHTU />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/opsec" element={<Opsec />} />
                <Route path="/about" element={<About />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/report" element={<Report />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />

                {/* Admin Routes (Accessible by Admin and Owner) */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute roles={['Admin', 'Owner']}>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="homepage" element={<ManageHomepage />} />
                  <Route path="news" element={<ManageNews />} />
                  <Route path="resources" element={<ManageResources />} />
                  <Route path="applications" element={<ManageApplications />} />
                  <Route path="reports" element={<ManageReports />} />
                  <Route path="core-pages" element={<ManageCorePages />} />
                  <Route path="training" element={<ManageTraining />} />
                </Route>

                {/* Owner Routes (Owner only) */}
                <Route
                  path="/owner"
                  element={
                    <OwnerProtectedRoute>
                      <OwnerLayout />
                    </OwnerProtectedRoute>
                  }
                >
                  <Route path="dashboard" element={<OwnerDashboard />} />
                  <Route path="system" element={<ManageSystem />} />
                </Route>

              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </ContentProvider>
    </AuthProvider>
  );
};

export default App;