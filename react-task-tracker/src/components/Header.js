import PropTypes from 'prop-types'
import Button from './Button'
const Header = ({title,onAddNew,showAdd}) => {
  return (
    <header className='header'>
        <h1>{title}</h1> 
        <Button color={showAdd ? 'red' : 'green'} text={showAdd?'close': 'add'} onClick={onAddNew}/>
    </header>
  ) 
}
Header.defaultProps={
  title: 'Task-Tracker',
}
Header.propTypes={
  title: PropTypes.string.isRequired,
}
// CSS IN JS
// const headingstyle={
//   color : 'red',
//   backgroundColor :'blue',
// }
export default Header