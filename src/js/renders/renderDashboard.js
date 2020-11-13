import { getDBdata } from '../db'
import { addDashboardListener } from '../listeners'

export const renderDashboard = () => {

  const dashboard = document.querySelector('.dashboard')

  const genres = getDBdata('genres') ?? []

  const genresOptionsList = genres
    .map(genre => {
      return `<option value="${genre}">${genre}</option>`
    }).join('')

  const dashboardContent = `
        <div class="dashboard-select">
        <select class="custom-select">
          <option selected>select genre</option>
          ${genresOptionsList}
        </select>
      </div>

      <div class="dashboard-view">
        <div class="view-text">view as:</div>
        <div class="svg-icon grid-dark" data-layout="grid"></div>
        <div class="svg-icon list-gray" data-layout="list"></div>
      </div>
  `

  dashboard.innerHTML = ''
  dashboard.innerHTML = dashboardContent

  addDashboardListener()
}