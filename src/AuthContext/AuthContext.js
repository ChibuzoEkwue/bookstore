import { createContext } from "react";

export const AuthContext = createContext({
	currentUser: JSON.parse(localStorage.getItem("user")) || null ,
	dispatch:()=>{},
});
