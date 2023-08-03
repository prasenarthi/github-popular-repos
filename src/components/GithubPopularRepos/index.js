import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    apiStatus: apiStatusConstants.initial,
    activeBtn: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepoData()
  }

  getRepoData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeBtn} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeBtn}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const fetchedData = data.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        name: eachRepo.name,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))
      this.setState({
        reposList: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateActiveBtn = id => {
    this.setState({activeBtn: id}, this.getRepoData)
  }

  renderLoadingView = () => (
    <div id="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure"
      />
    </div>
  )

  renderRepositoryItem = () => {
    const {reposList} = this.state
    return (
      <ul className="repository-item-ul">
        {reposList.map(eachRepo => (
          <RepositoryItem eachRepo={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderRepositoryItemView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryItem()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="github-popular-repos">
        <div className="gpr-container">
          <h1 className="gpr-heading">Popular</h1>
          <ul className="language-filter-item-ul">
            {languageFiltersData.map(eachItem => (
              <LanguageFilterItem
                eachItem={eachItem}
                key={eachItem.id}
                updateActiveBtn={this.updateActiveBtn}
              />
            ))}
          </ul>
          {this.renderRepositoryItemView()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
