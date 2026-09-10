import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/HomeAnimated';
import PageLoader from './components/PageLoader';
import HowItWorks from './pages/HowItWorks';
import ForClients from './pages/ForClients';
import ForContractors from './pages/ForContractors';
import ArchitectPartnership from './pages/ArchitectPartnership';
import QualityAssurance from './pages/QualityAssurance';
import Finance from './pages/Finance';
import FinancingRequest from './pages/FinancingRequest';
import InspectionRequest from './pages/InspectionRequest';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';
import GetStarted from './pages/GetStarted';
import SignIn from './pages/SignIn';
import VerifyEmail from './pages/VerifyEmail';
import Projects from './pages/Projects';
import Contractors from './pages/Contractors';
import CreateProject from './pages/CreateProject';
import ProjectDetails from './pages/ProjectDetails';
import ContractorProfile from './pages/ContractorProfile';
import AdminDashboard from './pages/AdminDashboard';
import ContractorDashboard from './pages/ContractorDashboard';
import ClientDashboard from './pages/ClientDashboard';
import ArchitectDashboard from './pages/ArchitectDashboard';
import InspectorDashboard from './pages/InspectorDashboard';
import ConfigCheck from './pages/ConfigCheck';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <PageLoader />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/for-clients" element={<ForClients />} />
          <Route path="/for-contractors" element={<ForContractors />} />
          <Route path="/architect-partnership" element={<ArchitectPartnership />} />
          <Route path="/quality-assurance" element={<QualityAssurance />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/financing" element={<Finance />} />
          <Route path="/financing/request" element={<FinancingRequest />} />
          <Route path="/quality-assurance/request" element={<InspectionRequest />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<ProtectedRoute requiredRole="client"><CreateProject /></ProtectedRoute>} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/contractors" element={<Contractors />} />
          <Route path="/contractors/:id" element={<ContractorProfile />} />
        </Route>
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/config-check" element={<ConfigCheck />} />
        
        {/* Dashboard Routes */}
        <Route
          path="/dashboard/contractor"
          element={
            <ProtectedRoute requiredRole="contractor">
              <ContractorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/client"
          element={
            <ProtectedRoute requiredRole="client">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/architect"
          element={
            <ProtectedRoute requiredRole="architect">
              <ArchitectDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/inspector"
          element={
            <ProtectedRoute requiredRole="inspector">
              <InspectorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
