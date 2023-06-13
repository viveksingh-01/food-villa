import { createRoot } from 'react-dom/client';
import Header from './components/Header';

const App = () => (
  <>
    <Header />
  </>
);

const root = createRoot(document.getElementById('root'));
root.render(<App />);
