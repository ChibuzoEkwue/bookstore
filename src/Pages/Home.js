import { useEffect, useState } from "react";
import BookCard from "../Components/BookCard";
import { collection, getDocs } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { db } from "../firebase.js";
const Home = () => {
	// const books = [
	// 	{
	// 		book_id: 58341222,
	// 		cover:
	// 			"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1627673942l/58341222._SY475_.jpg",
	// 		name: "Reminders of Him",
	// 	},
	// 	{
	// 		book_id: 63077284,
	// 		cover:
	// 			"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1666594991l/63077284._SY475_.jpg",
	// 		name: "Resting Scrooge Face",
	// 	},
	// 	{
	// 		book_id: 36809135,
	// 		cover:
	// 			"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1582135294l/36809135._SY475_.jpg",
	// 		name: "Where the Crawdads Sing",
	// 	},
	// 	{
	// 		book_id: 55196813,
	// 		cover:
	// 			"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1643228739l/55196813.jpg",
	// 		name: "The Maid",
	// 	},
	// 	{
	// 		book_id: 60899502,
	// 		cover:
	// 			"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1660936424l/60899502.jpg",
	// 		name: "A World of Curiosities",
	// 	},
	// ];

	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	
	console.log(books)
	useEffect(() => {
		const getData = async () => {
			let dataArray = [];
			const querySnapshot = await getDocs(collection(db, "books"));
			querySnapshot.forEach((doc) => {
				dataArray.push({ id: doc.id, ...doc.data() });
			});
			setBooks(dataArray);
			setLoading(false);
		};
		getData();
	}, []);

	return (
		<>
			{loading && (
				<Box sx={{ display: "flex", justifyContent: "center" ,alignItems:'center'}}>
					<CircularProgress />
				</Box>
			)}
			<div className="cardLayout">
				{books.map((book) => (
					<BookCard
						image={book.cover}
						name={book.name}
						id={book.id}
						key={book.book_id}
					/>
				))}
			</div>
		</>
	);
};

export default Home;
