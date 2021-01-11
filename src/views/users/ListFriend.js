import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// @material-ui/icons
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import UnFriendIcon from '@material-ui/icons/BackspaceOutlined';
import axiosInstance from '../../api';


// core components
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import profile from "../../assets/img/avt-theanh.jpg";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";

const APIURL = process.env.REACT_APP_ENV === "dev" ? process.env.REACT_APP_APIURL : process.env.REACT_APP_API_DEPLOY_URL;

const useStyles = makeStyles(styles);

const ListItem = withStyles({
    root: {
        "&$selected": {
            backgroundColor: "#5bc0de",
            color: "white"
        },
        "&$selected:hover": {
            backgroundColor: "#5bc0de",
            color: "white"
        },
        "&:hover": {
            backgroundColor: "#5bc0de",
            color: "white"
        }
    }
})(MuiListItem);

const UnFriend = withStyles({
    root: {
        "&$selected": {
            backgroundColor: "white",
            color: "red"
        },
        "&$selected:hover": {
            backgroundColor: "red",
            color: "red"
        },
        "&:hover": {
            backgroundColor: "white",
            color: "red"
        }
    }
})(UnFriendIcon);

export default function ProfilePage(props) {
    const { addToast } = useToasts();
    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    //use History để điều hướng URL
    const history = useHistory();
    const dispatch = useDispatch();


    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [listFriend, setListFriend] = useState([]);

    const { userID, jwtToken } = useSelector(state => ({
        userID: state.auth.userID,
        jwtToken: state.auth.jwtToken
    }));


    // get friend's list with GET method
    useEffect(() => {
        (async () => {
            if (userID !== "0") {
                try {
                    const response = await axiosInstance.get(`/user/list-friend`, {
                        params: {
                            userId: userID
                        }
                    });
                    if (response.status === 200) {
                        setListFriend(response.data);
                    }

                } catch (error) {
                    console.log(error);
                    if (error.response.status === 401)
                    {
                        history.push("/auth/signin");
                    }
                    addToast(error.response.data.message, {
                        appearance: "error",
                        autoDismiss: true,
                    });
                }
            }

        })();
    }, [addToast, dispatch, history, jwtToken, userID]);

    const onListFriendClick = function (e, index) {
        e.preventDefault();

        if (!window.confirm('Are you sure to unfriend this user?')) {
            return;
        }

        axiosInstance
            .post("/user/unfriend", {
                userId: userID,
                playerId: listFriend[index]._id
            })
            .then(function (response) {
                if (response.status === 200) {
                    addToast("Unfriend successfully !", {
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

    const list_friend = listFriend.map((item, index) => (
        <ListItem key={item._id} style={{ border: "1px solid black", marginTop: '1px' }}>
            <ListItemAvatar>
                <Avatar>
                    <div>
                        <img src={profile} alt="..." className={imageClasses} />
                    </div>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.fullname} secondary={'Elo: ' + item.elo} />
            <ListItemSecondaryAction>
                <UnFriend fontSize='default' onClick={(e) => onListFriendClick(e, index)} />
            </ListItemSecondaryAction>
        </ListItem>
    ));

    return (
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={8} sm={8} md={8}>
                    <Card className={classes[cardAnimaton]}>
                        <form className={classes.form} method="POST" action={APIURL + '/auth/edit-info'}>
                            <CardHeader color="info" className={classes.cardHeader}>
                                <h4>List Friend</h4>
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
                                <List className={classes.root} style={{ maxHeight: '383px', overflow: 'auto' }}>
                                    {list_friend}
                                </List>
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>

                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>

    );
}
