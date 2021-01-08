import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
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
import axiosInstance from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from "react-toast-notifications";
import ReduxAction from "../../store/actions";
import { Confirm } from 'react-st-modal';

//import usersData from './UsersData'

const getBadge = accountStatus => {
  switch (accountStatus) {  // 'success' , 'secondary' , 'warning', 'danger' , 'primary'
    case -1: return 'warning'
    case 0: return 'success'
    case 1: return 'danger'
    default: return 'primary'
  }
}

const getStatusName = accountStatus => {
  switch (accountStatus) {
    case -1: return 'Unverified'
    case 0: return 'Active'
    case 1: return 'Blocked'
    default: return 'unkown'
  }
}

function parseDateTime(dateSting) {
  let seperator = "/";
  let date = new Date( Date.parse(dateSting) );
  return [("0" + date.getDate()).slice(-2), ("0" + (date.getMonth() + 1)).slice(-2), date.getFullYear()].join(seperator) + ' ' + [("0" + date.getHours()).slice(-2), ("0" + date.getMinutes()).slice(-2)].join(':');
};

const Users = () => {    
  //redux
  const { jwtToken, fullname, userID, autoMatch } = useSelector(state => ({
    jwtToken: state.auth.jwtToken,
    fullname: state.auth.fullname,
    userID: state.auth.userID,
    autoMatch: state.auth.autoMatch,
  }));
  const usersList = useSelector(state => state.admin.usersList)
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  const handleBlockUser = (UserID) => {
    axiosInstance
    .post(`/admin/set-user-status`, {
        adminId: userID,
        userId: UserID,
        status: 1,
      })
      .then(function (response) {
        if (response.status === 200) {
          //TODO: cập nhật account status sau khi block
          dispatch(ReduxAction.admin.updateUserAccountStatus({userID: UserID, status: 1}));
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

  const handleUnBlockUser = (UserID) => {
    axiosInstance
    .post(`/admin/set-user-status`, {
        adminId: userID,
        userId: UserID,
        status: 0,
      })
      .then(function (response) {
        if (response.status === 200) {
          dispatch(ReduxAction.admin.updateUserAccountStatus({userID: UserID, status: 0}));
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
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  useEffect(()=>{
      (async () =>{      
          // get users list with GET method
          if(userID !== "0")
          {        
              try {
                  const response = await axiosInstance.get(`/admin/list-user`,{
                      params: {
                          userId: userID
                      }
                    });
                  if (response.status === 200)
                  {
                    dispatch(ReduxAction.admin.updateUsersList(response.data));
                  } 
                  
              } catch (error) {
                  console.log(error);
                  addToast(error.response.data.message, {
                      appearance: "error",
                      autoDismiss: true,
                    });
              }
          }
        
      })();
  },[addToast, dispatch, jwtToken, userID]);

  return (
    <CRow>
      <CCol xl={6}>
        <CCard style={{minWidth: "80vw"}}>
          <CCardHeader>
            <h2>Users
            <small className="text-muted"> iGomoku</small></h2>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={usersList}
            fields={[
              { key: 'fullname', _classes: 'font-weight-bold' },
              'username',
              'email',
              { key: 'createdDate', filter: false },
              { key: 'accountStatus', filter: false, _style: { width: '12%' } },
              {
                key: 'action',
                label: '',
                _style: { width: '13%' },
                sorter: false,
                filter: false
              }
            ]}
            hover
            striped
            columnFilter
            tableFilter
            sorter
            itemsPerPage={10}
            activePage={page}
            scopedSlots = {{
              'accountStatus':
                (item)=>(
                  <td className="text-center">
                    <CBadge color={getBadge(item.accountStatus)}>
                      {getStatusName(item.accountStatus)}
                    </CBadge>
                  </td>
                ),
                'createdDate':
                (item)=>(
                  <td>
                    {parseDateTime(item.createdDate)}
                  </td>
                ),
                'action':
                  (item, index)=>{
                    return (
                      <td className="py-2">
                        <CButton
                          color="info"
                          size="sm"
                          onClick={()=>{history.push(`/users/${item._id}`)}}
                        >
                          Profile
                        </CButton>
                        {item.accountStatus !== 1 ? 
                          (<CButton
                            style={{marginLeft: "10px", minWidth: "4.0625rem"}}
                            color="danger"
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              const confirm = await Confirm(
                                `Are you sure to BLOCK the user: ${item.fullname}?`,
                                "Block user"
                              );
                              if (confirm) {
                                handleBlockUser(item._id);
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
                                `Are you sure to UNBLOCK the user: ${item.fullname}?`,
                                "Block user"
                              );
                              if (confirm) {
                                handleUnBlockUser(item._id);
                              }
                            }}
                          >
                            UnBlock
                          </CButton>)
                        }
                      </td>
                      )
                  }
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={(usersList.length/10)+1}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
