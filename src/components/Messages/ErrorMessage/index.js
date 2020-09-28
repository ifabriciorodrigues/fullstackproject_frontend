import React from "react";
import { MainHeader, TextContainer, TextWrapper, FadeOut } from "./styles"

const ErrorMessage = (props) => {
    const { errorMessage } = props;

    return (
      <FadeOut>
        <MainHeader>
          <TextContainer>
            <TextWrapper>{errorMessage}</TextWrapper>
          </TextContainer>
        </MainHeader>
      </FadeOut>
    );
}

export default ErrorMessage;