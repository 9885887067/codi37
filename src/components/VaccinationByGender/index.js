// Write your code here

import {PieChart, Pie, Cell, Legend} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGenderDetails} = props
  return (
    <div className="vaccination-gender">
      <h1 className="gender">Vaccination by gender</h1>
      <PieChart width={1000} height={300}>
        <Pie
          data={vaccinationByGenderDetails}
          cx="70%"
          cy="40%"
          startAngle={180}
          endAngle={0}
          dataKey="count"
          innerRadius="40%"
          outerRadius="70%"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#2d87bb" />
          <Cell name="others" fill="#2cc6c6" />
        </Pie>

        <Legend
          iconType="cicrle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            fontSize: 12,
            fontFamily: 'Roboto',
          }}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
