import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import "./register.css"

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory()

    const handleClick = async (e) => {
        e.preventDefault()
        if (passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("Password don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post("/auth/register", user)
                history.push("/login")
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Fakebook</h3>
                    <span className="loginDesc1">
                        Connect with friends and the world around you on Lamasocial.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input 
                            placeholder="Username" 
                            type="username"
                            required 
                            ref={username} 
                            className="loginInput" 
                        />
                        <input 
                            placeholder="Email" 
                            type="email"
                            required 
                            ref={email} 
                            className="loginInput" 
                        />
                        <input 
                            placeholder="Password" 
                            type="password"
                            required 
                            ref={password} 
                            minLength="6"
                            className="loginInput" 
                        />
                        <input 
                            placeholder="Password Again" 
                            type="password"
                            required 
                            ref={passwordAgain} 
                            className="loginInput" 
                        />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <Link to="/login">
                            <button className="loginRegisterButton">
                                Log into your account
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
