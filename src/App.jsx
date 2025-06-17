import './App.css'
import MuiThemeProvider from './mui-theme/MuiThemeProvider'
import { RouterProvider } from 'react-router-dom'
import { Routers } from './route/Routers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const client = new QueryClient();
  return (
    <MuiThemeProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={Routers} />
      </QueryClientProvider>
    </MuiThemeProvider>
  )
}

export default App
