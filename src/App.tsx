
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import My from './My';
import Bratia from './Bratia';

const router = createBrowserRouter([
	{
		path: "/",
		element: <My />,
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
