import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simula fetch de tareas
export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
    const response = await fetch('/api/todos');
    return response.json();
});

const todosSlice = createSlice({
    name: 'todos',
    initialState: { items: [], status: 'idle' },
    reducers: {
        addTodo: (state, action) => {
            state.items.push({ id: Date.now(), text: action.payload });
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, state => { state.status = 'loading'; })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTodos.rejected, state => {
                state.status = 'failed';
            });
    }
});

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;