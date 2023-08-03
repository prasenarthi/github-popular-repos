import './index.css'

const LanguageFilterItem = props => {
  const {eachItem, updateActiveBtn} = props
  const {id, language} = eachItem

  const handleClick = () => {
    updateActiveBtn(id)
  }

  return (
    <li className="language-filter-item" key={id}>
      <button type="button" className="lfi-btn" onClick={handleClick}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
