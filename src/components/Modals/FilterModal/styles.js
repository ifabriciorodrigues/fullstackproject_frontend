import styled from "styled-components";

export const ModalBody = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  max-width: 400px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  padding: 1rem;
  border: none;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.3);

  @media (min-width: 320px) {
    overflow: auto;
    width: 80%;
  }

  @media (min-width: 1024px) {
    width: 90%;
  }
`;

export const ModalTitle = styled.h4`
  text-align: left;
  /* font-family: Roboto; */
  color: #116dee;
  width: 100%;
  font-size: 2rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;

  @media (min-width: 320px) {
    font-size: 1.5rem;
    margin: 0;
    width: 80%;
  }

  @media (min-width: 1024px) {
    font-size: 2rem;
    width: 100%;
  }
`; 

export const ModalElement = styled.h6`
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;

  @media (min-width: 320px) {
    width: 80%;
  }

  @media (min-width: 1024px) {
    width: 100%;
  }
`;

export const ModalButton = styled.div`
  cursor: pointer;
  color: #4f81a8;
  width: 100%;
  text-align: right;
  margin-top: 1.75rem;
  /* font-family: Roboto; */
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;

  @media (min-width: 320px) {
    font-size: 1rem;
    width: 80%;
  }

  @media (min-width: 1024px) {
    font-size: 2rem;
    width: 100%;
  }
`;

export const OrderTypeContainer = styled.div`
  display: flex;
  width: 100%;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;

  @media (min-width: 320px) {
    font-size: 1rem;
    width: 80%;
  }
`;

export const OrderTypeElement = styled.div`
  display: flex;
  width: 30%;

  @media (min-width: 320px) {
    font-size: 1rem;
    width: 80%;
  }
`;
