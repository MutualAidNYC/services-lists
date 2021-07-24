const Navbar = () => {
  return (
    <div className='nav-container'>
      <div className='nav-logo'></div>
      <div className='nav-list'>
        <ul>
          <li><a href="#">Services</a></li>
          <li><a href="#">Categories</a></li>
          <li><a href="#">Submit New List</a></li>
          <li><a href="#">Organizations</a></li>
          <li><a href="https://mutualaid.nyc/">About</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;