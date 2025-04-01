import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Particles from './Particles.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Particles />
  </StrictMode>,
)
