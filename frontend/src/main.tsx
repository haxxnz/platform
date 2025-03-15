import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <App />
  );
} else {
  console.error("Root element not found");
}