import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { Provider } from 'react-redux'
import { store } from './redux/store' 


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          fontFamily: 'Edu VIC WA NT Beginner',
          colorScheme: 'light',
          colors: {
            brand: ['#F61067', '#3F2E56', '#39A0ED', '#CBFF8C', '#F4EBD9']
          }
        }}
      >
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  </React.StrictMode>
)
