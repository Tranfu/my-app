import { produce } from "immer";
import {
  ADD_TODO,
  TODOS_FETCH_SUCCEEDED,
  TOGGLE_TODO,
} from "actionTypes/todos";

const initialState = {
  todos: [],
  // allIds: [],
  // byIds: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { todo } = action.payload;
      const nextState = produce(state, (draft) => {
        draft.todos.push(todo);
      });
      return nextState;
    }
    case TODOS_FETCH_SUCCEEDED: {
      const { todos } = action.payload;
      const nextState = produce(state, (draft) => {
        draft.todos = todos;
      });
      return nextState;
    }
    case TOGGLE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            completed: !state.byIds[id].completed,
          },
        },
      };
    }
    default:
      return state;
  }
}
