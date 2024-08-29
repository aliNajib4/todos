import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { TTodo } from "../../../types";
import { RootState } from "../../store";

const actGetAllTodos = createAsyncThunk(
  "todos/getAllTodos",
  async (_, { getState }) => {
    const {
      auth: { user },
    } = getState() as RootState;
    const q = query(collection(db, "todos"), where("userId", "==", user?.id));
    const querySnapshot = await getDocs(q);
    const todosFullInfo: TTodo[] = [];
    const todos: string[] = [];
    querySnapshot.forEach((doc) => {
      todosFullInfo.push({
        ...(doc.data() as TTodo),
        id: doc.id,
      });
      todos.push(doc.id);
    });
    return { todosFullInfo, todos };
  },
);

export default actGetAllTodos;
