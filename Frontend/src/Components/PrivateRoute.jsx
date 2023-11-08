import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'; // Navigate is an component 
// Outlet is nothing but if user is authenticate the call / render its child component 

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to='/login' />;
}

//Condition ? TRUE Work : False work 