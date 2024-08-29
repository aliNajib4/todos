import { createAsyncThunk } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";

const actSignout = createAsyncThunk("auth/signout", async () => {
  await signOut(auth);
});

export default actSignout;
