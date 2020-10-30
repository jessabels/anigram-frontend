import React, { useState } from "react";
import "./DailyChecklistItem.css";

import Checkbox from "@material-ui/core/Checkbox";

const DailyChecklistItem = (props) => {
  const [items, setItems] = useState([
    { text: "  Talk to your villagers", isCompleted: false },
    { text: "Shake trees", isCompleted: false },
    { text: "Collect plenty of fruit", isCompleted: false },
    { text: "Smack your rocks", isCompleted: false },
    { text: "Find the glowing spot", isCompleted: false },
    { text: "Collect your fossils", isCompleted: false },
    { text: "Use the Nook Stop terminal", isCompleted: false },
    { text: "Check the recycling bin", isCompleted: false },
    { text: "Stroll along the beach", isCompleted: false },
    { text: "Explore your island for visitors", isCompleted: false },
    { text: "Collect Nook Miles", isCompleted: false },
    { text: "Do some fishing", isCompleted: false },
    { text: "Go bug catching", isCompleted: false },
  ]);
  const completeItem = (index) => {
    const newChecklist = [...items];
    console.log(newChecklist[index].isCompleted);
    newChecklist[index].isCompleted = !newChecklist[index].isCompleted;
    setItems(newChecklist);
  };
  return (
    <div className="list-container">
      {items.map((item, index) => (
        <div key={item.text} className="list-item">
          <Checkbox
            index={index}
            checked={item.isCompleted}
            onChange={() => completeItem(index)}
            name="checkedB"
            color="primary"
          />
          <span
            style={{ textDecoration: item.isCompleted ? "line-through" : "" }}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DailyChecklistItem;