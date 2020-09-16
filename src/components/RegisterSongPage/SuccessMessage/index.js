import React from "react";
import styled from "styled-components"

const MainHeader = styled.div`
background-color: #34eb6b;
font-weight: bold;
  display: flex;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
  margin: 0;
  box-shadow: 0 0 2rem 0 rgba(0,0,0,0.3);
`;

const TextContainer = styled.div`
  display: flex;
  width: 25%;
  justify-content: center;
`;

const TextWrapper = styled.div`
  cursor: pointer;
`

const PopupMessage = () => {

    return (
      <MainHeader>
        <TextContainer><TextWrapper>Song added successfully!</TextWrapper></TextContainer>
      </MainHeader>
    );
}

export default PopupMessage;