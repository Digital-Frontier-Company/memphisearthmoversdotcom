
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'

// Add a DOM content loaded event to ensure bots detect when JS has finished
document.addEventListener('DOMContentLoaded', () => {
  // Create a meta element for crawlers to detect JS-loaded content
  const meta = document.createElement('meta');
  meta.name = 'render-status';
  meta.content = 'ready';
  document.head.appendChild(meta);
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
