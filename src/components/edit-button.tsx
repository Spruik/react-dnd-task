import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

type EditButtonsProps = {
  handleSave: any;
  saveLabel: any;
  handleDelete?: any;
  handleCancel: any;
};

const EditButtonsContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const EditButton = styled.div`
  cursor: pointer;
  box-shadow: 0 1px 0 0 #3f6f21;
  width: fit-content;
  margin: 0 5px 10px;
  padding: 6px 12px;
  border-radius: 5px;
  color: white;
  font-weight: 700;
  outline: none;

  &:hover {
    opacity: 0.7;
  }
`;

const EditButtonCancel = styled.div`
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-size: 20px;
  opacity: 0.5;
  outline: none;

  &:hover {
    opacity: 1;
  }
`;

const EditButtons: React.FC<EditButtonsProps> = (props) => (
  <EditButtonsContainer>
    <EditButton tabIndex={0} style={{ backgroundColor: '#5aac44' }} onClick={props.handleSave}>
      {props.saveLabel}
    </EditButton>
    {props.handleDelete && (
      <EditButton tabIndex={0} style={{ backgroundColor: '#EA2525', marginLeft: 0 }} onClick={props.handleDelete}>
        Delete
      </EditButton>
    )}
    <EditButtonCancel tabIndex={0} onClick={props.handleCancel}>
      <FontAwesomeIcon icon={faTimes} style={{ marginLeft: 5 }} />
    </EditButtonCancel>
  </EditButtonsContainer>
);

export default EditButtons;
