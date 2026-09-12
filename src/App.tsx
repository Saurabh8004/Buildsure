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
import ContractorLayout from './components/contractor/ContractorLayout';
import ContractorDashboardNew from './pages/contractor/ContractorDashboard';
import FindProjects from './pages/contractor/FindProjects';
import MyBids from './pages/contractor/MyBids';
import AwardedProjects from './pages/contractor/AwardedProjects';
import ActiveProjects from './pages/contractor/ActiveProjects';
import Progress from './pages/contractor/Progress';
import Milestones from './pages/contractor/Milestones';
import QAInspections from './pages/contractor/QAInspections';
import QualityIssues from './pages/contractor/QualityIssues';
import CorrectiveActions from './pages/contractor/CorrectiveActions';
import Reinspection from './pages/contractor/Reinspection';
import Documents from './pages/contractor/Documents';
import Payments from './pages/contractor/Payments';
import Notifications from './pages/contractor/Notifications';
import Messages from './pages/contractor/Messages';
import ContractorProfileNew from './pages/contractor/ContractorProfile';
import Settings from './pages/contractor/Settings';
// Client imports
import ClientLayout from './components/client/ClientLayout';
import ClientDashboardNew from './pages/client/ClientDashboard';
import MyProjects from './pages/client/MyProjects';
import PostProject from './pages/client/PostProject';
import BidsReceived from './pages/client/BidsReceived';
import CompareBids from './pages/client/CompareBids';
import ProgressClient from './pages/client/Progress';
import MilestonesClient from './pages/client/Milestones';
import QAInspectionsClient from './pages/client/QAInspections';
import QualityIssuesClient from './pages/client/QualityIssues';
import CorrectiveActionsClient from './pages/client/CorrectiveActions';
import ReinspectionClient from './pages/client/Reinspection';
import DocumentsClient from './pages/client/Documents';
import PaymentsClient from './pages/client/Payments';
import ArchitectServices from './pages/client/ArchitectServices';
import ConstructionFinance from './pages/client/ConstructionFinance';
import NotificationsClient from './pages/client/Notifications';
import MessagesClient from './pages/client/Messages';
import ClientProfileNew from './pages/client/ClientProfile';
import SettingsClient from './pages/client/Settings';

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
        
        {/* Role-Based Dashboard Routes */}
        <Route
          path="/client"
          element={
            <ProtectedRoute requiredRole="client">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contractor"
          element={
            <ProtectedRoute requiredRole="contractor">
              <ContractorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ContractorDashboardNew />} />
          <Route path="projects" element={<FindProjects />} />
          <Route path="bids" element={<MyBids />} />
          <Route path="awarded-projects" element={<AwardedProjects />} />
          <Route path="active-projects" element={<ActiveProjects />} />
          <Route path="progress" element={<Progress />} />
          <Route path="milestones" element={<Milestones />} />
          <Route path="qa" element={<QAInspections />} />
          <Route path="quality-issues" element={<QualityIssues />} />
          <Route path="corrective-actions" element={<CorrectiveActions />} />
          <Route path="reinspection" element={<Reinspection />} />
          <Route path="documents" element={<Documents />} />
          <Route path="payments" element={<Payments />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<ContractorProfileNew />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route
          path="/client"
          element={
            <ProtectedRoute requiredRole="client">
              <ClientLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ClientDashboardNew />} />
          <Route path="projects" element={<MyProjects />} />
          <Route path="projects/new" element={<PostProject />} />
          <Route path="bids" element={<BidsReceived />} />
          <Route path="compare" element={<CompareBids />} />
          <Route path="progress" element={<ProgressClient />} />
          <Route path="milestones" element={<MilestonesClient />} />
          <Route path="qa" element={<QAInspectionsClient />} />
          <Route path="quality-issues" element={<QualityIssuesClient />} />
          <Route path="corrective-actions" element={<CorrectiveActionsClient />} />
          <Route path="reinspection" element={<ReinspectionClient />} />
          <Route path="documents" element={<DocumentsClient />} />
          <Route path="payments" element={<PaymentsClient />} />
          <Route path="architect-services" element={<ArchitectServices />} />
          <Route path="finance" element={<ConstructionFinance />} />
          <Route path="notifications" element={<NotificationsClient />} />
          <Route path="messages" element={<MessagesClient />} />
          <Route path="profile" element={<ClientProfileNew />} />
          <Route path="settings" element={<SettingsClient />} />
        </Route>
        <Route
          path="/architect"
          element={
            <ProtectedRoute requiredRole="architect">
              <ArchitectDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inspector"
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
