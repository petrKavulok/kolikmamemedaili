
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Medaile from './Medaile';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Medaile countryCode='CZE'/>,
	},
	{
		path: "/bratia",
		element: <Medaile countryCode='SVK' />,
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
