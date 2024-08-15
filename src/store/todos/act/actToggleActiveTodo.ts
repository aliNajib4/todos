import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { RootState } from "../../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TTodo } from "../../../types";

const actToggleActiveTodo = createAsyncThunk(
  "todos/toggleActiveTodo",
  async (id: string, { getState }) => {
    const {
      todos: { todosFullInfo },
    } = getState() as RootState;
    const { active } = todosFullInfo.find((t) => t.id === id) as TTodo;
    await updateDoc(doc(db, "todos", id), { active: !active });
    return id;
  },
);

export default actToggleActiveTodo;
