import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageTransitionDirectionProvider } from './context/PageTransitionDirectionContext';
import MainLayout from './components/layout/MainLayout';
import PresentationViewer from './components/presentation/PresentationViewer';
import { SLIDES_CONFIG } from './config/slides';

function App() {
  return (
    <BrowserRouter>
      <PageTransitionDirectionProvider>
        <MainLayout>
          <Routes>
            <Route path="*" element={<PresentationViewer slides={SLIDES_CONFIG} />} />
          </Routes>
        </MainLayout>
      </PageTransitionDirectionProvider>
    </BrowserRouter>
  );
}

export default App;
