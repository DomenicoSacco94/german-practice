import { useEffect, useState } from 'react'
import './App.css'
import { Select } from 'antd'
import Exercise from "./Excercise.tsx";

const { Option } = Select

function App() {
  const [exerciseNum, setExerciseNum] = useState(0);
  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    fetch('/exercises/exercises.json')
      .then(response => response.json())
      .then(data => setExercises(data))
      .catch(error => console.error('Error fetching exercises:', error))
  }, [])

  const handleChange = (value: number) => {
    setExerciseNum(value)
  }

  return (
    <div className="main">
      <div className="exerciseHeader">
        {exercises && (
          <>
            <h1>{exercises.description}</h1>
            <Select defaultValue={0} style={{ width: 120 }} onChange={handleChange}>
              {exercises.exercises.map((_, index) => (
                <Option key={_.toString()} value={index}>
                  Exercise {index + 1}
                </Option>
              ))}
            </Select>
          </>
        )}
      </div>
      <div className="exerciseCanvas">
        {exercises && (
           <Exercise exercise={exercises.exercises[exerciseNum]} />
        )}
      </div>
    </div>
  )
}

export default App