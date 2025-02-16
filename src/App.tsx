import { useEffect, useState } from 'react'
import './App.css'
import { Select } from 'antd'
import Exercise from "./Excercise.tsx";

const { Option } = Select

const exerciseTypesOptions = ['prepositions', 'declesions']

function App() {
  const [exerciseNum, setExerciseNum] = useState(0);
  const [exercises, setExercises] = useState(null);
  const [exerciseType, setExerciseType] = useState(exerciseTypesOptions[0]);

  useEffect(() => {
    fetch(`/german-practice/exercises/exercises-${exerciseType}.json`)
      .then(response => response.json())
      .then(data => setExercises(data))
      .catch(error => console.error('Error fetching exercises:', error))
  }, [exerciseType])

  const handleExerciseNumChange = (value: number) => {
    setExerciseNum(value)
  }

  const handleExerciseTypeChange = (value: string) => {
    setExerciseType(value)
  }

  if(!exercises) {
      return <div> Error - no exercises found </div>
  }

  return (
    <div className="main">
      <div className="exerciseHeader">
            <h1>{exercises.description}</h1>
      </div>
      <div className="exerciseSelectors">
          <Select className="exerciseSelector" defaultValue={exerciseTypesOptions[0]} onChange={handleExerciseTypeChange}>
              <>
                  {exerciseTypesOptions.map((exerciseType) => (
                      <Option key={exerciseType} value={exerciseType}>
                          Topic: {exerciseType}
                      </Option>
                  ))}
              </>
          </Select>
          <Select className="exerciseSelector" defaultValue={0} onChange={handleExerciseNumChange}>
              {exercises.exercises.map((exercise, index) => (
                  <Option key={index} value={index}>
                      {exercise.title}
                  </Option>
              ))}
          </Select>
      </div>
      <div className="exerciseCanvas">
          <Exercise exercise={exercises.exercises[exerciseNum]}/>
      </div>
    </div>
  )
}

export default App