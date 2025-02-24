import './App.css'
import {useEffect, useState} from 'react';
import {Button, Input, Tooltip} from "antd";

const Exercise = ({exercise} : {exercise: {text : string, solutions : [{values: string, explanation: string}]}}) => {
  const parts = exercise.text.split('[fillText]');
  const defaultArray = Array(parts.length - 1).fill(null);
  const [inputs, setInputs] = useState(defaultArray);
  const [toolTips, setTooltips] = useState(defaultArray);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
      setInputs(defaultArray);
      setTooltips(defaultArray);
      setScore(null)
  }, [exercise]);

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const isSolutionCorrect = (userInput, solutions) => {
      return userInput?.length> 0 && solutions.includes(userInput.toLowerCase())
    }

  const validateExercise = () => {
      const newToolTips = [...defaultArray];
      let mistakes = 0;
      exercise.solutions.forEach((solution, index) => {
          if (!isSolutionCorrect(inputs[index],solution.values)) {
              newToolTips[index] = "[" + solution.values + "] - " + solution.explanation;
              mistakes++;
          }
      });
      const score = (1 - (mistakes/defaultArray.length)) * 100
      setScore(parseFloat(score.toFixed(2)));
      setTooltips(newToolTips);
  };

  const setBorderColor = (index: number) => {
      return toolTips[index]?.length > 0 ? 'red' : inputs[index]?.length > 0 && score!=null? 'green' : 'black'
  }

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
                                    style = {{borderColor: setBorderColor(index)}}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                />
                                {toolTips[index]?.length > 0 && (
                                    <Tooltip title={toolTips[index]}>
                                        <span className="tooltipIcon">ℹ️</span>
                                    </Tooltip>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
            <Button className="validateButton" onClick={validateExercise}>Check Solution</Button>
            {score!==null && <div className="scoreDisplay" style={{color: score<60 ? 'red' : score < 80? 'orange' : 'green'}}> Your score is {score} % </div>}
        </div>
    );
};

export default Exercise;