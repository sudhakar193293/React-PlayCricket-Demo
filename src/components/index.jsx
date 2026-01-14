// import React from "react";
// import ReactDOM from "react-dom/client";
// import Header from "./MainHeader";
// import '../styles/styles.css';

// // export {Header};

// window.__Header_Loaded__ = true;

// window.renderHeader = function (containerId, props) {
//   const el = document.getElementById(containerId);
//   if (!el){
//     console.log("container not found",el);
//     return;
//   }
 
//   const root = ReactDOM.createRoot(el);
//   root.render(<Header {...props} />);
// };


import React from "react";
import { createRoot } from "react-dom/client";
import MainHeader from "./MainHeader";
import '../styles/styles.css';
 
// Mount function
function renderHeader(elementId, props = {}) {
  const container = document.getElementById(elementId);
  if (!container) {
    console.error("Container not found:", elementId);
    return;
  }
 
  const root = createRoot(container);
  root.render(<MainHeader {...props} />);
}
 
// Expose to window (VERY IMPORTANT)
window.ReactHeader = {
  render: renderHeader
};
 
export { renderHeader };
export default MainHeader;