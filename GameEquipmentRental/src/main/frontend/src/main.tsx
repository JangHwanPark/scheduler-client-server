import ReactDOM from 'react-dom/client'
import './scss/index.scss'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { CookiesProvider } from 'react-cookie';

// Page Components
import App from './App.tsx'
import {Register, Admin, Login} from "./components/pages";
import {AuthProvider} from "./context/AuthContext.tsx";
import Customer from "./components/pages/Customer.tsx";
import NotFound from "./components/pages/not-found.tsx";

const routes = [{
    path: '/',
    element: <App/>,
    errorElement: <NotFound/>,
    children: [
        {index: true, element: <Login/>},
        {path: '/admin', element: <Admin/>},
        {path: '/customer', element: <Customer/>},
        {path: '/register', element: <Register/>},
    ]
}];

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <CookiesProvider>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </AuthProvider>
    </CookiesProvider>
);