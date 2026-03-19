import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import RAndDTeams from './pages/RAndDTeams';
import Domain from './pages/Domain';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/"             element={<Dashboard />} />
          <Route path="/domain"     element={<Domain />} />
          <Route path="/contact"       element={<Contact />} />
          <Route path="/about"        element={<About />} />
          <Route path="/services"     element={<Services />} />
          <Route path="/teams"     element={<RAndDTeams />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
