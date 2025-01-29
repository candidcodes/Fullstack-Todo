import React, { useContext, useEffect } from 'react';
import { UserContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';

const AuthRouter = ({ element }) => {
  const { user, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [isLoading, user, navigate]); // Added all dependencies

  if (isLoading) {
    return <Loading />;
  }

  return user ? element : null; // Ensure no rendering if not authenticated
};

export default AuthRouter;
