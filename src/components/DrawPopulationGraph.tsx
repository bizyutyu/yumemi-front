import React, { useEffect } from 'react'
import Highcharts from 'highcharts'
import axios from 'axios'

type Props = {
  selectedPrefectures: number[]
  prefectureMap: { [key: number]: string }
}

interface PopulationDataItem {
  year: number
  value: number
}

const DrawPopulationGraph: React.FC<Props> = ({
  selectedPrefectures,
  prefectureMap,
}) => {
  const [selectedLabel, setSelectedLabel] = React.useState('総人口')
  useEffect(() => {
    const fetchData = async () => {
      const series = await Promise.all(
        selectedPrefectures.map(async (prefCode) => {
          const response = await axios.get(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
            {
              headers: {
                'X-API-KEY': 'AEWhaI0nG7VlxpJXfpzQr3d9Rmyrr7Z4tESUA3EK',
              },
            }
          )
          const data = response.data.result.data
            .find((d: any) => d.label === selectedLabel)
            .data.map((item: PopulationDataItem) => ({
              year: item.year,
              value: item.value,
            }))
          return {
            name: prefectureMap[prefCode],
            data: data,
          }
        })
      )

      // x軸に使用するyearの配列を生成
      // yearに関しては全てのデータで共通なので、series[0]のデータを使用
      const year = series[0].data.map((item: PopulationDataItem) =>
        item.year.toString()
      )

      Highcharts.chart('container', {
        chart: {
          type: 'line',
        },
        title: {
          text: `${selectedLabel}`,
        },
        xAxis: {
          title: {
            text: '年',
          },
          categories: year,
        },
        yAxis: {
          title: {
            text: '人口数',
          },
        },
        series: series.map((s) => ({
          type: 'line',
          name: s.name,
          data: s.data.map((item: PopulationDataItem) => item.value),
        })), // ここでtypeプロパティを追加
      })
    }

    if (selectedPrefectures.length > 0) {
      fetchData()
    } else {
      Highcharts.chart('container', {
        series: [], // 選択された都道府県がない場合、グラフをクリア
      })
    }
  }, [selectedPrefectures, selectedLabel])

  return (
    <div>
      <div id="container"></div>
      <select
        value={selectedLabel}
        onChange={(e) => setSelectedLabel(e.target.value)}
      >
        <option value="総人口">総人口</option>
        <option value="年少人口">年少人口</option>
        <option value="生産年齢人口">生産年齢人口</option>
        <option value="老年人口">老年人口</option>
      </select>
    </div>
  )
}

export default DrawPopulationGraph
