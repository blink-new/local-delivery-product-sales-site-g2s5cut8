
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster 
      position="top-center" 
      toastOptions={{
        duration: 2000,
        style: {
          background: '#fff',
          color: '#333',
          boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          padding: '12px 16px',
        },
        success: {
          iconTheme: {
            primary: '#0ea5e9',
            secondary: '#fff',
          },
        }
      }}
    />
    <App />
  </React.StrictMode>,
)