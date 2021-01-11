import React, { useState } from "react";
import { useSelector } from 'react-redux';
import axiosInstance from '../../api';
import { useToasts } from "react-toast-notifications";
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
// core components
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";

// utils
import AuthUtils from "../../utils/AuthUtils.js";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const { addToast } = useToasts();
    const classes = useStyles();
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

    // redux
    const { jwtToken, fullname, userId } = useSelector(state => ({
        jwtToken: state.auth.jwtToken,
        fullname: state.auth.fullname,
        userId: state.auth.userID
    }));

    // attributes
    const [isVisibilyOldPassword, setIsVisibilyOldPassword] = useState(false);
    const [isVisibilyPassword, setIsVisibilyPassword] = useState(false);
    const [isVisibilyConfirmPassword, setIsVisibilyConfirmPassword] = useState(false);

    // password
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const onNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const onConfirmNewPasswordChange =  (e) => {
        setConfirmNewPassword(e.target.value);
    };

    const handleSubmit = function (e) {
        e.preventDefault();

        if (!window.confirm('Are you sure you wish to change your password?')) {
            return;
        }

        const verifyPassword = AuthUtils.checkVerifyPassword(newPassword, confirmNewPassword);

        if(verifyPassword.code === false){
            addToast(verifyPassword.message, {
                appearance: "error",
                autoDismiss: true,
            });
            return;
        }

        axiosInstance
            .post("/auth/change-password", {
                userId: userId,
                password: password,
                newPassword: newPassword
            })
            .then(function (response) {
                if (response.status === 200) {
                    addToast("Change Password Successfully!", {
                        appearance: "success",
                        autoDismiss: true,
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            })
            .catch(function (error) {
                console.log(error);
                addToast(error.response.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                });
            });
    };

    var onVisibilityPasswordClick = function () {
        setIsVisibilyPassword(!isVisibilyPassword);
    }

    var onVisibilityConfirmPasswordClick = function () {
        setIsVisibilyConfirmPassword(!isVisibilyConfirmPassword);
    }

    var onVisibilityOldPasswordClick = function () {
        setIsVisibilyOldPassword(!isVisibilyOldPassword);
    }


    var type_old_password = isVisibilyOldPassword ? 'text' : 'password';
    var type_password = isVisibilyPassword ? 'text' : 'password';
    var type_confirm_password = isVisibilyConfirmPassword ? 'text' : 'password';
    return (
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={8} sm={8} md={8}>
                    <Card className={classes[cardAnimaton]}>
                        <form className={classes.form} method="POST" onSubmit={handleSubmit}>
                            <CardHeader color="info" className={classes.cardHeader}>
                                <h4>Change Password</h4>
                                <div className={classes.socialLine}>
                                    <Button
                                        justIcon
                                        href="#pablo"
                                        target="_blank"
                                        color="transparent"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <TwitterIcon />
                                    </Button>
                                    <Button
                                        justIcon
                                        href="#pablo"
                                        target="_blank"
                                        color="transparent"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <FacebookIcon />
                                    </Button>
                                    <Button
                                        justIcon
                                        href="#pablo"
                                        target="_blank"
                                        color="transparent"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <InstagramIcon />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <CustomInput
                                    onChange={onPasswordChange}
                                    labelText="Your Password"
                                    alt="Your Password"
                                    id="password"
                                    name="password"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: type_old_password,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {isVisibilyOldPassword ?
                                                    <VisibilityIcon onClick={onVisibilityOldPasswordClick} />
                                                    :
                                                    <VisibilityOffIcon onClick={onVisibilityOldPasswordClick} />}
                                            </InputAdornment>
                                        ),
                                        autoComplete: "off"
                                    }}
                                />

                                <CustomInput
                                    onChange={onNewPasswordChange}
                                    labelText="New Password"
                                    alt="New Password"
                                    id="newPassword"
                                    name="newPassword"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: type_password,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {isVisibilyPassword ?
                                                    <VisibilityIcon onClick={onVisibilityPasswordClick} />
                                                    :
                                                    <VisibilityOffIcon onClick={onVisibilityPasswordClick} />}
                                            </InputAdornment>
                                        ),
                                        autoComplete: "off"
                                    }}
                                />

                                <CustomInput
                                    onChange={onConfirmNewPasswordChange}
                                    labelText="Confirm New Password"
                                    alt="Confirm New Password"
                                    id="confirm_new_pass"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: type_confirm_password,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {isVisibilyConfirmPassword ?
                                                    <VisibilityIcon onClick={onVisibilityConfirmPasswordClick} />
                                                    :
                                                    <VisibilityOffIcon onClick={onVisibilityConfirmPasswordClick} />}
                                            </InputAdornment>
                                        ),
                                        autoComplete: "off"
                                    }}
                                />
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                                <Button simple color="info" size="lg" type='submit'>
                                    Get Changed
                                  </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>

    );
}
