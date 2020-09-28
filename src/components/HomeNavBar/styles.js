import styled from "styled-components";

export const MainHeader = styled.div`
  background-color: ${({ theme }) => theme.navBar};
  color: ${({ theme }) => theme.text};
  display: flex;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.3);
  @media (min-width: 768px) {
    height: 64px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
`;

export const LogoWrapper = styled.div`
  cursor: pointer;
`;

export const IconsWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;

  @media (min-width: 375px) {
    width: 30%;
  }

  @media (min-width: 1024px) {
    width: 8%;
  }
`;

export const DropdownMenuContainer = styled.div`
  height: 24px;
`;