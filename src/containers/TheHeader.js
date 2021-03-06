import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'

import { 
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks
}  from './index'

import ReduxAction from "../store/actions";

const TheHeader = ({ isAuthenticated }) => {
    //redux
    const { jwtToken, fullname, userID, autoMatch } = useSelector(state => ({
      jwtToken: state.auth.jwtToken,
      fullname: state.auth.fullname,
      userID: state.auth.userID,
      autoMatch: state.auth.autoMatch,
    }));
  
    // const socket = useSelector(state => state.socket.socket);
    const dispatch = useDispatch();
    //const location = useLocation();
  
    useEffect(() => {
      if (!isAuthenticated)
        window.location.href = '/#/login';
    });
  const sidebarShow = useSelector(state => state.ui.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const logout = () => {
    dispatch(ReduxAction.auth.signOut);
    //dispatch(ReduxAction.match.restoreDefault);
    // socket.emit("sign-out", { userID });
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif/>
        <TheHeaderDropdownMssg/>
        <TheHeaderDropdown callbackLogout={logout}/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
      </CSubheader>
    </CHeader>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: (state.auth.jwtToken !== "invalid token :))") ? true : false
  }
}


export default connect(
  mapStateToProps,
)(TheHeader)
