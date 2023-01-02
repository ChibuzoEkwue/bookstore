import "./App.css";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Shelves from "./Pages/Shelves";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import BookDetails from "./Pages/BookDetails";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AuthProvider from "./AuthContext/AuthProvider";
import { useContext } from "react";
import { AuthContext } from "./AuthContext/AuthContext";
function App() {
	const { currentUser } = useContext(AuthContext);

	console.log(currentUser);
	const RequireAuth = ({ children }) => {
		return currentUser.email ? children : <Navigate to="/login" />;
	};

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{ path: "/", element: <Home /> },
				{ path: "shelves", element: <Shelves /> },
				{
					path: "bookDetails/:id",
					element: <BookDetails />,
				},
			],
		},

		{ path: "/login", element: <Login /> },
		{ path: "/signup", element: <Signup /> },
	]);
	return (
		<>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</>
	);
}

export default App;
