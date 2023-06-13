import { createRoot } from 'react-dom/client';
import Body from './components/Body';
import Header from './components/Header';

const App = () => (
  <>
    <Header />
    <Body />
  </>
);

const root = createRoot(document.getElementById('root'));
root.render(<App />);
