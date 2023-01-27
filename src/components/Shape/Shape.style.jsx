import styled from "styled-components";

const ShapeWrapper = styled.div`
  position: absolute;
  z-index: 4000;
  .context-menu {
    .card-body {
      padding: 0.5rem;
    }
    ul {
      margin: 0;
      li {
        list-style: none;
        border-radius: 0.75rem;
        padding: 0.5rem 1rem;
        transition: background 0.2s ease-in-out;
        font-weight: 700;

        &:hover {
          background: rgba(40, 40, 40, 1);
          cursor: pointer;
        }
      }
    }
  }
`;

export default ShapeWrapper;
