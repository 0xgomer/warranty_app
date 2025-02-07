import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import RootPage from "../pages/root-page/RootPage";
import ProfilePage from "../pages/profile-page/ProfilePage";
import AdminPage from "../pages/admin-page/AdminPage";
import InfoPage from "../pages/info-page/InfoPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                element: <RootPage/>,
                index: true
            },
            {
                path: '/warranty',
                element: <InfoPage/>
            },
            {
                path: '/about',
                element: <InfoPage/>
            },
            {
                path: '/profile',
                element: <ProfilePage/>
            },
            {
                path: '/admin',
                element: <AdminPage/>
            },
            {
                path: '/privacy',
                element: <InfoPage/>
            },
            {
                path: '/terms',
                element: <InfoPage/>
            },
        ]
    },
])

export default router