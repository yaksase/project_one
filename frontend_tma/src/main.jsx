import React from 'react'
import eruda from 'eruda';
import ReactDOM from 'react-dom/client'
import WebApp from '@twa-dev/sdk'
import { RouterProvider, createBrowserRouter  } from 'react-router-dom'

import Root from './Routes/Root.jsx'
import Home from './Routes/Home/Home.jsx'
import Inventory from './Routes/Inventory/Inventory.jsx'
import Market from './Routes/Market/Market.jsx'
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
WebApp.setBackgroundColor("#000000");
WebApp.onEvent('popupClosed', (params) => {
  if (params.button_id === 'popupClose') {
    WebApp.close();
  }
})

eruda.init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
