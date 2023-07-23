import React, { useState } from "react";

const RadioButtons = ({ onRadioChange }) => {
  const [checkedIndex, setCheckedIndex] = useState(0);

  const radioButtons = [
    {
      label: "MULTISYLLABIC",
      id: "multisyllabic",
    },
    {
      label: "END",
      id: "end",
    },
    {
      label: "SLANT",
      id: "slant",
    },
  ];

  const handleRadioChange = (event) => {
    const index = parseInt(event.target.id, 10);
    setCheckedIndex(index);
    if (onRadioChange) {
      onRadioChange(radioButtons[index].id); // Call the onRadioChange callback and pass the selected ID
    }
  };

  const handleLabelClick = (index) => {
    setCheckedIndex(index);
    if (onRadioChange) {
      onRadioChange(radioButtons[index].id); // Call the onRadioChange callback and pass the selected ID
    }
  };

  return (
    <div className="flex w-full relative items-center justify-center m-4">
      {radioButtons.map((radioButton, index) => (
        <div key={index} className="px-3">
          <input
            type="radio"
            id={index}
            name="tabs"
            className="appearance-none"
            checked={index === checkedIndex}
            onChange={handleRadioChange}
          />
          <label
            htmlFor={index}
            className={`cursor-pointer py-1 px-4  rounded-full ${
              index === checkedIndex ? "bg-color1 text-color2" : "text-black"
            } select-none`}
            onClick={() => handleLabelClick(index)}
          >
            {radioButton.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioButtons;
