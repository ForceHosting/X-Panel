import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';


// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'new-password', element: <NewPassword /> },
        { path: 'verify', element: <VerifyCode /> },
        { path: 'authorizing', element: <DiscordAuth/>},
      ],
    },

    // Dashboard Routes
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: '/app', element: <GeneralApp /> },
        { path: '/coins/earn', element: <EarnPage />},
        { path: '/coins/store', element: <StorePage />},
        { path: '/servers/global', element: <GlobalServers />},
        { path: '/join-for-resources', element: <JFR />},
        {
          path: '/staff',
          children: [
            { element: <GeneralStaff />, index: true},
            { element: <UserList />, path: '/staff/users' },
            { element: <ViewUser />, path: '/staff/user/:id' },
            { element: <ServerList />, path: '/staff/servers' },
            { element: <ViewServer />, path: '/staff/server/:id' },

          ],
        },
        { 
          path: '/xpanel',
          children: [
            { element: <DeployPanel />, index: true }
          ]
        },
        {
          path: 'web',
          children: [ 
            { element: <CreateWeb />, path: 'create' },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/user/account" replace />, index: true },
            { path: 'account', element: <UserAccount /> },
            { path: ':id', element: <UserProfile /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <InvoiceList />, index: true },
            { element: <InvoiceDetails />, path: ':id' }
          ],
        },
        {
          path: 'support',
          children: [
            { element: <Chat/>, index: true },
          ],
        },
        {
          path: 'server',
          children: [
            { path: 'create', element: <CreateServer /> },
          ],
        },
        { path: 'permission-denied', element: <PermissionDenied /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: 'banned', element: <PageBanned /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}


// SAAS
const DeployPanel = Loadable(lazy(() => import('../pages/dashboard/DeployPanel')));



const GeneralStaff = Loadable(lazy(() => import('../pages/staff/General')));
const UserList = Loadable(lazy(() => import('../pages/staff/UserList')));
const ViewUser = Loadable(lazy(() => import('../pages/staff/ViewUser')));
const ServerList = Loadable(lazy(() => import('../pages/staff/ServerList')))
const ViewServer = Loadable(lazy(() => import('../pages/staff/ViewServer')));
// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// DASHBOARD
const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));
const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
// GENERAL
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const CreateServer = Loadable(lazy(() => import('../pages/dashboard/CreateServer')));
const CreateWeb = Loadable(lazy(() => import('../pages/dashboard/CreateWeb')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const EarnPage = Loadable(lazy(() => import('../pages/dashboard/EarnPage')));
const StorePage = Loadable(lazy(() => import('../pages/dashboard/StorePage')));
const GlobalServers = Loadable(lazy(() => import('../pages/dashboard/GlobalServers')));
const JFR = Loadable(lazy(() => import('../pages/dashboard/JFR')));
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
// BLOG
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));


// TEST RENDER PAGE BY ROLE
const PermissionDenied = Loadable(lazy(() => import('../pages/dashboard/PermissionDenied')));

// MAIN
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
const PageBanned = Loadable(lazy(() => import('../pages/PageBanned')));
const DiscordAuth = Loadable(lazy(() => import('../pages/auth/DiscordAuth')));