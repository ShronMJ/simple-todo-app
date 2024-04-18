import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface toDoStateType {
    userId: string,
    userTodo: userTodoItem[]
}
interface userTodoItem {
    itemId: string,
    todo: string,
    isCompleted: boolean
}
const initialState: toDoStateType[] = [
    {
        userId: 'uY5isSOu29bra2lZMIWyapLoquy2',
        userTodo: [
            { itemId: 'item-1', todo: 'Wake up', isCompleted: true },
            { itemId: 'item-2', todo: 'Wash face', isCompleted: false }
        ]
    },
]

export const toDoSlice = createSlice({
    name: 'toDo',
    initialState,
    reducers: {
        newUser: (state, action: PayloadAction<{ userId: string }>) => {
            const { userId } = action.payload
            const newUser = {
                userId: userId,
                userTodo: [
                    { itemId: 'item-1', todo: 'Wake up', isCompleted: true },
                    { itemId: 'item-2', todo: 'Wash face', isCompleted: false }
                ]
            };
            return [...state, newUser]
        },
        sortToDo: (state, action: PayloadAction<toDoStateType>) => {
            const { userId, userTodo } = action.payload;
            const user = state.find(user => user.userId === userId);
            if (user) {
                const updatedUser = {
                    ...user,
                    userTodo: userTodo
                }
                return state.map(u => u.userId === userId ? updatedUser : u)
            } else throw new Error("No existing user found");
        },
        addToDo: (state, action: PayloadAction<{ userId: string, todo: userTodoItem }>) => {
            const { userId, todo } = action.payload;
            const user = state.find(u => u.userId === userId);
            if (user) {
                const updatedUser = {
                    ...user,
                    userTodo: [...user.userTodo, todo]
                }
                return state.map(u => u.userId === userId ? updatedUser : u)
            } else throw new Error("No existing user found");
        },
        deleteToDo: (state, action: PayloadAction<{ userId: string, itemId: string }>) => {
            const { userId, itemId } = action.payload;
            const user = state.find(u => u.userId === userId);
            if (user) {
                const updatedUser = {
                    ...user,
                    userTodo: user.userTodo.filter(item => item.itemId !== itemId)
                }
                return state.map(u => u.userId === userId ? updatedUser : u);
            } else throw new Error("No existing user found");
        },
        editToDo: (state, action: PayloadAction<{ userId: string, todo: userTodoItem }>) => {
            const { userId, todo: newTodo } = action.payload;
            const user = state.find(user => user.userId === userId);
            if (user) {
                const item = user.userTodo.find(currentTodo => currentTodo.itemId === newTodo.itemId);
                if (item) {
                    const updatedUser = {
                        ...user,
                        userTodo: user.userTodo.map(item => {
                            if (item.itemId === newTodo.itemId) return newTodo;
                            else return item;
                        })
                    }
                    return state.map(u => u.userId === userId ? updatedUser : u);
                }
            } else throw new Error("No existing user found");
            return state;
        }
    }
})

export const { addToDo, deleteToDo, editToDo, sortToDo, newUser } = toDoSlice.actions;
export const toDoReducer = toDoSlice.reducer;