import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { currentPath } from './config';
import './styles.css';
const root = document.getElementById('root')!;
const app = <App path={currentPath()} />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
