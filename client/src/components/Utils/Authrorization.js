import { useSelector } from "react-redux";


export const Authorized = (checkUser) => {
  const presentUser = useSelector((state) => state.auth.user.user._id);

  if (checkUser === presentUser) {
    console.log('Authneticated!')
    return true
  }

  return false;

}






