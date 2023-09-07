import { useContext } from 'react';
import UserContext from '../utils/context/UserContext';

const Footer = () => {
  const { user } = useContext(UserContext);
  return (
    <section className="bg-white p-3 py-5 text-center">
      <h6 className="text-gray-600 text-sm">
        {user.name} - {user.email}
      </h6>
    </section>
  );
};

export default Footer;
