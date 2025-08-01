import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './Components/router.jsx'
import AuthProvider from './Components/Provider/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(

  <StrictMode>

    <QueryClientProvider client={queryClient}>
      <ToastContainer></ToastContainer>
      <AuthProvider><RouterProvider router={router}></RouterProvider></AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
