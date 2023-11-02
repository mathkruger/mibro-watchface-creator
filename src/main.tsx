import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/home/Home'
import Header from './components/header/Header'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header />
    
    <Home />
  </React.StrictMode>,
)
