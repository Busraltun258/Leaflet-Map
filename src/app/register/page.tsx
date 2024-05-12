"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase-config";
import RegisterCard from "@/components/RegisterCard";
import { SignUpData } from "@/components/types";


const Register = () => {
  const router = useRouter();

  const handleSignUp = async (data: SignUpData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push("/login");
    } catch (error: unknown) {  
      const firebaseError = error as { message: string };
      console.error("Registration error:", firebaseError.message);
      alert(firebaseError.message);  
    }
  };

  return (
    <div>
      <RegisterCard handleSignUp={handleSignUp} />
    </div>
  );
};

export default Register;


