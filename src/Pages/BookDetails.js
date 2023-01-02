import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useParams } from "react-router-dom";

const BookDetails = () => {
	const [book, setBooks] = useState({});

	const { id } = useParams();
	useEffect(() => {
		const getData = async () => {
			const docRef = doc(db, "books", id);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setBooks(docSnap.data());
			} else {
				return <p>No such document!</p>;
			}
		};
		getData();
	}, []);

	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<img src={book.cover} alt={book.name} />
				<h2
					style={{
						textAlign: "center",
					}}
				>
					{book.name}
				</h2>
			</div>
		</>
	);
};

export default BookDetails;
