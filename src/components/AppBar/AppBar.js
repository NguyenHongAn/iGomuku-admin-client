import React, {useState, useEffect} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import './AppBar.css';  
import {Link, useLocation} from 'react-router-dom';

function AppBar() {

    const [isLogin, setIsLogin] = useState(false);
   
    let fullname = localStorage.getItem("fullname");

    const location = useLocation();

    useEffect(() =>{
      
    });


    function logout(){
      setIsLogin(false);
      localStorage.setItem("jwtToken", "invalid token :))");
      localStorage.setItem("fullname", "unknown :))");
      localStorage.setItem("userID", 0);
    }

  
  
    return (
        <div className="AppBar" >
        <Navbar className="bar-bg" expand="md">
          <Link className="navbar-brand " to="/">iGomoku</Link>
          {localStorage.getItem('jwtToken') !== "invalid token :))"? (<Link className="text-light nav-link welcome" to="/profile"> Welcome, {fullname}</Link>) : null}
          <Navbar.Toggle  aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto" navbar>
              {localStorage.getItem('jwtToken') !== "invalid token :))"? (
                <React.Fragment>
                  <Nav.Item>
                    <Link className="text-light nav-link" to="/igomoku">Dashboard</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link className="text-light nav-link" to="/auth/signin" onClick={logout}>Sign Out</Link>
                  </Nav.Item>
                </React.Fragment>
              ) : 
              (
                <React.Fragment>
                  <Nav.Item>
                    <Link className="text-light nav-link" to="/auth/signin">Sign In</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link className="text-light nav-link" to="/auth/signup">Sign Up</Link>
                  </Nav.Item>
                </React.Fragment>
              )
              }
              <Nav.Item>
                <Link className="text-light nav-link" to="/faq">FAQ</Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
}

export default AppBar;
