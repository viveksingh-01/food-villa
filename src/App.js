import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import Home from './components/Home';

const App = () => (
  <>
    <Header />
    <Home />
  </>
);

const root = createRoot(document.getElementById('root'));
root.render(<App />);
