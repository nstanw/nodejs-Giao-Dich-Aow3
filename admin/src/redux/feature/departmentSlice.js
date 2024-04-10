import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Services from "../../apiServices/staffServices";

//crate thunk get staff
export const axiosGetDepartment = createAsyncThunk(
  "AXIOS/GET_DEPARTMENT",
  async () => {
    const response = await Services.getInfor("departments");
    return response;
  }
);

export const axiosGetDeptID = createAsyncThunk(
  "AXIOS/GET_DeptID",
  async (deptID) => {
    const response = await Services.getInfor(`departments/${deptID}`);
    return response;
  }
);

const DepartmentSlice = createSlice({
  name: "AXIOS",
  initialState: {
    listDepartment: {
      isError: false,
      listDepartment: [],
      errorMess: null,
    },
    listDeptID : {
      isError: false,
      listStaffDepartment: [],
      errorMess: null,
    }
  },
  reducers: {},
  extraReducers: {
    [axiosGetDepartment.fulfilled]: (state, action) => {
      state.listDepartment = {
        isError: false,
        listDepartment: action.payload,
        errorMess: null,
      };
    },
    [axiosGetDepartment.rejected]: (state, action) => {
      state.listDepartment = {
        isError: true,
        errorMess: action.error.message,
        
      };
    },
    //get departmentstaff
    [axiosGetDeptID.fulfilled]: (state, action) => {
      state.listDeptID = {
        isError: false,
        listStaffDepartment: action.payload,
        errorMess: null,
      };
    },
    [axiosGetDeptID.rejected]: (state, action) => {
      state.listDeptID = {
        isError: true,
        errorMess: action.error.message,
        
      };
    },
  },
});

export const { reducer: axiosDepartment} = DepartmentSlice;
export default axiosDepartment;