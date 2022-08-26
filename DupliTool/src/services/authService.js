import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth } from "firebase-config";
import { toast } from "react-toastify";

export const register = async (credentials, navigate) => {
  try {
    if(credentials.email && credentials.password) {
    const user = await createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    sessionStorage.setItem("auth_Token", user._tokenResponse.refreshToken);
    toast.success("Signed in sucessfully!")
    navigate("/");
    } else {
        toast.error("Fill all the credentials")  
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUser = async (email, password, navigate) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    sessionStorage.setItem("auth_Token", user._tokenResponse.refreshToken);
    toast.success("Logged in sucessfully!")
    navigate("/");
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = async (navigate) => {
  try {
    await signOut(auth);
    sessionStorage.removeItem("auth_Token");
    toast.success("Logged out sucessfully!")
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
