import { Link, useNavigate } from "react-router-dom";
import styles from "./forms.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef("");
	const [error, setError] = useState(null);
	const {dispatch} = useContext(AuthContext);
	const navigate = useNavigate();
	const submitHandler = (e) => {
		e.preventDefault();

		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		console.log(email, password);

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user.providerData[0]);
				dispatch({ type: "LOGIN", payload: user.providerData[0] });
				navigate("/");
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
				<h2>Login</h2>
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
					<Link to="/signup">Create your account?</Link>
					<button type="submit">LOGIN</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
