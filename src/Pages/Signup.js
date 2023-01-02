import { Link, useNavigate } from "react-router-dom";
import styles from "./forms.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useRef, useState, useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

const Signup = () => {
	const emailRef = useRef("");
	const passwordRef = useRef("");
	const [error, setError] = useState(null);
    const navigate = useNavigate()
	const {dispatch} = useContext(AuthContext);

	const submitHandler = (e) => {
		e.preventDefault();

		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		console.log(email, password);

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				dispatch({ type: "login", payload: user.providerData[0] });
				navigate('/')
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				setError({ errorCode, errorMessage });
			});
	};

	return (
		<div className={styles.box}>
			<div className={styles.card}>
				<h2>Create Account</h2>
				<form className={styles.form} onSubmit={submitHandler}>
					<input
						type="text"
						id="text"
						name="username"
						placeholder="Username"
						required
						ref={emailRef}
					/>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Password"
						required
						ref={passwordRef}
					/>
					{error && <p>{error.message}</p>}

					<Link to="/login">Have an account, Login</Link>
					<button type="submit">Sign up</button>
				</form>
			</div>
		</div>
	);
};

export default Signup;
