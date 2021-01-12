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
import VisibilityIcon from '@material-ui/icons/Visibility';

import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
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
import { Typography } from '@material-ui/core';

import profile from "../../assets/img/avt-theanh.jpg";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";


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

const DetailIcon = withStyles({
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
})(VisibilityIcon);

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
    const [listHistory, setListHistory] = useState([]);

    const { adminId, viewingUserID } = useSelector(state => ({
        adminId: state.auth.userID,
        viewingUserID: state.admin.viewingUserID
    }));


    // get history list with GET method
    useEffect(() => {
        (async () => {
            if (viewingUserID !== "0") {
                try {
                    const response = await axiosInstance.get(`/admin/list-history`, {
                        params: {
                            userId: viewingUserID
                        }
                    });
                    if (response.status === 200) {
                        setListHistory(response.data);
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
    }, [addToast, dispatch, history, viewingUserID]);

    const onDetailHistoryGame = function (e, index) {
        history.push({
            pathname: `/detail-game/${listHistory[index]['_id']}`
        });
    };


    const histories = listHistory.map((item, index) => (
        <ListItem key={item._id}>
            <ListItemAvatar>
                <Avatar>
                    <div>
                        <img src={profile} alt="..." className={imageClasses} />
                    </div>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                disableTypography
                primary={<Typography type="body2" style={{ color: item.result === 1 ? 'blue' : 'red', fontWeight: 'bold' }}>{item.result === 1 ? "Victory" : "Lose"}</Typography>}
                secondary={
                    <React.Fragment>
                        <Typography type="body2" style={{ color: 'black' }}>{"Enemy: " + item.enemy_fullname} </Typography>
                        Time: {item.time}
                    </React.Fragment>
                }
            />
            <ListItemSecondaryAction>
                <DetailIcon fontSize='default' onClick={(e) => onDetailHistoryGame(e, index)} />
            </ListItemSecondaryAction>
        </ListItem>
    ));

    return (
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={8} sm={8} md={8}>
                    <Card className={classes[cardAnimaton]}>
                        <form className={classes.form}>
                            <CardHeader color="info" className={classes.cardHeader}>
                                <h4>History Match</h4>
                                {/* <div className={classes.socialLine}>
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
                                </div> */}
                            </CardHeader>
                            <CardBody>
                                <List className={classes.root} style={{ maxHeight: '383px', overflow: 'auto' }}>
                                    {histories}
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
