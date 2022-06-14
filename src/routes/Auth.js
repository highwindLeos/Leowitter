import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Auth = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [newAccount, setNewAccount] = useState(true); // 계정을 위한 state

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
         <div>
            <button>Cuntinue In Google</button>
            <button>Cuntinue In Github</button>
         </div>
      </div>
   )
}

export default Auth;