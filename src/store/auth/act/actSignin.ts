import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

type TInput = { email: string; password: string };

const actSignin = createAsyncThunk(
  "auth/signin",
  async ({ email, password }: TInput) => {
    await signInWithEmailAndPassword(auth, email, password);
  },
);

export default actSignin;
