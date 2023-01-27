import styled from "styled-components";

const DrawerMenuWrapper = styled.div`
  .btn-drawer {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-100%);
    z-index: 1;
    background-color: #242424;
    padding: 2rem 0.5rem 2rem 0.5rem;
    border: 1px solid transparent;
    border-radius: 0 50% 50% 0;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      border: 1px solid #53a9ff;
    }
  }
`;

export default DrawerMenuWrapper;
