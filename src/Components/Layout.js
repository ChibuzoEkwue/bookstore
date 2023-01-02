import Navbar from "./Navbar.js";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
const Layout = () => {
	return (
		<>
			<Navbar />
			<Container style={{ marginTop:"5rem" }}>
				<Outlet />
			</Container>
		</>
	);
};

export default Layout;
