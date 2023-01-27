import { useState, useEffect, useRef } from "react";
import Moveable from "react-moveable";
import MoveableHelper from "moveable-helper";
import { nanoid } from "nanoid";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import ShapeWrapper from "./Shape.style";
import { TbTextResize, TbDragDrop, TbEdit, TbTrash } from "react-icons/tb";
import { isMobile } from "react-device-detect";

const Shape = ({ viewerRef, data, shapes, setShapes }) => {
  const [target, setTarget] = useState(null);
  const [helper] = useState(() => {
    return new MoveableHelper();
  });

  const onFocus = (id) => {
    const newShapes = shapes.map((shape) => {
      if (shape.id === id) {
        return {
          ...shape,
          focus: true,
        };
      }
      return {
        ...shape,
        focus: false,
      };
    });
    setShapes(newShapes);
  };

  const onDelete = (id) => {
    const newShapes = shapes.filter((shape) => shape.id !== id);
    setShapes(newShapes);
  };

  const handleTextChange = (e) => {
    const newShapes = shapes.map((shape) => {
      if (shape.id === data.id) {
        return {
          ...shape,
          text: e.target.value,
        };
      }
      return shape;
    });
    setShapes(newShapes);
  };

  const handleClick = (e, info) => {
    if (info.name === "resize") {
      const newShapes = shapes.map((shape) => {
        if (shape.id === info.id) {
          return {
            ...shape,
            resizable: info.resizable,
          };
        }
        return shape;
      });
      setShapes(newShapes);
    }

    if (info.name === "drag") {
      const newShapes = shapes.map((shape) => {
        if (shape.id === info.id) {
          return {
            ...shape,
            dragable: info.dragable,
            edit: false,
          };
        }
        return shape;
      });
      setShapes(newShapes);
    }

    if (info.name === "edit") {
      const newShapes = shapes.map((shape) => {
        if (shape.id === info.id) {
          return {
            ...shape,
            edit: info.edit,
            dragable: !data.dragable,
          };
        }
        return shape;
      });
      setShapes(newShapes);
    }
  };

  useEffect(() => {
    setTarget(document.querySelector(`#shape-${data.id}`));
  }, []);

  return (
    <>
      <ContextMenuTrigger
        holdToDisplay={isMobile ? 1000 : -1}
        id={"context-menu" + "-" + data.id}
      >
        <div
          onClick={() => onFocus(data.id)}
          style={{
            backgroundColor: data.color,
            zIndex: data.focus ? 1 : 0,
            borderRadius: data.shape + "%",
            clipPath:
              data.shape === "-1"
                ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                : "none",
          }}
          id={"shape-" + data.id}
          className="shape "
        >
          <div className="note-container">
            {!data.edit && (
              <p
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent:
                    data.shape === "-1" || data.shape === "50"
                      ? "center"
                      : "left",
                  alignItems:
                    data.shape === "-1" || data.shape === "50"
                      ? "center"
                      : "left",
                }}
              >
                {data.text}
              </p>
            )}
            {data.edit && (
              <textarea
                style={{
                  borderRadius: data.shape + "%",
                  textAlign: "center",
                  verticalAlign: "middle",
                  clipPath:
                    data.shape === "-1"
                      ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                      : "none",
                }}
                onChange={handleTextChange}
                className="textarea"
                defaultValue={data.text}
              />
            )}
          </div>
        </div>
      </ContextMenuTrigger>
      <ShapeWrapper>
        <ContextMenu
          style={{
            width: "200px",
          }}
          className="card context-menu"
          id={"context-menu" + "-" + data.id}
        >
          <div className="card-body">
            <ul>
              <li>
                <MenuItem
                  className="flex items-center align-middle"
                  onClick={handleClick}
                  data={{
                    name: "resize",
                    id: data.id,
                    resizable: !data.resizable,
                  }}
                >
                  <TbTextResize size={25} />
                  <div className="ml-3">
                    Resize{" "}
                    {data.resizable ? (
                      <span className="text-warning">Off</span>
                    ) : (
                      <span className="text-success">On</span>
                    )}
                  </div>
                </MenuItem>
              </li>
              <li>
                <MenuItem
                  className="flex items-center align-middle"
                  onClick={handleClick}
                  data={{
                    name: "drag",
                    id: data.id,
                    dragable: !data.dragable,
                  }}
                >
                  <TbDragDrop size={25} />
                  <div className="ml-3">
                    Drag Mode{" "}
                    {data.dragable ? (
                      <span className="text-warning">Off</span>
                    ) : (
                      <span className="text-success">On</span>
                    )}
                  </div>
                </MenuItem>
              </li>

              <li>
                <MenuItem
                  className="flex items-center align-middle"
                  onClick={handleClick}
                  data={{
                    name: "edit",
                    id: data.id,
                    edit: !data.edit,
                  }}
                >
                  <TbEdit size={25} />
                  <div className="ml-3">
                    Text Mode{" "}
                    {data.edit ? (
                      <span className="text-warning">Off</span>
                    ) : (
                      <span className="text-success">On</span>
                    )}
                  </div>
                </MenuItem>
              </li>
              <li>
                <MenuItem
                  className="flex items-center align-middle"
                  onClick={() => onDelete(data.id)}
                >
                  <TbTrash color=" #FF3131" size={25} />
                  <div
                    style={{
                      color: " #FF3131",
                    }}
                    className="ml-3"
                  >
                    Delete{" "}
                  </div>
                </MenuItem>
              </li>
            </ul>
          </div>
        </ContextMenu>
      </ShapeWrapper>
      <Moveable
        hideDefaultLines={!data.focus}
        draggable={data.dragable}
        target={target}
        resizable={data.resizable}
        rotatable={data.resizable}
        origin={false}
        zoom={0.8}
        padding={{ left: 7, top: 7, right: 7, bottom: 7 }}
        onResizeStart={helper.onResizeStart}
        onResize={helper.onResize}
        onResizeEnd={helper.onResizeEnd}
        onRotateStart={helper.onRotateStart}
        onRotate={helper.onRotate}
        onRotateEnd={helper.onRotateEnd}
        onDragStart={(e) => {
          helper.onDragStart(e);
          onFocus(data.id);
        }}
        onDrag={helper.onDrag}
        // ----------
        // scrollable={true}
        // scrollThreshold={20}
        // scrollContainer={() => viewerRef.current.getElement()}
        // getScrollPosition={() => {
        //   console.log(
        //     viewerRef.current.getScrollLeft(),
        //     viewerRef.current.getScrollTop(),
        //   );
        //   return [
        //     viewerRef.current.getScrollLeft(),
        //     viewerRef.current.getScrollTop(),
        //   ];
        // }}
        // onScroll={({ direction }) => {
        //   console.log(direction);
        //   viewerRef.current.scrollBy(direction[0] * 10, direction[1] * 10);
        // }}
      />
    </>
  );
};

export default Shape;
