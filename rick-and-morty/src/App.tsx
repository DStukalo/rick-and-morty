import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	MainPage, mainLoader, mainLoaderWithPagination, mainLoaderWithSearch,
} from './pages/MainPage/MainPage';
import { DetailsPage, detailsLoader } from './pages/DetailsPage/DetailsPage';
import { NotFoundPage } from './pages/404/NotFoundPage';
import { Layout } from './components/Layout/Layout';
import { AuthorizationPage } from './pages/AuthorizationPage/AuthorizationPage';
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration';

const routesConfig = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <MainPage />, loader: mainLoader },
			{ path: '/:page', element: <MainPage />, loader: mainLoaderWithPagination },
			{ path: '/:page/:search', element: <MainPage />, loader: mainLoaderWithSearch },
			{ path: 'details/:id', element: <DetailsPage />, loader: detailsLoader },
			{
				path: '/authorization',
				element: <AuthorizationPage />,
				children: [
					{ path: 'login', element: <Login /> },
					{ path: 'registration',	element: <Registration /> },
				],
			},
			{ path: '*', element: <NotFoundPage /> },
		],
	},
];

const router = createBrowserRouter(routesConfig);

function App() {
	return (
		<RouterProvider router={router} />
	);
}

export default App;
