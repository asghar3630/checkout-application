import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { Navigate } from 'react-router';
// ==============================|| MAIN ROUTING ||============================== //
const DashboardDefault = Loadable(lazy(() => import('views/checkout/StepperWrapper')));

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/*',
            element: <Navigate to={'/'} />
        }
    ]
};

export default MainRoutes;
