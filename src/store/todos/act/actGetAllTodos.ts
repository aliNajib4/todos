import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { TTodo } from "../../../types";

const actGetAllTodos = createAsyncThunk("todos/getAllTodos", async () => {
  const querySnapshot = await getDocs(collection(db, "todos"));
  const todosFullInfo: TTodo[] = [];
  const todos: string[] = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    todosFullInfo.push({
      ...(doc.data() as TTodo),
      id: doc.id,
    });
    todos.push(doc.id);
  });
  return { todosFullInfo, todos };
});

export default actGetAllTodos;
