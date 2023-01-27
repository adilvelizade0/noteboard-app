import { useState } from "react";
import DrawerMenuWrapper from "./DrawerMenu.style";
import { SlArrowRight } from "react-icons/sl";
import Select from "react-select";
import { nanoid } from "nanoid";

export const DrawerMenu = ({ data, setData }) => {
  const [selectedOption, setSelectedOption] = useState("#1F51FF");
  const [selectedShape, setSelectedShape] = useState("0");
  const [text, setText] = useState("");

  const createData = () => {
    const newData = {
      id: nanoid(),
      color: selectedOption,
      resizable: false,
      dragable: true,
      focus: false,
      shape: selectedShape,
      text,
      edit: false,
    };
    setData([...data, newData]);
  };
  return (
    <DrawerMenuWrapper>
      {/* <button className="btn btn-primary btn-drawer">
        <SlArrowRight size={24} />
      </button> */}

      <input type="checkbox" id="drawer-left" className="drawer-toggle" />

      <label htmlFor="drawer-left" className="btn btn-primary btn-drawer">
        <SlArrowRight size={24} />
      </label>
      <label className="overlay" htmlFor="drawer-left"></label>
      <div className="drawer">
        <div className="drawer-content pt-10 flex flex-col h-full">
          <label
            htmlFor="drawer-left"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex flex-col h-full">
            <select
              value={selectedOption}
              onChange={(e) => {
                console.log(e.target.value);
                setSelectedOption(e.target.value);
              }}
              className="select mt-3"
            >
              <option value="#1F51FF">Neon Blue</option>
              <option value="#ffd300">Yellow</option>
              <option value="#FF3131">Red</option>
              <option value="#ab20fd">Purple</option>
            </select>

            <select
              value={selectedShape}
              onChange={(e) => {
                setSelectedShape(e.target.value);
              }}
              className="select mt-3"
            >
              <option value="0">Squared</option>
              <option value="3">Rounded</option>
              <option value="50">Circled</option>
              <option value="-1">Triangle</option>
            </select>

            <textarea
              style={{
                resize: "none",
              }}
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              class="textarea mt-3"
              placeholder="Enter the note..."
            />
            <label
              htmlFor="drawer-left"
              onClick={createData}
              className="btn btn-success mt-3"
            >
              Create
            </label>
          </div>
        </div>
      </div>
    </DrawerMenuWrapper>
  );
};
