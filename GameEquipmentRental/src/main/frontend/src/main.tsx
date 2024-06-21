import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/index.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Page Components
import App from './App.tsx'
import Home from "./components/pages/Home.tsx";
import Register from "./components/pages/Register.tsx";
import Login from "./components/pages/Login.tsx";
import Admin from "./components/pages/Admin.tsx";

// Todo: index 페이지 변경 (로그인 페이지로)
const routes = [{
    path: '/',
    element: <App/>,
    children: [
        {index: true, element: <Home/>},
        {path: '/page/login', element: <Login/>},
        {path: '/register', element: <Register/>},
        {path: '/admin', element: <Admin/>},
    ]
}];

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </React.StrictMode>
);