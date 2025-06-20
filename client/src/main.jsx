import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './routes/router'
import { RouterProvider } from 'react-router'
import './index.css'
import "./i18n"; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
