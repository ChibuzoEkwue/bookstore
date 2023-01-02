import { useReducer, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const INTIAL_VALUE = {
	currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

const authReducer = (state, action) => {
	if (action.type === "login") {
		const userInfo = localStorage.setItem(
			"user",
			JSON.stringify(action.payload)
		);
		return {
			currentUser: userInfo,
		};
	}

	if (action.type === "logout") {
		localStorage.removeItem("user");
		return {
			currentUser: null,
		};
	}
	return INTIAL_VALUE;
};

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, INTIAL_VALUE);

	useEffect(() => {
		state.currentUser = JSON.parse(localStorage.getItem("user")) || null;
	}, []);
	return (
		<AuthContext.Provider
			value={{
				currentUser: state.currentUser,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
