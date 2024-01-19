import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {AuthContextProvider} from "./context/AuthContext.jsx"
import SocketContextProvider from './context/SocketContext/SocketContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketContextProvider>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </SocketContextProvider>
  </React.StrictMode>,
)
