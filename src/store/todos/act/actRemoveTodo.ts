import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const actRemoveTodo = createAsyncThunk(
  "todos/removeTodo",
  async (id: string) => {
    await deleteDoc(doc(db, "todos", id));

    return id;
  },
);

export default actRemoveTodo;
