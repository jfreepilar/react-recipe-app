import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'typeface-lora'
import { BrowserRouter} from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/react-recipe-app/">
      <App />
    </BrowserRouter>
  </StrictMode>
)