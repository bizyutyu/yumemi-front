import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import axios from 'axios'
import layoutStyles from './layout.module.css'

type Props = {
  selectedPrefectures: number[]
  setSelectedPrefectures: Dispatch<SetStateAction<number[]>>
  prefectureMap: { [key: number]: string }
  setPrefectureMap: Dispatch<SetStateAction<{ [key: number]: string }>>
}

const PrefectureCheckboxes: React.FC<Props> = ({
  setSelectedPrefectures,
  setPrefectureMap,
}) => {
  const [prefectures, setPrefectures] = useState([])

  // 画面読み込みで発火する都道府県一覧取得表示処理
  useEffect(() => {
    const fetchPrefectures = async () => {
      const response = await axios.get(
        'https://opendata.resas-portal.go.jp/api/v1/prefectures',
        {
          headers: { 'X-API-KEY': 'AEWhaI0nG7VlxpJXfpzQr3d9Rmyrr7Z4tESUA3EK' },
        }
      )
      setPrefectures(response.data.result)

      // 都道府県コードと都道府県名のマップを作成
      setPrefectures(response.data.result)
      const newPrefectureMap = response.data.result.reduce(
        (
          map: { [key: number]: string },
          prefecture: { prefCode: number; prefName: string }
        ) => {
          map[prefecture.prefCode] = prefecture.prefName
          return map
        },
        {}
      )
      setPrefectureMap(newPrefectureMap)
    }

    fetchPrefectures()
  }, [])

  const handleCheckboxChange = (prefCode: number) => {
    setSelectedPrefectures((prev) => {
      if (prev.includes(prefCode)) {
        return prev.filter((code) => code !== prefCode) // チェックを外した場合、配列から削除
      } else {
        return [...prev, prefCode] // チェックした場合、配列に追加
      }
    })
  }

  return (
    <div className={layoutStyles.checkBox}>
      {prefectures.map((prefecture: { prefCode: number; prefName: string }) => (
        <div key={prefecture.prefCode}>
          <input
            type="checkbox"
            id={`pref-${prefecture.prefCode}`}
            name="prefecture"
            value={prefecture.prefCode}
            onChange={() => handleCheckboxChange(prefecture.prefCode)}
          />
          <label htmlFor={`pref-${prefecture.prefCode}`}>
            {prefecture.prefName}
          </label>
        </div>
      ))}
    </div>
  )
}

export default PrefectureCheckboxes
