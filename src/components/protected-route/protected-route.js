import { useEffect, useState } from 'react';

export const ProtectedRoute = ({ element }) => {
  const [isUserLoaded, setUserLoaded] = useState(false);

  // const init = async () => {
  //   await getUser()
  //   setUserLoaded(true)
  // };

  // useEffect(() => {
  //   init();
  // }, []);

  return false ? element : null;
}