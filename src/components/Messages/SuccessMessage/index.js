import React from "react";
import { MainHeader, TextContainer, TextWrapper, FadeOut } from "./styles";

const SuccessMessage = (props) => {
    const { successMessage } = props;

    return (
      <FadeOut>
        <MainHeader>
          <TextContainer>
            <TextWrapper>{successMessage}</TextWrapper>
          </TextContainer>
        </MainHeader>
      </FadeOut>
    );
};

export default SuccessMessage;