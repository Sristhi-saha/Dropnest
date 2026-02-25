import react, { useContext, useState } from 'react'
import Navbar from '../components/navbar';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { Appcontent } from '../context/appContent';

const SignUp = () => {
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    console.log(backend_url)
    const { backenUrl,isLoggedin,setIsLoggedin,userData, setUserData } = useContext(Appcontent);

    console.log(isLoggedin,backenUrl)

    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading,setLoading] = useState("");
    const [password, setPassword] = useState("");
    console.log(email,password)

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;

        try {

            if (password !== confirmPassword) {
                alert('please check password!!')
                return
            }
            const { data } = await axios.post('https://dropnestwebapp.onrender.com/api/auth/register', { email, password })


            console.log(data);

            if (data.success) {
                localStorage.setItem('token',data.token);
                setUserData(true)
                setIsLoggedin(true)
                toast.success('login successfully')
                navigate('/');
            } else {
                toast.error(e.response?.data?.message || e.message);
            }

        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <>
            <Navbar />
            <div className="login-root">
  <div className="login-container">
    <div className="login-card">
      <h2 className="login-title">
        Create <span>Account</span>
      </h2>
      <p className="login-subtitle">Join us and store your files securely</p>

      <form onSubmit={onSubmitHandler}>
        <div className="login-field">
          <label className="login-label" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="login-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-field">
          <label className="login-label" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="login-field">
          <label className="login-label" htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="login-input"
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? (
            <><div className="login-spinner" /> Creating account...</>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="login-divider">
        <div className="login-divider-line" />
        <span>or</span>
        <div className="login-divider-line" />
      </div>

      <p className="login-signup">
        Already have an account?{" "}
        <Link to="/login">Sign in</Link>
      </p>
    </div>
  </div>
</div>
        </>
    )
}


export default SignUp;