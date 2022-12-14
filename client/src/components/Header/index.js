import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary width-100 text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div className='header'>
          <Link className="text-light" to="/">
            <h1 className="m-0 title">TravelPosts</h1>
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2 navbar" to="/login">
                Login |
              </Link>
              <Link className="btn btn-lg btn-info m-2 navbar" to="/signup">
                Signup
              </Link>
              {/* <Link className="btn btn-lg btn-light m-2" to="/user">
                User Profile
              </Link> */}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
