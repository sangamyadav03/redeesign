import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
<<<<<<< HEAD
import { Provider } from "react-redux";
import { store } from './store/Store.jsx'
import { AuthProvider } from './context/AuthContext.jsx'


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </Provider>
=======


createRoot(document.getElementById("root")).render(
  
      <BrowserRouter>
        <App />
      </BrowserRouter>
 
>>>>>>> f11f18e5877cb6d3de8062d5774d3e59cb4d676a
);


