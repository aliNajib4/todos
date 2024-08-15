import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { doc, writeBatch } from "firebase/firestore";
import { db } from "../../../firebase/config";

const actClearCompleted = createAsyncThunk(
  "todos/clearCompleted",
  async (_, { getState }) => {
    const {
      todos: { todosFullInfo },
    } = getState() as RootState;
    const idsActiveTodos = todosFullInfo.map((t) => (!t.active ? t.id : null));

    const batch = writeBatch(db);
    idsActiveTodos.forEach((id) => {
      if (id) {
        const docRef = doc(db, "todos", id); // Replace 'products' with your collection name
        batch.delete(docRef);
      }
    });
    await batch.commit();
    return idsActiveTodos;
  },
);

export default actClearCompleted;
