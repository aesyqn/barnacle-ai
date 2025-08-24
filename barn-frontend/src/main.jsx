import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider 
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={4000}
        preventDuplicate
        dense
        iconVariant={{
          success: '⚓',
          error: '🚨',
          warning: '⚠️',
          info: '🌊',
        }}
      >
        <App />
      </SnackbarProvider>
    </Provider>
  </StrictMode>,
)
