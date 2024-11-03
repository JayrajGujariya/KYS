import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import logo from '../../img2/logo.png';
import image1 from '../../img2/image1.png';

const Login = ({ setIsLoggedIn,setUsername }) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [name, setName] = useState("");
  const [users,setUsers]=useState([]);

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log(email,psw);
    let info = true;
    users.forEach((d)=>{
      if(d.email==email && d.password==psw){
        setIsLoggedIn(true);
        info = false;
        setUsername(d.name);
        return;
      }
    })
    if(info){
      alert("User Not Found");
      setEmail('');
      setPsw("");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(email,name,psw)
    await fetch("http://localhost:5000/register",{
      method:'POST',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify({
        email,
        name,
        password:psw
      })
    })
    alert("signUp Succesfully");
    getUserData();
    toggleMode();
    setEmail('');
    setPsw("");
  };
  const getUserData = async ()=>{
    const dt = await fetch("http://localhost:5000/userData",{
      method:'GET',
    });
    const res = await dt.json();
    // console.log(res.data);
    setUsers(res.data);
  }
  useEffect(()=>{
    getUserData()
  },[])
  return (
    <main className={isSignUpMode ? 'sign-up-mode' : ''} style={{backgroundColor: "#ff8c6b",borderRadius : 0, border :0}}>
      <div className="box" >
        <div className="inner-box">
          <div className="forms-wrap">
            <form onSubmit={handleLogin} className="sign-in-form">
              <div className="logo">
                <img src={logo} alt="easyclass" />
                <h4>KYE</h4>
              </div>

              <div className="heading">
                <h2>Welcome Back</h2>
                <h6>Not registered yet?</h6>
                <a href="#" className="toggle" onClick={toggleMode}>Sign up</a>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} name="name" minLength="4" className="input-field" autoComplete="off" required />
                  <label>Email</label>
                </div>

                <div className="input-wrap">
                  <input type="password" value={ psw} onChange={(e)=>setPsw(e.target.value)} name="password" minLength="4" className="input-field" autoComplete="off" required />
                  <label>Password</label>
                </div>

                <input type="submit" value="Sign In" className="sign-btn" />

                <p className="text">
                  Forgotten your password or your login details?
                  <a href="#">Get help</a> signing in
                </p>
              </div>
            </form>

            <form onSubmit={handleSignUp} className="sign-up-form">
              <div className="logo">
                <img src={logo} alt="easyclass" />
                <h4>KYE</h4>
              </div>

              <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account?</h6>
                <a href="#" className="toggle" onClick={toggleMode}>Sign in</a>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input type="text" name="name" value={ name} onChange={(e)=>setName(e.target.value)} minLength="4" className="input-field" autoComplete="off" required />
                  <label>Name</label>
                </div>

                <div className="input-wrap">
                  <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="input-field" autoComplete="off" required />
                  <label>Email</label>
                </div>

                <div className="input-wrap">
                  <input type="password" value={ psw} onChange={(e)=>setPsw(e.target.value)} name="password" minLength="4" className="input-field" autoComplete="off" required />
                  <label>Password</label>
                </div>

                <input type="submit" value="Sign Up" className="sign-btn" />

                <p className="text">
                  By signing up, I agree to the
                  <a href="#">Terms of Services</a> and
                  <a href="#">Privacy Policy</a>
                </p>
              </div>
            </form>
          </div>

          <div className="carousel">
            <div className="images-wrapper">
              <img src={image1} className="image img-1 show" alt="" />
            </div>

            <div className="text-group">
              <h2>Know Your Expense</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
