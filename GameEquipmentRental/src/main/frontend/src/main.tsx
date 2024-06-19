import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './scss/index.scss'

// Components
import App from './App.tsx'
import Home from "./components/pages/Home.tsx";
import Register from "./components/pages/Register.tsx";

const routes = [{
    path: '/',
    element: <App/>,
    children: [
        {index: true, element: <Home/>},
        {path: '/register', element: <Register/>},
    ]
}]

const router = createBrowserRouter(routes)
const Root: React.FC = () => {
    return <RouterProvider router={router}/>
}

export default Root