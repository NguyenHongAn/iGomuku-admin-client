import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare, faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from 'react-google-login';

const APIURL = process.env.REACT_APP_ENV === "dev" ? process.env.REACT_APP_APIURL : process.env.REACT_APP_API_DEPLOY_URL;;
const APPID_FB = process.env.REACT_APP_APPID_FB;
const APPID_GG = process.env.REACT_APP_APPID_GG;

export default function LoginPage() {
  const { addToast } = useToasts();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  //use History để điều hướng URL
  const history = useHistory();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    console.log(APIURL);
    axios
      .post(APIURL + "/auth/signin", {
        username: username,
        password: password,
        permission: 1,  // normal user (0-admin, 1-user)
      })
      .then(function (response) {
        setLoading(false);
        if (response.status === 200) {
          addToast("Login successfully!", {
            appearance: "success",
            autoDismiss: true,
          });
          localStorage.setItem("jwtToken", response.data.token);
          localStorage.setItem("fullname", response.data.account.fullname);
          localStorage.setItem("userID", response.data.account._id);
          history.push("/igomoku");
        }
      })
      .catch(function (error) {
        setLoading(false);//
        console.log(error);
        addToast(error.response.data.message, {//
          appearance: "error",
          autoDismiss: true,
        });
      });
  }

  const responseFacebook = (response) => {
    setLoading(true);
    const username = response.id; // lấy id của fb làm username
    const fullname = response.name;
    const email = response.email;
    axios
      .post(APIURL + "/auth/signinFacebook", {
        username: username,
        fullname: fullname,
        email: email,
        permission: 1,
      })
      .then(function (response) {
        setLoading(false);
        if (response.status === 200) {
          addToast("Login successfully!", {
            appearance: "success",
            autoDismiss: true,
          });
          localStorage.setItem("jwtToken", response.data.token);
          localStorage.setItem("fullname", response.data.account.fullname);
          localStorage.setItem("userID", response.data.account._id);
         history.push("/igomoku");
        }
      })
      .catch(function (error) {
        setLoading(false);//
        console.log(error);
        addToast(error.response.data.message, {//
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const responseGoogle = (response) => {
    setLoading(true);
    const username = response.profileObj.googleId; // lấy id của gg làm username
    const fullname = response.profileObj.name;
    const email = response.profileObj.email;
    axios
      .post(APIURL + "/auth/signinGoogle", {
        username: username,
        fullname: fullname,
        email: email,
        permission: 1,
      })
      .then(function (response) {
        setLoading(false);
        if (response.status === 200) {
          addToast("Login successfully!", {
            appearance: "success",
            autoDismiss: true,
          });
          localStorage.setItem("jwtToken", response.data.token);
          localStorage.setItem("fullname", response.data.account.fullname);
          localStorage.setItem("userID", response.data.account._id);
          history.push("/igomoku");
        }
      })
      .catch(function (error) {
        setLoading(false);//
        console.log(error);
        addToast(error.response.data.message, {//
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal text-center">
          Login to <span className="brand-red">i</span>
          <span className="brand-red">Go</span>
          <span className="brand-red">moku</span>
        </h1>
        <div className="social-login">
          <FacebookLogin
            appId={APPID_FB}
            fields="id,name,email"
            callback={responseFacebook}
            icon={<FontAwesomeIcon className="icon" icon={faFacebookSquare} />}
            cssClass="btnFacebook"
            textButton = "with Facebook"
          />
          <GoogleLogin
            clientId={APPID_GG}
            buttonText="with Google"
            onSuccess={responseGoogle}
            cookiePolicy={'single_host_origin'}
            icon={<FontAwesomeIcon className="icon" icon={faGoogle} />}
            className="btnGoogle"
            textButton = "with Google"
          />
        </div>
        <p className="text-center" style={{ marginTop: "1rem" }}>
          OR
        </p>
        <FormGroup controlId="username" bsSize="large">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <div className="btn-container">
          <Button
            className="btn btn-success btn-block btn-login"
            disabled={isLoading || !validateForm()}
            type="submit"
          >
            <FontAwesomeIcon className="icon" icon={faSignInAlt} />
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </div>
        <hr></hr>
        <div className="btn-container">
          <Link to="/auth/signup">
            <Button className="btn btn-primary btn-block btn-signup">
              <FontAwesomeIcon className="icon" icon={faUserPlus} /> Sign up New
              Account
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
