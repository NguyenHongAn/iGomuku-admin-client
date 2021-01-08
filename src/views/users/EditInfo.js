import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from "react-toast-notifications";
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import axiosInstance from '../../api';
// @material-ui/icons
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
// core components
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import ReduxAction from '../../store/actions';

const APIURL = process.env.REACT_APP_ENV === "dev" ? process.env.REACT_APP_APIURL : process.env.REACT_APP_DEPLOY_APIURL;

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const {userInfo} = props;
    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const classes = useStyles();
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

    const { userId, jwtToken, fullname, autoMatch } = useSelector(state => ({
        jwtToken: state.auth.jwtToken,
        fullname: state.auth.fullname,
        userId: state.auth.userID,
        autoMatch:  state.auth.autoMatch,
      }));

    // element
    const [disabledField, setDisabledField] = useState(false);
    const [newFullname, setNewFullname] = useState('');
    const [currFullname, setCurrFullname] = useState(fullname);

    var onSetDisabledField = function () {
        setDisabledField(!disabledField);
    }

    const onNewFullnameChange = (e) => {
        setNewFullname(e.target.value);
    };

    const handleSubmit = function (e) {
        e.preventDefault();

        if (!window.confirm('Are you sure you wish to change your information?')) {
            return;
        }
  
        axiosInstance
            .post("/auth/edit-profile", {
                userId: userId,
                fullname: newFullname
            })
            .then(function (response) {
                if (response.status === 200) {
                    addToast("Edit Your Profile Successfully!", {
                        appearance: "success",
                        autoDismiss: true,
                    });

                    const authData = {
                        jwtToken:  jwtToken,
                        fullname:  newFullname,
                        userID:  userId,
                        autoMatch: autoMatch
                    };
                    dispatch(ReduxAction.auth.editInfo(authData));
                    setCurrFullname(newFullname);

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

    var isDisabled = disabledField ? true : false;
    return (
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={8} sm={8} md={8}>
                    <Card className={classes[cardAnimaton]}>
                        <form className={classes.form} method="POST" onSubmit={handleSubmit}>
                            <CardHeader color="info" className={classes.cardHeader}>
                                <h4>Edit Information</h4>
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
                                    labelText="Fullname"
                                    id="fullname"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={onNewFullnameChange}
                                    disabled={isDisabled}
                                    defaultValue={currFullname}
                                    inputProps={{
                                        type: 'text',
                                        endAdornment: (<div></div>),
                                        autoComplete: "off"
                                    }}
                                />
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                                <Button simple color="info" size="lg" type="submit">
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
