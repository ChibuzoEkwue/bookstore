import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom"
 const BookCard = ({image,name,id}) =>{
	return (
		<Link to={"/bookDetails/" + id} style={{ textDecoration: "none" }}>
			<Card sx={{ maxWidth: 250 }}>
				<CardMedia sx={{ height: 355 }} image={image} title={name} />
				<CardContent>
					<Typography
						gutterBottom
						variant="h5"
						component="div"
						style={{ color: "#3C6255", textAlign: "center" }}
					>
						{name}
					</Typography>
				</CardContent>
			</Card>
		</Link>
	);
}

export default BookCard;