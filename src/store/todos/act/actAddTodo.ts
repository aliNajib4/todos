import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { TTodo } from "../../../types";

const actAddTodo = createAsyncThunk("todos/addTodo", async (todo: TTodo) => {
  const addBookRef = await addDoc(collection(db, "todos"), todo);
  return {
    ...todo,
    id: addBookRef.id,
  };
});

export default actAddTodo;
