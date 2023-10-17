import React, { useState } from "react";
import icon from "../images/rayoPng.png";
import "../styles/App.css";

function App() {
    // lista izq
  const [leftList, setLeftList] = useState([
    { id: 1, text: "List item 1" },
    { id: 2, text: "List item 2" },
    { id: 3, text: "List item 3" },
    { id: 4, text: "List item 4" },
  ]);

  //lista derecha
  const [rightList, setRightList] = useState([]);

  //evento drag
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  };

  //drop derecha
  const handleDropToRight = (e) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("text/plain"));
    setRightList([...rightList, draggedItem]);
    setLeftList(leftList.filter((item) => item.id !== draggedItem.id));
  };

  //drop izquierda
  const handleDropToLeft = (e) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("text/plain"));
    setLeftList([...leftList, draggedItem]);
    setRightList(rightList.filter((item) => item.id !== draggedItem.id));
  };

  return (
    <div className="App">
      <div className="container">
        <div id="left">
          {leftList.map((item) => (
            <div
              key={item.id}
              className="list"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, item)}
              onDrop={(e) => handleDropToLeft(e)}
              onDragOver={(e) => e.preventDefault()}
            >
              <img className="img" src={icon} alt="icon" />
              {item.text}
            </div>
          ))}
        </div>
        <div
          id="right"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDropToRight(e)}
        >
          {rightList.map((item) => (
            <div
              key={item.id}
              className="list"
              draggable={rightList.length > 1} // Deshabilita el arrastre si solo queda un elemento
              onDragStart={(e) => handleDragStart(e, item)}
              onDragOver={(e) => e.preventDefault()}
            >
              <img className="img" src={icon} alt="icon" />
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
