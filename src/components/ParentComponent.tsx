import React, { useState } from 'react'
import PrefectureCheckboxes from './PrefectureCheckboxes'
import DrawPopulationGraph from './DrawPopulationGraph'

const ParentComponent: React.FC = () => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([])
  const [prefectureMap, setPrefectureMap] = useState<{ [key: number]: string }>(
    {}
  ) // prefCodeとprefNameのマップ

  return (
    <div>
      <PrefectureCheckboxes
        selectedPrefectures={selectedPrefectures}
        setSelectedPrefectures={setSelectedPrefectures}
        prefectureMap={prefectureMap}
        setPrefectureMap={setPrefectureMap}
      />
      <DrawPopulationGraph
        selectedPrefectures={selectedPrefectures}
        prefectureMap={prefectureMap}
      />
    </div>
  )
}

export default ParentComponent
