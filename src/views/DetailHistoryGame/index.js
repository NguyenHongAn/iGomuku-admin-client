import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
// @material-ui/icons
import {
    Grade,
    AssignmentInd,
    AccountBox,
    Email,
    Today,
    Subscriptions,
    StarHalf,
    VerifiedUser,
    Warning,
  } from "@material-ui/icons";
import {
    faTrophy,
    faTimes,
    faCoins,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

// core components
import Footer from "../../components/Footer/Footer.js";
import {Button} from 'react-bootstrap';
// import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Parallax from "../../components/Parallax/Parallax.js";
import logoIGomoku from "../../assets/img/logo-igomoku.png";
import axiosInstance from '../../api';
import BoardShow from './BoardShow';


// core components
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from "@material-ui/core/Tooltip";



import styles from "../../assets/jss/material-kit-react/views/profilePage.js";

const CustomListItem = withStyles({
    root: {
        "&$selected": {
            backgroundColor: "#5bc0de",
            color: "white"
        },
        "&$selected:hover": {
            backgroundColor: "#5bc0de",
            color: "white"
        },
        "&$selected:selected": {
            backgroundColor: "#5bc0de",
            color: "white"
        },
        "&:hover": {
            backgroundColor: "#5bc0de",
            color: "white"
        },
        "&:active": {
            backgroundColor: "#5bc0de",
            color: "white"
        },
        '&$focusVisible': {
            backgroundColor: "#5bc0de",
            color: "white"
        },
    
    }
})(ListItem);

const useStyles = makeStyles(styles);

export default function DetailHistoryGame({match}) {
    const curGameId = match.params.id;
    const params = useParams();
    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    const history = useHistory();

    // redux
    const { adminId, viewingAccountStatus, viewingUserID } = useSelector(state => ({
        adminId: state.auth.userID,
        viewingAccountStatus: state.admin.viewingAccountStatus,
        viewingUserID: state.admin.viewingUserID
    }));

    const [data, setData] = useState({});
    const [historyIndexClick, setHistoryIndexClick] = useState(-1);
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

    const onHistoryStepClick = (e, index) => {
      //  e.preventDefault();
        setHistoryIndexClick(index);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosInstance.get("/admin/history/", {
                    params: {
                        historyID: curGameId,
                        userID: viewingUserID
                    }
                });
                if (response.status === 200) {
                    setData(response.data);
                }
            } catch (error) {
                console.log(error);
                if (error.response.status === 401)
                {
                    history.push("/auth/signin");
                }
            }
        }

        fetchData();
    }, [history, curGameId]);

    const listMessage = data.chats;
    var messages = null;

    if (listMessage) {
        messages = listMessage.map((item, index) => (
            <ListItem key={item._id} style={{ height: '30px' }}>
                <ListItemText
                    disableTypography
                    primary={
                        <React.Fragment>
                            <Typography ><span style={{ fontWeight: 'bold', color: item.talker === data.me_fullname ? 'blue' : (item.talker === data.enemy_fullname ? 'red' : 'black') }}>{item.talker}:</span> {item.message}</Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
        ));
    }

    const listStep = data.stepHistory;
    var histories = null;

    if (listStep) {
        histories = listStep.map((item, index) => {
            var a = 3;

            return (
                <CustomListItem key={item._id} style={{ height: '30px' }} onClick={(e) => onHistoryStepClick(e, item.index)}>
                    <ListItemText
                        disableTypography
                        primary={
                            <React.Fragment>
                                <Typography style={{fontWeight: 'bold'}}><span>{index + 1}. Ô [{Math.floor(item.index/20)}][{item.index % 20}]</span>: <span style={{color: item.player === 1 ? 'red' : 'blue'}}>{item.player === 1 ? 'X' : 'O'}</span></Typography>
                            </React.Fragment>
                        }
                    />
                </CustomListItem>
            )
        });
    }


    return (
        <div>
            {/* <Parallax small filter />
            <div className={classNames(classes.main, classes.mainRaised)}> */}
            <div>
                <div>
                    <div className={classes.containerLarge}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={0}>
                                <div className={classes.profile} style={{height:"50px"}}>
                                {/* <img src={logoIGomoku} className="img-fluid profile-image" style={{maxWidth:"400px"}} /> */}
                                    {/* <div className={classes.name}>
                                        <h3 className={classes.title}>Match History</h3>
                                    </div> */}
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className={classes.description}>

                        </div>
                        <GridContainer justify="flex-start">
                            <GridItem xs={3} sm={3} md={3} className={classes.navWrapper}>
                                <div className={classes.containerLarge}>
                                    <GridContainer justify="center" style={{ marginTop: "30px" }}>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <Card className={classes[cardAnimaton]}>
                                                <form className={classes.form}>
                                                    <CardHeader color="info" className={classes.cardHeader}>
                                                        <h4>Match Detail</h4>
                                                        <div className={classes.socialLine}>

                                                        </div>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <List className={classes.root} style={{ maxHeight: '383px', overflow: 'auto' }}>
                                                            <Button variant="outline-success" style={{paddingLeft: "5px", paddingRight: "5px" }}>{data.me_fullname}</Button>
                                                            {" VS "}
                                                            <Button variant="outline-danger" style={{paddingLeft: "5px", paddingRight: "5px" }}>{data.enemy_fullname}</Button>
                                                            <br></br><br></br>
                                                            <Tooltip title="Board Name" placement="left">
                                                                <ListItem button>
                                                                    <ListItemIcon>
                                                                    <AssignmentInd></AssignmentInd>
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={data.boardName} />
                                                                </ListItem>
                                                            </Tooltip>
                                                            <Tooltip title="Winner" placement="left">
                                                                <ListItem button>
                                                                    <ListItemIcon>
                                                                    <FontAwesomeIcon
                                                                        icon={faTrophy}
                                                                    ></FontAwesomeIcon>
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={data.result === 1 ? data.me_fullname : data.enemy_fullname} style={{ color: data.result === 1 ? 'blue' : 'red' }}/>
                                                                </ListItem>
                                                            </Tooltip>
                                                            <Tooltip title="Date" placement="left">
                                                                <ListItem button>
                                                                <ListItemIcon>
                                                                <Today></Today>
                                                                </ListItemIcon>
                                                                    <ListItemText primary={data.time} />
                                                                </ListItem>
                                                            </Tooltip>
                                                            <Tooltip title="Elo Gained" placement="left">
                                                                <ListItem button>
                                                                    <ListItemIcon>
                                                                    <Grade></Grade>
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={data.eloGot} />
                                                                </ListItem>
                                                            </Tooltip>
                                                        </List>
                                                    </CardBody>
                                                    <CardFooter className={classes.cardFooter}>

                                                    </CardFooter>
                                                </form>
                                            </Card>
                                        </GridItem>
                                    </GridContainer>
                                </div>
                            </GridItem>
                            <GridItem xs={6} sm={6} md={6} className={classes.navWrapper}>
                                {/* <h5>Bàn cờ</h5>, */}
                                <br></br>
                                <BoardShow matrix={data.stepHistory} indexClick={historyIndexClick} winningLine={data.winningLine}></BoardShow>
                                <h1></h1>
                            </GridItem>
                            <GridItem xs={3} sm={3} md={3} className={classes.navWrapper}>
                                <div className={classes.containerLarge}>
                                    <GridContainer justify="center" style={{ marginTop: "30px" }}>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <Card className={classes[cardAnimaton]}>
                                                <form className={classes.form}>
                                                    <CardHeader color="info" className={classes.cardHeader}>
                                                        <h4>Chats</h4>
                                                        <div className={classes.socialLine}>

                                                        </div>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <List className={classes.root} style={{ maxHeight: '383px', overflow: 'auto' }}>
                                                            {messages ? messages : ''}
                                                        </List>
                                                    </CardBody>
                                                    <CardFooter className={classes.cardFooter}>

                                                    </CardFooter>
                                                </form>
                                            </Card>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer justify="center" style={{ marginTop: "30px" }}>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <Card className={classes[cardAnimaton]}>
                                                <form className={classes.form}>
                                                    <CardHeader color="info" className={classes.cardHeader}>
                                                        <h4>Steps</h4>
                                                        <div className={classes.socialLine}>

                                                        </div>
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
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
