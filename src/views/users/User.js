import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Payment from '@material-ui/icons/Payment';
import HistoryMatch from '@material-ui/icons/History';
import Friend from '@material-ui/icons/PeopleAlt';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import EditIcon from '@material-ui/icons/Edit';
import KeyIcon from '@material-ui/icons/VpnKey';
// core components
import Footer from "../../components/Footer/Footer.js";
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import NavPills from "../../components/NavPills/NavPills.js";
import Parallax from "../../components/Parallax/Parallax.js";
import profile from "../../assets/img/avt-theanh.jpg";
import axiosInstance from '../../api';

// subs element
import ChangePasswordElement from './ChangePassword';
import EditInfoElement from './EditInfo';
import ListFriendElement from './ListFriend';
import PaymentElement from './Payment';
import HistoryMatchElement from './HistoryMatch';

import styles from "../../assets/jss/material-kit-react/views/profilePage.js";


const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );


  // redux
  const { userId } = useSelector(state => ({
    jwtToken: state.auth.jwtToken,
    fullname: state.auth.fullname,
    userId: state.auth.userID
  }));

  const [basicInfo, setBasicInfo] = useState({});


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get("/auth/profile/", {
          params: {
            userId: userId
          }
        });
        if (response.status === 200) {
          setBasicInfo(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

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
                    <h3 className={classes.title}>{basicInfo.fullname}</h3>
                    <h6>{basicInfo.email}</h6>
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
              <p>
                An artist of considerable range, Chet Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.{" "}
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={9} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="info"
                  tabs={[
                    {
                      tabButton: "History",
                      tabIcon: HistoryMatch,
                      tabContent: (<HistoryMatchElement></HistoryMatchElement>)
                    },
                    {
                      tabButton: "Payment",
                      tabIcon: Payment,
                      tabContent: (<PaymentElement></PaymentElement>)
                    },
                    {
                      tabButton: "Friends",
                      tabIcon: Friend,
                      tabContent: (<ListFriendElement></ListFriendElement>)
                    },
                    {
                      tabButton: "Edit",
                      tabIcon: EditIcon,
                      tabContent: (<EditInfoElement userInfo={basicInfo}> </EditInfoElement>)
                    },
                    {
                      tabButton: "RePassword",
                      tabIcon: KeyIcon,
                      tabContent: (<ChangePasswordElement> </ChangePasswordElement>)

                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
