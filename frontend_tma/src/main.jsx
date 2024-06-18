import React from 'react'
import ReactDOM from 'react-dom/client'
import WebApp from '@twa-dev/sdk'
import { RouterProvider, createBrowserRouter  } from 'react-router-dom'

import Root from './Routes/Root.jsx'
import Home from './Routes/Home.jsx'
import Inventory from './Routes/Inventory.jsx'
import Market from './Routes/Market.jsx'
import Drops from './Routes/Drops/Drops.jsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: 'inventory',
        element: <Inventory></Inventory>
      },
      {
        path: 'market',
        element: <Market></Market>
      },
      {
        path: 'drops',
        element: <Drops></Drops>
      }
    ]
  }
])

WebApp.ready();
WebApp.setHeaderColor("#000000");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
