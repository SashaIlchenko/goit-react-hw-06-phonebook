import { createSlice, nanoid } from "@reduxjs/toolkit";

export const valueSlice = createSlice({
    name: 'Value',
    initialState: {
        contacts: [],
        filter: "",
    },
    reducers: {
        add(state, action) {
            const variable = state.contacts.find(
                contact => contact.name.toLowerCase() === action.payload.name.toLowerCase(),
            );
            if (variable) {
                alert(`${action.payload.name} is already in contacts`);
                return state;
            }
            state.contacts.push(action.payload);
        },
        prepare(text, number) {
            return {
                payload: {
                    name: text,
                    number: number,
                    id: nanoid(),
                },
            };
        },

        deleteValue(state, action) {
            const index = state.contacts.findIndex(contact => contact.id === action.payload);
            state.contacts.splice(index, 1);
        },
        filter(state, action) {
            state.filter = action.payload;

        },
    },

});

export const { add, deleteValue, filter } = valueSlice.actions;
export const ValueReducer = valueSlice.reducer;


