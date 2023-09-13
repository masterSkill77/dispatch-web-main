import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Home, Timeline } from "./Views"
import BlanckLayout from "./components/BlanckLayout"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageNotFound from './Views/PageNotFound'
import Dashboard from './Views/Dashboard/index'
import Account from './Views/Account/Account'
import Reports from './Views/Report/Index'
import BookNow from './Views/Bookings/BookNow'
import { Provider } from 'react-redux'
import store from './App/Store/store'
import Quotations from './Views/Quotations/Quotations'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<BlanckLayout />} />
          <Route  path='/app' element={<App />}>
            <Route index element={<Home />} />
            <Route path='trips-log' element={<Timeline />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='account' element={<Account />} />
            <Route path='reports' element={<Reports />} />
            <Route path='book-now' element={<BookNow />} />
            <Route path='quotations' element={<Quotations />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
