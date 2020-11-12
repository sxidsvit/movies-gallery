
export const renderDashboard = () => {

  const dashboard = document.querySelector('.dashboard')

  const dashboardContent = `
        <div class="dashboard-select">
        <select class="custom-select">
          <option selected>select genre</option>
          <option value="1">action</option>
          <option value="2">crime</option>
          <option value="3">USA</option>
        </select>
      </div>

      <div class="dashboard-view">
        <div class="view-text">view as:</div>
        <div class="svg-icon grid-dark" data-layout="grid" ></div>
        <div class="svg-icon list-gray" data-layout="list" ></div>
      </div>
  `

  dashboard.innerHTML = ''
  dashboard.innerHTML = dashboardContent
}