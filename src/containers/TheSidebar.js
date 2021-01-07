import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {

    //redux
    const { jwtToken, fullname, userID, autoMatch } = useSelector(state => ({
      jwtToken: state.auth.jwtToken,
      fullname: state.auth.fullname,
      userID: state.auth.userID,
      autoMatch: state.auth.autoMatch,
    }));

  const dispatch = useDispatch()
  const show = useSelector(state => state.ui.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> */}
        <CImg
            src={"logo-igomoku.png"}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
      </CSidebarBrand>
      <CSidebarNav>
        <CSidebarNavTitle>

        Welcome, {fullname}
        </CSidebarNavTitle>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
