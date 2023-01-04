import { useReducer, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const INTIAL_VALUE = {
	currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

const authReducer = (state, action) => {
	if (action.type === "LOGIN") {
		return {
			currentUser: action.payload,
		};
	}

	if (action.type === "LOGOUT") {
		return {
			currentUser: null,
		};
	}
	return INTIAL_VALUE;
};

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, INTIAL_VALUE);

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(state.currentUser));
	}, [state.currentUser]);
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
