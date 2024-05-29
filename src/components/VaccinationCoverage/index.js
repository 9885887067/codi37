// Write your code here

import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const dataFormatter = num => {
    if (num > 1000) {
      return `{(num/1000).toString()}k`
    }
    return num.toString()
  }

  const {vaccinationCoverageDetails} = props
  return (
    <div className="vaccination-coverage-container">
      <h1 className="vaccination">Vaccination Coverage</h1>
      <BarChart
        data={vaccinationCoverageDetails}
        width={900}
        height={400}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#6c757d',
            strokeWidth: 1.5,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <YAxis
          tickFormatter={dataFormatter}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 1.5,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <Legend
          iconType="rectangle"
          wrapperStyle={{
            paddingTop: 10,
            textAlign: 'center',
            fontSize: 12,
            fontFamily: 'Roboto',
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill="#5a8dee"
          radius={[10, 10, 0.0]}
          barSize="20%"
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          radius={[5, 5, 0.0]}
          barSize="20%"
        />
      </BarChart>
    </div>
  )
}
export default VaccinationCoverage
