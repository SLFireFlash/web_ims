import './App.css';
import './media.css';
import './HamMenu.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";

import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ContextProvider } from './context/ContextProvider'
function App() {

  return (
    <>
    <ContextProvider>
      <RouterProvider router={router} />  
    </ContextProvider>
    </>
  )
}

export default App


