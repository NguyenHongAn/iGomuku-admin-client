/*eslint-disable*/
import React, {useEffect} from 'react';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from "../../store/actions/authActions";
import {useLocation} from 'react-router-dom';

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();

  //redux
  const { jwtToken, fullname, userID } = useSelector(state => ({
    jwtToken: state.auth.jwtToken,
    fullname: state.auth.fullname,
    userID: state.auth.userID,
  }));

  const socket = useSelector(state => state.socket.socket);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {

  });


  function logout() {
    dispatch(authActions.signOut);
    socket.emit("sign-out", { userID });
  }

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={classes.navLink}
          style={{ fontSize: '16px' }}
          disabled
        >
             <Link  to="/auth/signin">Sign In</Link>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="#"
          color="transparent"
          className={classes.navLink}
          style={{ fontSize: '16px' }}
        >
          Sign Up
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="#"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <TwitterIcon />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="#"
            target="_blank"
            className={classes.navLink}
          >
            <FacebookIcon style={{ width: '40px' }} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="#"
            target="_blank"
            className={classes.navLink}
          >
            <InstagramIcon />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
