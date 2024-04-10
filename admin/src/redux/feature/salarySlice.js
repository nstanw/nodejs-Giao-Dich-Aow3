import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Services from "../../apiServices/staffServices";

//crate thunk get staff
export const axiosGetStaffsSalary = createAsyncThunk(
  "AXIOS/GET_StaffsSalary",
  async () => {
    const response = await Services.getInfor("staffsSalary");
    return response;
  }
);

const StaffsSalarySlice = createSlice({
  name: "AXIOS",
  initialState: {
    listStaffsSalary: {
      isError: false,
      listStaffsSalary: [],
      errorMess: null,
    },
  },
  reducers: {},
  extraReducers: {
    [axiosGetStaffsSalary.fulfilled]: (state, action) => {
      state.listStaffsSalary = {
        isError: false,
        listStaffsSalary: action.payload,
        errorMess: null,
      };
    },
    [axiosGetStaffsSalary.rejected]: (state, action) => {
      state.listStaffsSalary = {
        isError: true,
        errorMess: action.error.message,
        
      };
    },
  },
});

export const { reducer: axiosStaffsSalary} = StaffsSalarySlice;
export default axiosStaffsSalary;