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

export const ModalImage = styled.img`
  width: 100%;
  height: 100%;
`