import { authService } from "fbase";
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import { useState } from "react";

const Auth = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [newAccount, setNewAccount] = useState(true); // 계정을 위한 state
   const [error, setError] = useState(""); // 계정을 위한 state

   const onChange = (event) => {
      const {
         target : { name, value },
      } = event;

      if (name === "email") {
         setEmail(value);
      } else if (name === "password") {
         setPassword(value);
      }

   };

   const onSubmit = async(event) => {
      event.preventDefault();
      try {
         
         let data;
         const auth = getAuth();
         
         if (newAccount) {
            // Create New Account
            data = await createUserWithEmailAndPassword(auth, email, password);
         } else {
            // Log in
            data = await signInWithEmailAndPassword(auth, email, password);
         }
         console.log(data);
      } catch (error) {
         setError(error.message);
      }
   };

   const toggleAccount = () => setNewAccount((prev) => !prev);

   const onSocialClick = async (event) => {
      
      const {
         target : { name },
      } = event;
      
      let provider;
      try {
         if (name === "google") {

            provider = new GoogleAuthProvider();
            const result = await signInWithPopup(authService, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log(result);
            // const token = credential.accessToken;
         } else if (name === "github") {

            provider = new GithubAuthProvider();
            const result = await signInWithPopup(authService, provider);
            const credential = GithubAuthProvider.credentialFromResult(result);
            console.log(result);
            // const token = credential.accessToken;
         }
      } catch (error) {
         console.log(error);
      }
      
   };

   return (
      <div>
         <form onSubmit={onSubmit} >
            <input name="email" type="email" placeholder="E-mail" required value={email} onChange={onChange} />
            <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
            <input type="submit" value={ newAccount ? "Create Account" : "Log In" }/>
         </form>
         <span onClick={toggleAccount} >
            { newAccount ? "Sign In..." : "Create Account" }
         </span>
         <div>
            <button onClick={onSocialClick} name="google">Countinue In Google</button>
            <button onClick={onSocialClick} name="github">Countinue In Github</button>
         </div>
      </div>
   )
}

export default Auth;