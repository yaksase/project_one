import React from 'react'
import ReactDOM from 'react-dom/client'
import WebApp from '@twa-dev/sdk'
import Root from './Routes/Root.jsx'
import { RouterProvider, createBrowserRouter  } from 'react-router-dom'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: []
  }
])
document.body.style.backgroundColor = "black"
WebApp.ready();
WebApp.setHeaderColor("#000000");
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
