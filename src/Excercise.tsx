import './App.css'
import {useEffect, useState} from 'react';
import {Button, Input, Tooltip} from "antd";

const Exercise = ({exercise} : {exercise: {text : string, solutions : [{text: string, explanation: string}]}}) => {
  const parts = exercise.text.split('[fillText]');
  const defaultArray = Array(parts.length - 1).fill('');
  const [inputs, setInputs] = useState(defaultArray);
  const [toolTips, setTooltips] = useState(defaultArray);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
      const defaultArray = Array(parts.length - 1).fill('');
      setInputs(defaultArray);
      setTooltips(defaultArray);
  }, [exercise]);

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const checkSolution = () => {
      const newToolTips = [...defaultArray];
      let mistakes = 0;
      exercise.solutions.forEach((solution, index) => {
          if (inputs[index].length == 0 || !solution.text.includes(inputs[index])) {
              newToolTips[index] = "[" + solution.text + "] - " + solution.explanation;
              mistakes++;
          }
      });
      setScore((1 - mistakes/defaultArray.length) * 100);
      setTooltips(newToolTips);
  };

  return (
    <div>
      <div>
      {parts.map((part, index) => (
        <div key={index} className="inputContainer">
            <span className="holeText"> {part} </span>
          {index < inputs.length && (
              <>
                  <Input
                      type="text"
                      className="holeInput"
                      value={inputs[index]}
                      style = {{borderColor: toolTips[index].length > 0 ? 'red' : 'black'}}
                      onChange={(e) => handleChange(index, e.target.value)}
                  />
                  {toolTips[index].length > 0 && (
                      <Tooltip title={toolTips[index]}>
                          <span className="tooltipIcon">ℹ️</span>
                      </Tooltip>
                  )}
              </>
          )}
        </div>
      ))}
      </div>
      <Button className="validateButton" onClick={checkSolution}>Check Solution</Button>
      {score!=null && <div className="scoreDisplay" style={{color: score<60 ? 'red' : score < 80? 'yellow' : 'green'}}> Your score is {score} % </div>}
    </div>
  );
};

export default Exercise;