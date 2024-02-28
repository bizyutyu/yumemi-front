import React, { useState } from 'react'
import PrefectureCheckboxes from './PrefectureCheckboxes'
import DrawPopulationGraph from './DrawPopulationGraph'

const ParentComponent: React.FC = () => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([])

  return (
    <div>
      <PrefectureCheckboxes
        selectedPrefectures={selectedPrefectures}
        setSelectedPrefectures={setSelectedPrefectures}
      />
      <DrawPopulationGraph selectedPrefectures={selectedPrefectures} />
    </div>
  )
}

export default ParentComponent
