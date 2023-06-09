import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [shapes, setShapes] = useState([{}]);

  const handleSubmit = () => {
    const inputArray = input.split("\n");
    const newShapes = [];

    for (let i = 0; i < inputArray.length; i++) {
      const inputs = inputArray[i].split(" ");

      if (inputs[0] === "c" && inputs.length === 4) {
        newShapes.push({
          type: "circle",
          cx: parseFloat(inputs[1]),
          cy: parseFloat(inputs[2]),
          radius: parseFloat(inputs[3]),
        });
      } else if (inputs[0] === "r" && inputs.length === 5) {
        newShapes.push({
          type: "rectangle",
          x: parseFloat(inputs[1]),
          y: parseFloat(inputs[2]),
          width: parseFloat(inputs[3]),
          height: parseFloat(inputs[4]),
        });
        //console.log(newShapes);
      } else if (inputs[0] === "p" && inputs.length >= 3) {
        const coordinates = [];
        for (let j = 1; j < inputs.length; j++) {
          const coordinate = inputs[j].split(",");
          const x = parseFloat(coordinate[0]);
          const y = parseFloat(coordinate[1]);
          coordinates.push([x, y]);
        }

        //console.log(coordinates);

        newShapes.push({
          type: "polygon",
          coordinates,
        });
      } else {
        alert(`Invalid shape at line ${i + 1}`);
      }
    }

    setShapes(newShapes);
  };

  // useEffect(() => {
  //   console.log(shapes);
  // }, [shapes]);

  return (
    <div className="App">
      <h1>Coding exercise</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "200px", height: "60px" }}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />

      <svg width="250" height="250">
        {shapes.map((shape, index) => {
          if (shape.type === "circle") {
            return (
              <circle
                key={index}
                cx={shape.cx}
                cy={shape.cy}
                r={shape.radius}
                stroke="black"
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            );
          } else if (shape.type === "rectangle") {
            return (
              <rect
                key={index}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                stroke="black"
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            );
          } else if (shape.type === "polygon") {
            const points = shape.coordinates
              .map((coordinate) => coordinate.join(","))
              .join(" ");
            return (
              <polygon
                key={index}
                points={points}
                stroke="black"
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            );
          } else {
            return null;
          }
        })}
      </svg>
    </div>
  );
}

export default App;
