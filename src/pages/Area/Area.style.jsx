import styled from "styled-components";

const AreaWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  /* padding: 10px; */
  position: relative;
  background: linear-gradient(90deg, #161122 21px, transparent 1%) center,
    linear-gradient(#161122 21px, transparent 1%) center, #a799cc;
  background-size: 22px 22px;

  .viewer {
    padding: 10px;
    /* width: 110vw;
    height: 110vh; */
    width: 100vw;
    height: 100vh;
    overflow: scroll;

    .shape {
      min-width: 50px;
      width: 250px;
      min-height: 50px;
      height: 250px;
      padding: 5px;
      position: absolute;
      background: #ffd300;
      /* border-radius: 3px; */
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      top: 100px;
      left: 100px;

      /* &:hover {
        cursor: grab;
      } */

      .note-container {
        width: 100%;
        height: 100%;
        overflow: auto;
        text-align: start;

        p {
          color: #000;
          margin: 0;
          padding: 10px;
          font-weight: 700;
        }

        textarea {
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          border: none;
          outline: none;
          resize: none;
          font-size: 1rem;
          font-weight: 700;
        }
      }
    }
  }
`;

export default AreaWrapper;
