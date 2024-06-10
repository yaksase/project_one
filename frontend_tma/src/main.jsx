import React from 'react'
import ReactDOM from 'react-dom/client'
import WebApp from '@twa-dev/sdk'
import { RouterProvider, createBrowserRouter  } from 'react-router-dom'

import Root from './Routes/Root.jsx'
import Home from './Routes/Home.jsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>
      }
    ]
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
