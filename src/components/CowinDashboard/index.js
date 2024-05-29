import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByGender from '../VaccinationByGender'

import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccinationData: [],

    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getResponse()
  }

  getResponse = async () => {
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    this.setState({
      apiStatus: apiConstants.inProgress,
    })

    if (response.ok) {
      const data = await response.json()
      const updateData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachData => ({
          vaccinationDate: eachData.vaccination_date,
          dose1: eachData.dose_1,
          dose2: eachData.dose_2,
        })),

        vaccinationByAge: data.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),

        vaccinationByGender: data.vaccination_by_gender.map(genderType => ({
          count: genderType.count,
          gender: genderType.gender,
        })),
      }
      this.setState({
        vaccinationData: updateData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  renderFailure = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure"
        className="failure-image"
      />
      <h1 className="failure">Something Went Wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div data-testid="Loader">
      <Loader height={80} width={80} type="ThreeDots" />
    </div>
  )

  renderVaccination = () => {
    const {vaccinationData} = this.state

    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageDetails={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationByGenderDetails={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          vaccinationByAgeDetails={vaccinationData.vaccinationByAge}
        />
      </>
    )
  }

  renderVaccinationStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderVaccination()
      case apiConstants.inProgress:
        return this.renderLoader()
      case apiConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }
  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="header-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              className="logo"
              alt="website logo"
            />
            <p className="cowin">Co-WIN</p>
          </div>
          <h1 className="heading">CoWIN Vaccination In India</h1>
          {this.renderVaccinationStatus()}
        </div>
      </div>
    )
  }
}
export default CowinDashboard
