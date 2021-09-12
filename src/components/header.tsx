import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { fetchImages } from '../services/image-services';
import { useViewport } from '../utils/util-functions';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background: rgba(0, 0, 0, 0.15);
  color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  text-align: center;
  font-size: 40px;
  font-weight: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ChangeBackground = styled.div`
  position: absolute;
  cursor: pointer;
  right: 0;
  z-index: 2;
  text-align: center;
  margin-right: 18px;
  font-size: 20px;
`;

const ChangeBackgroundText = styled.div`
  font-size: 15px;
  border-radius: 10px;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  padding: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

export const Header: React.FC = () => {
  const { width } = useViewport();

  return (
    <HeaderContainer>
      Demo Board
      <ChangeBackground onClick={fetchImages}>
        {width > 768 ? (
          <ChangeBackgroundText>Change Background</ChangeBackgroundText>
        ) : (
          <FontAwesomeIcon icon={faEdit} style={{ fontSize: 20 }} />
        )}
      </ChangeBackground>
    </HeaderContainer>
  );
};
