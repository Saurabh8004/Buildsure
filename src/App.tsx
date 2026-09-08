import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contractors from './pages/Contractors';
import Financing from './pages/Finance';
import HowItWorks from './pages/HowItWorks';
import ForClients from './pages/ForClients';
import ForContractors from './pages/ForContractors';
import ArchitectPartnership from './pages/ArchitectPartnership';
import QualityAssurance from './pages/QualityAssurance';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';
import GetStarted from './pages/GetStarted';
import SignIn from './pages/SignIn';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contractors" element={<Contractors />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/finance" element={<Financing />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/for-clients" element={<ForClients />} />
          <Route path="/for-contractors" element={<ForContractors />} />
          <Route path="/architect-partnership" element={<ArchitectPartnership />} />
          <Route path="/quality-assurance" element={<QualityAssurance />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Route>
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
