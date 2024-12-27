import { Button } from '@chakra-ui/react';
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast';

const OathGoogle = () => {
  const [user, setUser] = useRecoilState(userAtom);  
  const showToast = useShowToast(); 
  const auth = getAuth(app);

  const handlegoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const res = await fetch("https://project-backend-six.vercel.app/api/users/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: googleResponse.user.displayName,
          email: googleResponse.user.email,
          phone: googleResponse.user.phoneNumber,
        }),
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      showToast("Error", error.message, "error"); 
    }
  };

  return (
    <Button
      variant={'outline'}
      leftIcon={<FcGoogle />}
      size={'sm'}
      color={"1A202C"}
      onClick={handlegoogleLogin}
    >
      Masuk dengan Google
    </Button>
  );
};

export default OathGoogle;
