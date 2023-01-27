import { useState, useEffect, useRef } from "react";
import AreaWrapper from "./Area.style";
import InfiniteViewer from "react-infinite-viewer";
import Shape from "../../components/Shape/Shape.component";
import { nanoid } from "nanoid";
import { DrawerMenu } from "../../components/DrawerMenu/DrawerMenu.component";
import { AiFillGithub } from "react-icons/ai";

const Area = () => {
  const viewerRef = useRef(null);
  const [shapes, setShapes] = useState([]);

  return (
    <AreaWrapper>
      <div
        style={{
          width: "100%",
          zIndex: 4000,
          position: "fixed",
          background: " #a8c0ff",
          background: "-webkit-linear-gradient(to right, #a8c0ff, #3f2b96)",
          background: "linear-gradient(to right, #a8c0ff, #3f2b96)",
          borderBottom: "1px solid #ffd300",
        }}
      >
        <p className="font-bold blink inline-block text-center">
          🚀 Live Demo 🚀
        </p>
      </div>
      <DrawerMenu data={shapes} setData={setShapes} />
      <div
        // useAutoZoom={true}
        ref={viewerRef}
        className="viewer"
        onScroll={(e) => {}}
        zoom={1}
      >
        <div className="viewport">
          {shapes.map((shape, index) => (
            <Shape
              key={index}
              viewerRef={viewerRef}
              data={shape}
              setShapes={setShapes}
              shapes={shapes}
            />
          ))}
        </div>
      </div>
    </AreaWrapper>
  );
};

export default Area;
