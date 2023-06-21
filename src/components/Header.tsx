export const Header = () => {
  return (
    <div className='header'>
      <div>test</div>
      <div>test 2</div>
      <div className='headerContent'>
        <p>
          {sessionStorage.getItem('familyName')}, {sessionStorage.getItem('givenName')}
        </p>
      </div>
    </div>
  )
}
