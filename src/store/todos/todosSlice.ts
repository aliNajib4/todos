import { createSlice } from "@reduxjs/toolkit";
import { TTodo, TLoading } from "../../types/index";
import actAddTodo from "./act/actAddTodo";
import actGetAllTodos from "./act/actGetAllTodos";
import actRemoveTodo from "./act/actRemoveTodo";
import actToggleActiveTodo from "./act/actToggleActiveTodo";
import actClearCompleted from "./act/actClearCompleted";

type TTodosState = {
  loading: TLoading;
  error: string | null;
  todosFullInfo: TTodo[];
  todos: string[];
};

const initialState: TTodosState = {
  loading: "idle",
  error: null,
  todosFullInfo: [],
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    cleanUp: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    //get all todos
    builder
      .addCase(actGetAllTodos.pending, (state) => {
        state.loading = "pending";
        state.error = null;
        state.todosFullInfo = [];
        state.todos = [];
      })
      .addCase(actGetAllTodos.fulfilled, (state, action) => {
        const { todosFullInfo, todos } = action.payload;
        state.loading = "succeeded";
        state.todos = todos;
        state.todosFullInfo = todosFullInfo;
      })
      .addCase(actGetAllTodos.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? "";
      });
    //add todo
    builder
      .addCase(actAddTodo.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actAddTodo.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.todos = [...state.todos, action.payload.id ?? ""];
        state.todosFullInfo = [...state.todosFullInfo, action.payload];
      })
      .addCase(actAddTodo.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? "";
      });
    //remove todo
    builder
      .addCase(actRemoveTodo.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actRemoveTodo.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.todos = state.todos.filter((id) => id !== action.payload);
        state.todosFullInfo = state.todosFullInfo.filter(
          (t) => t.id !== action.payload,
        );
      })
      .addCase(actRemoveTodo.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? "";
      });
    //toggle active todo
    builder
      .addCase(actToggleActiveTodo.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actToggleActiveTodo.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.todosFullInfo = state.todosFullInfo.map((t) => {
          if (t.id === action.payload) {
            return { ...t, active: !t.active };
          }
          return t;
        });
      })
      .addCase(actToggleActiveTodo.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? "";
      });
    //clear completed todo
    builder
      .addCase(actClearCompleted.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actClearCompleted.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.todos = state.todos.filter((id) => !action.payload.includes(id));
        state.todosFullInfo = state.todosFullInfo.filter(
          (t) => !action.payload.includes(t.id),
        );
      })
      .addCase(actClearCompleted.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? "";
      });
  },
});

export {
  actAddTodo,
  actGetAllTodos,
  actRemoveTodo,
  actClearCompleted,
  actToggleActiveTodo,
};
export const { cleanUp } = todosSlice.actions;
export default todosSlice.reducer;
