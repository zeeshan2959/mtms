import { BrowserRouter } from 'react-router-dom';
import { PageTransitionDirectionProvider } from './context/PageTransitionDirectionContext';
import { PageShiftProvider } from './context/PageShiftContext';
import MainLayout from './components/layout/MainLayout';
import PageShiftOutlet from './components/layout/PageShiftOutlet';

function App() {
  return (
    <BrowserRouter>
      <PageShiftProvider>
        <PageTransitionDirectionProvider>
          <MainLayout>
            <PageShiftOutlet />
          </MainLayout>
        </PageTransitionDirectionProvider>
      </PageShiftProvider>
    </BrowserRouter>
  );
}

export default App;
