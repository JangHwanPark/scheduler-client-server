import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/index.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

// Page Components
import App from './App.tsx'
import Home from "./components/pages/Home.tsx";
import Register from "./components/pages/Register.tsx";
import Login from "./components/pages/Login.tsx";

const routes = [{
    path: '/',
    element: <App/>,
    children: [
        {index: true, element: <Home/>},
        {path: '/login', element: <Login/>},
        {path: '/register', element: <Register/>},
    ]
}]

const router = createBrowserRouter(routes)
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)