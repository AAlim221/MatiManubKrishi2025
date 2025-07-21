import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './routes/router'
import { RouterProvider } from 'react-router'
import './index.css'
import "./i18n"; 
import AuthProvider from "./context/AuthProvider";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
