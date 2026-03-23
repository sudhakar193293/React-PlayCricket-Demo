import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery';
// import 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import './styles/bootstrap.min.css';
// import './styles/bootstrap-scoped.css';
// import './styles/bootstrap-scoped.min.css';
// import './styles/styles.css';

createRoot(document.getElementById('wrapper-header-root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
