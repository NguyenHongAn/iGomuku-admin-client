import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
// @material-ui/icons

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

// core components
import Footer from "../../components/Footer/Footer.js";
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Parallax from "../../components/Parallax/Parallax.js";
import profile from "../../assets/img/battle_logo.png";
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
            <Parallax small filter />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    <div>
                                        <img src={profile} alt="..." className={imageClasses} />
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>CHI TIẾT LỊCH SỬ TRẬN ĐẤU</h3>
                                        <h6>------oOo------</h6>
                                        <Button justIcon link className={classes.margin5}>
                                            <TwitterIcon />
                                        </Button>
                                        <Button justIcon link className={classes.margin5}>
                                            <InstagramIcon />
                                        </Button>
                                        <Button justIcon link className={classes.margin5}>
                                            <FacebookIcon />
                                        </Button>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className={classes.description}>

                        </div>
                        <GridContainer justify="flex-start">
                            <GridItem xs={7} sm={7} md={7} className={classes.navWrapper} style={{ border: "2px solid #5bc0de", borderRight: 'none', borderBottom: 'none' }}>
                                <h5>Thông tin cơ bản trận đấu</h5>
                                <h6>-------------</h6>
                                <ul style={{ textAlign: 'left', marginTop: '15px', marginLeft: '50px' }}>
                                    <li><b>Trận đấu giữa:  &nbsp; &nbsp;<span style={{ color: 'blue' }}>{data.me_fullname}</span> &nbsp;&nbsp;- &nbsp;&nbsp; <span style={{ color: 'red' }}>{data.enemy_fullname}</span></b></li>
                                    <li><b>Tên phòng: &nbsp;&nbsp;</b> {data.boardName}</li>
                                    <li><b>Thời gian: &nbsp;&nbsp;</b>{data.time}</li>
                                    <li><b>Người thắng: &nbsp;&nbsp;<span style={{ color: data.result === 1 ? 'blue' : 'red' }}>{data.result === 1 ? data.me_fullname : data.enemy_fullname}</span></b></li>
                                    <li><b>Elo của bạn dành được: &nbsp;&nbsp;</b>{data.eloGot}</li>
                                </ul>
                            </GridItem>
                            <GridItem xs={5} sm={5} md={5} className={classes.navWrapper} style={{ border: "2px solid #5bc0de", borderBottom: 'none' }}>
                                <div className={classes.container}>
                                    <GridContainer justify="center" style={{ marginTop: "30px" }}>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <Card className={classes[cardAnimaton]}>
                                                <form className={classes.form}>
                                                    <CardHeader color="info" className={classes.cardHeader}>
                                                        <h4>Lịch sử trò chuyện</h4>
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
                                </div>
                            </GridItem>
                            {/* <GridItem xs={12} sm={12} md={9} className={classes.navWrapper}  style={{border: "2px solid black"}}>
                                <h4>Chi tiết bàn cờ</h4>
                            </GridItem> */}
                            <GridItem xs={8} sm={8} md={8} className={classes.navWrapper} style={{ border: "2px solid #5bc0de", marginTop: '-50px', borderRight: "none" }}>
                                <h5>Bàn cờ</h5>,
                                <BoardShow matrix={data.stepHistory} indexClick={historyIndexClick} winningLine={data.winningLine}></BoardShow>
                                <h1></h1>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4} className={classes.navWrapper} style={{ border: "2px solid #5bc0de", marginTop: '-50px' }}>
                                <div className={classes.container}>
                                    <GridContainer justify="center" style={{ marginTop: "30px" }}>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <Card className={classes[cardAnimaton]}>
                                                <form className={classes.form}>
                                                    <CardHeader color="info" className={classes.cardHeader}>
                                                        <h4>Lịch sử bước đi</h4>
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
