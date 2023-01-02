import svg from "../Assets/shelves.svg";
const Shelves = () => {
	return (
		<div style={{display:"grid",placeItems:'center'}}>
			<img src={svg} alt="no book in shelves image" width="450" />
			<h3>Your Shelve is empty</h3>
			<h4>Add books to see items in your shelve</h4>
		</div>
	);
};

export default Shelves;
