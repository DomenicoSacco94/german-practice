import { useEffect, useState } from 'react'
import './App.css'
import { Select } from 'antd'
import Exercise from "./Excercise.tsx";

const { Option } = Select

function App() {
  const [exerciseNum, setExerciseNum] = useState(0);
  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    fetch('/german-practice/exercises/exercises-prepositions.json')
      .then(response => response.json())
      .then(data => setExercises(data))
      .catch(error => console.error('Error fetching exercises:', error))
  }, [])

  const handleExerciseNumChange = (value: number) => {
    setExerciseNum(value)
  }

  return (
    <div className="main">
      <div className="exerciseHeader">
        {exercises && (
          <>
            <h1>{exercises.description}</h1>
            <Select defaultValue={0} onChange={handleExerciseNumChange}>
              {exercises.exercises.map((exercise, index) => (
                <Option key={index} value={index}>
                    {exercise.title}
                </Option>
              ))}
            </Select>
          </>
        )}
      </div>
      <div className="exerciseCanvas">
           <Exercise exercise={exercises.exercises[exerciseNum]} />
      </div>
    </div>
  )
}

export default App