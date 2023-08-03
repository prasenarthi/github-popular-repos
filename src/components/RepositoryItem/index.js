import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  const {id, avatarUrl, starsCount, forksCount, name} = eachRepo
  return (
    <li key={id} className="repository-item">
      <img src={avatarUrl} alt={name} className="image" />
      <h1>{name}</h1>
      <p>
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icons"
        />
        <span className="stars-count">{starsCount}</span>
      </p>
      <p>
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icons"
        />
        <span>{forksCount}</span>
      </p>
    </li>
  )
}

export default RepositoryItem
