
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './routes/root';
import { Bratia } from './routes/bratia';

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

function App() {
	return (
		<>
		  <RouterProvider router={router}/>
		</>
	  );
}

export default App
