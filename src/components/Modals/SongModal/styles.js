import styled from "styled-components";

export const ModalBody = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 90%;
  max-width: 400px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  padding: 1rem;
  border: none;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.3);
`;

export const ModalTitle = styled.h4`
  text-align: left;
  /* font-family: Roboto; */
  color: #116DEE;
  width: 100%;
  font-size: 2rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
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
`;

export const ModalButton = styled.div`
  cursor: pointer;
  color: #116DEE;
  width: 100%;
  text-align: right;
  margin-top: 1.75rem;
  /* font-family: Roboto; */
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
`;
