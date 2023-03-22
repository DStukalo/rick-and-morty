import {
	Route, createBrowserRouter, createRoutesFromElements, RouterProvider,
} from 'react-router-dom';
// import { MainPage, mainLoader } from './pages/MainPage/MainPage';
import { MainPage } from './pages/MainPage/MainPage';
import { DetailsPage, detailsLoader } from './pages/DetailsPage/DetailsPage';
import { NotFoundPage } from './pages/404/NotFoundPage';
import { Layout } from './components/Layout/Layout';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<MainPage />} />
			<Route path="/details/:id" element={<DetailsPage />} loader={detailsLoader} />
			<Route path="*" element={<NotFoundPage />} />
		</Route>,
	),
);

function App() {
	return (
		<RouterProvider router={router} />
	);
}

export default App;
