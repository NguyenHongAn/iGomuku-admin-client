import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Payment from "@material-ui/icons/Payment";
import HistoryMatch from "@material-ui/icons/History";
import Friend from "@material-ui/icons/PeopleAlt";
import {
  AccountBox,
  Email,
  Today,
  Subscriptions,
  StarHalf,
  VerifiedUser,
  Warning,
} from "@material-ui/icons";
import {
  CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'
import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faTimes,
  faCoins,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import EditIcon from "@material-ui/icons/Edit";
import KeyIcon from "@material-ui/icons/VpnKey";
// core components
import Footer from "../../components/Footer/Footer.js";
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import NavPills from "../../components/NavPills/NavPills.js";
import Parallax from "../../components/Parallax/Parallax.js";
import profile from "../../assets/img/avt-theanh.jpg";
import axiosInstance from "../../api";
import { useToasts } from "react-toast-notifications";

// subs element
import ChangePasswordElement from "./ChangePassword";
import EditInfoElement from "./EditInfo";
import ListFriendElement from "./ListFriend";
import PaymentElement from "./Payment";
import HistoryMatchElement from "./HistoryMatch";
import { Confirm } from 'react-st-modal';
import {useHistory} from 'react-router-dom';
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import ReduxAction from "../../store/actions";

const useStyles = makeStyles(styles);
const getBadge = accountStatus => {
  switch (accountStatus) {  // 'success' , 'secondary' , 'warning', 'danger' , 'primary'
    case -1: return 'warning'
    case 0: return 'success'
    case 1: return 'danger'
    case 2: return 'danger'
    default: return 'primary'
  }
}

const getStatusName = accountStatus => {
  switch (accountStatus) {
    case -1: return 'Unverified'
    case 0: return 'Active'
    case 1: return 'Blocked'
    case 2: return 'Blocked'
    default: return 'unkown'
  }
}

export default function User({match}) {
  const { addToast } = useToasts();
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );


  // redux
  const curUserId = match.params.id;
  const { adminId, viewingAccountStatus } = useSelector(state => ({
    adminId: state.auth.userID,
    viewingAccountStatus: state.admin.viewingAccountStatus
  }));

  const history = useHistory();
  const [basicInfo, setBasicInfo] = useState({});
  const dispatch = useDispatch();

  const handleBlockUser = (UserID, viewingAccountStatus) => {
    const newAccountStatus = (viewingAccountStatus === -1 ? 1 : 2); 
    axiosInstance
    .post(`/admin/set-user-status`, {
        adminId: adminId,
        userId: curUserId,
        status: newAccountStatus,
      })
      .then(function (response) {
        if (response.status === 200) {
          //TODO: cập nhật account status sau khi block
          dispatch(ReduxAction.admin.updateUserAccountStatus({userID: UserID, status: newAccountStatus}));
          dispatch(ReduxAction.admin.updateViewingAccountStatus(newAccountStatus));
        }
      })
      .catch(function (error) {
        console.log(error);
        addToast(error.response.data.message, {//
          appearance: "error",
          autoDismiss: true,
        });
      });
  }

  const handleUnBlockUser = (UserID, viewingAccountStatus) => {
    const newAccountStatus = (viewingAccountStatus === 1 ? -1 : 0); 
    axiosInstance
    .post(`/admin/set-user-status`, {
      adminId: adminId,
      userId: curUserId,
        status: newAccountStatus,
      })
      .then(function (response) {
        if (response.status === 200) {
          dispatch(ReduxAction.admin.updateUserAccountStatus({userID: UserID, status: newAccountStatus}));
          dispatch(ReduxAction.admin.updateViewingAccountStatus(newAccountStatus));
        }
      })
      .catch(function (error) {
        console.log(error);
        addToast(error.response.data.message, {//
          appearance: "error",
          autoDismiss: true,
        });
      });
  }


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get("/admin/user-profile/", {
          params: {
            userId: curUserId
          }
        });
        if (response.status === 200) {
          setBasicInfo(response.data);
          dispatch(ReduxAction.admin.updateViewingAccountStatus(response.data.accountStatus));
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
                    <div>
                    {(viewingAccountStatus !== 1 && viewingAccountStatus !== 2)? 
                          (<CButton
                            style={{marginLeft: "10px", minWidth: "4.0625rem"}}
                            color="danger"
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              const confirm = await Confirm(
                                `Are you sure to BLOCK the user: ${basicInfo.fullname}?`,
                                "Block user"
                              );
                              if (confirm) {
                                handleBlockUser(basicInfo._id, viewingAccountStatus);
                              }
                            }}
                          >
                            Block
                          </CButton>)
                          :
                          (<CButton
                            style={{marginLeft: "10px", minWidth: "4.0625rem"}}
                            color="success"
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              const confirm = await Confirm(
                                `Are you sure to UNBLOCK the user: ${basicInfo.fullname}?`,
                                "Block user"
                              );
                              if (confirm) {
                                handleUnBlockUser(basicInfo._id, viewingAccountStatus);
                              }
                            }}
                          >
                            UnBlock
                          </CButton>)
                        }
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <List>
                        <Tooltip title="Username" placement="left">
                          <ListItem button>
                            <ListItemIcon>
                              <AccountBox></AccountBox>
                            </ListItemIcon>
                            <ListItemText primary={basicInfo.username} />
                    <CBadge color={getBadge(viewingAccountStatus)}>
                      {getStatusName(viewingAccountStatus)}
                    </CBadge>
                          </ListItem>
                        </Tooltip>
                        <Tooltip title="Email" placement="left">
                          <ListItem button>
                            <ListItemIcon>
                              <Email></Email>
                            </ListItemIcon>
                            <ListItemText primary={basicInfo.email} />
                            {viewingAccountStatus === -1 || viewingAccountStatus === 1 ? (
                              <Warning></Warning>
                              //<Button 
                              // onClick={async () => {
                              //   const confirm = await Confirm(
                              //     `We will send an email to  ${basicInfo.email} for verification`,
                              //     "Verify email"
                              //   );
                              //   if (confirm) {
                              //     //handleVerifyEmail();
                              //   }
                              // }}
                              //>Unverified</Button>
                            ) : (
                              <VerifiedUser></VerifiedUser>
                            )}
                          </ListItem>
                        </Tooltip>
                        <Tooltip title="Coins" placement="left">
                          <ListItem button>
                            <ListItemIcon>
                              <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>
                            </ListItemIcon>
                            <ListItemText primary={basicInfo.xu} />
                          </ListItem>
                        </Tooltip>
                        <Tooltip title="Elo" placement="left">
                          <ListItem button>
                            <ListItemIcon>
                              <StarHalf></StarHalf>
                            </ListItemIcon>
                            <ListItemText primary={basicInfo.elo} />
                          </ListItem>
                        </Tooltip>
                        <Tooltip title="Total Matches" placement="left">
                          <ListItem button>
                            <ListItemIcon>
                              <Subscriptions></Subscriptions>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                undefined !== basicInfo.matches
                                  ? basicInfo.matches.length
                                  : -1
                              }
                            />
                          </ListItem>
                        </Tooltip>
                        <Tooltip title="Total Wins" placement="left">
                          <ListItem button>
                            <ListItemIcon>
                              <FontAwesomeIcon
                                icon={faTrophy}
                              ></FontAwesomeIcon>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                undefined !== basicInfo.winningGame
                                  ? basicInfo.winningGame.length
                                  : -1
                              }
                            />
                          </ListItem>
                        </Tooltip>
                        <Tooltip title="Joined Date" placement="left">
                          <ListItem button>
                            <ListItemIcon>
                              <Today></Today>
                            </ListItemIcon>
                            <ListItemText
                              primary={new Date(
                                basicInfo.createdDate
                              ).toLocaleDateString()}
                            />
                          </ListItem>
                        </Tooltip>
                      </List>
                    </div>
                    {/* <Button justIcon link className={classes.margin5}>
                      <TwitterIcon />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <InstagramIcon />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <FacebookIcon />
                    </Button> */}
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            {/* <div className={classes.description}>
              <p>
                An artist of considerable range, Chet Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.{" "}
              </p>
            </div> */}
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={9} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="info"
                  tabs={[
                    {
                      tabButton: "History",
                      tabIcon: HistoryMatch,
                      tabContent: <HistoryMatchElement></HistoryMatchElement>,
                    },
                    // {
                    //   tabButton: "Payment",
                    //   tabIcon: Payment,
                    //   tabContent: <PaymentElement></PaymentElement>,
                    // },
                    {
                      tabButton: "Friends",
                      tabIcon: Friend,
                      tabContent: <ListFriendElement></ListFriendElement>,
                    },
                    // {
                    //   tabButton: "Edit",
                    //   tabIcon: EditIcon,
                    //   tabContent: (
                    //     <EditInfoElement userInfo={basicInfo}>
                    //       {" "}
                    //     </EditInfoElement>
                    //   ),
                    // },
                    // {
                    //   tabButton: "RePassword",
                    //   tabIcon: KeyIcon,
                    //   tabContent: (
                    //     <ChangePasswordElement> </ChangePasswordElement>
                    //   ),
                    // },
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
