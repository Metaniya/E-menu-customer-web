import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { AppProvider } from './app/providers/AppProvider'
import { ThemeProvider } from './app/providers/ThemeProvider'
import App from './app/App'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  </BrowserRouter>
)
