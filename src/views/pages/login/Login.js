import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../store/actions/authActions";
import axios from "axios";

const USERURL =
  process.env.REACT_APP_ENV === "dev"
    ? process.env.REACT_APP_USERURL
    : process.env.REACT_APP_DEPLOY_USERURL;

const APIURL =
  process.env.REACT_APP_ENV === "dev"
    ? process.env.REACT_APP_APIURL
    : process.env.REACT_APP_DEPLOY_APIURL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  //redux
  //const socket = useSelector((state) => state.socket.socket);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    axios
      .post(APIURL + "/auth/signin", {
        username: username,
        password: password,
        permission: 0, // admin (0-admin, 1-user)
        //socketID: socket.id,
      })
      .then(function (response) {
        setLoading(false);
        if (response.status === 200) {
          const authData = {
            jwtToken: response.data.token,
            fullname: response.data.account.fullname,
            userID: response.data.account._id,
            autoMatch: response.data.account.autoMatch,
          };
          
          dispatch(authActions.signIn(authData));
          history.push("/dashboard");
        }
      })
      .catch(function (error) {
        setLoading(false); //
        console.log(error);
        // addToast(error.response.data.message, {
        //   appearance: "error",
        //   autoDismiss: true,
        // });
      });
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">
                      Sign In to your iGomoku <b>Admin</b> account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          disabled={isLoading}
                          type="submit"
                        >
                          {isLoading ? "Logging in..." : "Login"}
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>iGomoku for Admin</h2>
                    <p>
                      This is iGomoku <b>Admin</b> page. If you are normal user,
                      please go back to the iGomoku homepage and enjoy the game.
                    </p>
                    <a href={USERURL}>
                      <CButton color="primary" className="mt-3">
                        iGomoku homepage
                      </CButton>
                    </a>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
