import { createSlice } from "@reduxjs/toolkit";

export const pageSlicer = createSlice({
  name: "pageSelected",
  initialState: {
    value: "Entrar"
  },
  reducers: {
    changePage: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const {changePage} = pageSlicer.actions;

export default pageSlicer.reducer;