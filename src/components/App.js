import { useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "fbase";

function App() {
  
  console.log(authService.currentUser);
  const [ isLoggedIn, setLoggedIn ] = useState(authService.currentUser);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; { new Date().getFullYear() } Leowitter </footer>
    </>
  );
}

export default App;
