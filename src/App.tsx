import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './routes/root';
import { Bratia } from './routes/bratia';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root/>,
	},
	{
		path: "/bratia",
		element: <Bratia />,
	},
  ]);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // default true
			retry: 1,
		},
	},
})

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}/>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App
