import { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbase";

function App() {
  
  const [ init, setInit ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(authService.currentUser);
  
  // setInterval(()=> console.log(authService.currentUser) , 2000)
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user)
      } else {
        setIsLoggedIn(user)
      }
      setInit(true)
    });
  }, [])


  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initlalizing..." }
      <footer>&copy; { new Date().getFullYear() } Leowitter </footer>
    </>
  );
}

export default App;
