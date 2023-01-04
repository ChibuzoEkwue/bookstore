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
	const navigate = useNavigate();
	const { dispatch } = useContext(AuthContext);

	const submitHandler = async (e) => {
		e.preventDefault();

		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		try {
			const request = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const userCredential = await request;
			if (userCredential) {
				const user = userCredential.user;
				console.log(user)
				dispatch({ type: "LOGIN", payload: user.providerData[0] });
				navigate("/");
			}
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			setError({ errorCode, errorMessage });
		}
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
