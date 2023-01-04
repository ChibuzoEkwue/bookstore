import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import BackpackIcon from "@mui/icons-material/Backpack";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";


const pagesAuth = [{ name: "Shelve", path: "/shelves" }];
const pages = [{ name: "Login", path: "/login" },{name:'Create an account', path:"/signup"}];
function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const {currentUser, dispatch} = useContext(AuthContext);
	

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const logOut =()=>{
		dispatch({type:'LOGOUT'})
	}

	return (
		<AppBar position="fixed" style={{ backgroundColor: "#3C6255" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<BackpackIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Book Store
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{currentUser &&
								pagesAuth.map((page) => (
									<MenuItem key={page.name} onClick={handleCloseNavMenu}>
										<Link to={page.path} style={{ textDecoration: "none" }}>
											<Typography textAlign="center">{page.name}</Typography>
										</Link>
									</MenuItem>
								))}

							{!currentUser &&
								pages.map((page) => (
									<MenuItem key={page.name} onClick={handleCloseNavMenu}>
										<Link to={page.path} style={{ textDecoration: "none" }}>
											<Typography textAlign="center">{page.name}</Typography>
										</Link>
									</MenuItem>
								))}
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Book store
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{currentUser &&
							pagesAuth.map((page) => (
								<Link to={page.path} key={page.name}>
									<Button
										onClick={handleCloseNavMenu}
										sx={{ my: 2, color: "white", display: "block" }}
									>
										{page.name}
									</Button>
								</Link>
							))}

						{currentUser && (
							<Button onClick={logOut}
								// onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								Logout
							</Button>
						)}

						{!currentUser &&
							pages.map((page) => (
								<Link to={page.path} key={page.name}>
									<Button
										onClick={handleCloseNavMenu}
										sx={{ my: 2, color: "white", display: "block" }}
									>
										{page.name}
									</Button>
								</Link>
							))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
