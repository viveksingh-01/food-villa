import { useState } from 'react';
import { Link } from 'react-router-dom';

const Title = () => <h2 className="mx-5 p-3 text-lg font-medium">Food Villa</h2>;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="flex justify-between m-3 p-2 px-3 rounded-md bg-gray-100 bg-gradient-to-b from-white to-gray-100">
      <Title />
      <div className="">
        <ul className="flex space-x-2">
          <li className="p-2">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2">
            <Link to="/instamart">Instamart</Link>
          </li>
          <li className="p-2">
            <Link to="/about">About</Link>
          </li>
          <li className="p-2">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="p-2">Cart</li>
        </ul>
      </div>
      <div className="p-3 mx-5">
        {isLoggedIn ? (
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        ) : (
          <button onClick={() => setIsLoggedIn(true)}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Header;
