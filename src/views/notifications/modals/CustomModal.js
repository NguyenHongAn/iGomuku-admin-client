import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";

const CustomModal = ({
  show = false,
  onClose = {},
  color = "danger",
  modalTitle = "Modal title",
  modalBody = "Modal body content",
  firstBtnContent = "Do Something",
  firstBtnAction = {},
  secondColor = "secondary",
  secondBtnContent = "Cancel",
  secondBtnAction = {},
}) => {
  return (
    <CModal show={show} onClose={() => onClose()} color={color}>
      <CModalHeader closeButton>
        <CModalTitle>{modalTitle}</CModalTitle>
      </CModalHeader>
      <CModalBody>{modalBody}</CModalBody>
      <CModalFooter>
        <CButton color={color} onClick={() => firstBtnAction()}>
          {firstBtnContent}
        </CButton>{" "}
        <CButton color={secondColor} onClick={() => secondBtnAction()}>
          {secondBtnContent}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
export default CustomModal