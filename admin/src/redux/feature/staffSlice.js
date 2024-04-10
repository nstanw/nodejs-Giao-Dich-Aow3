import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as staffServices from "../../apiServices/staffServices";

//crate thunk get staff
export const axiosGetListStaff = createAsyncThunk(
  "AXIOS/GET_LISTSTAFF",
  async () => {
    const response = await staffServices.getInfor("staffs");
    return response;
  }
);

export const axiosPostStaff = createAsyncThunk(
  "AXIOS/POST_AXIOS",
  async (data) => {
    const response = await staffServices.PostData("staffs", data);
    return response;
  }
);

export const axiosDeleteStaff = createAsyncThunk(
  "AXIOS/DELETE_AXIOS",
  async (data) => {
    const response = await staffServices.deleteData("staffs/" + data);
    return response;
  }
);

const staffSlice = createSlice({
  name: "AXIOS",
  initialState: {
    listStaff: {
      isError: false,
      listStaff: [],
      errorMess: null,
      isLoading: false,
    },
    addStaff: {
      isError: false,
      addStaff: [],
      errorMess: null,
    },
  },
  reducers: {},
  extraReducers: {
    [axiosGetListStaff.fulfilled]: (state, action) => {
      state.listStaff = {
        isLoading: false,
        isError: false,
        listStaff: action.payload,
        errorMess: null,
      };
    },
    [axiosGetListStaff.rejected]: (state, action) => {
      state.listStaff = {
        isError: true,
        errorMess: action.error.message,
      };
    },
    [axiosGetListStaff.pending]: (state, action) => {
      state.listStaff = {
        isLoading: true,
        isError: false,
        listStaff: [],
      };
    },
    //add staff
    [axiosPostStaff.fulfilled]: (state, action) => {
      state.addStaff = {
        isError: false,
        addStaff: action.payload,
        errorMess: null,
      };
      state.listStaff.listStaff.push(action.payload[action.payload.length - 1]);
    },
    [axiosPostStaff.rejected]: (state, action) => {
      state.addStaff = {
        isError: true,
        errorMess: action.error.message,
      };
    },

    //delete staff
    [axiosPostStaff.fulfilled]: (state, action) => {
      state.listStaff.listStaff = action.payload;
    },
    [axiosPostStaff.rejected]: (state, action) => {
      // state.addStaff = {
      //   isError: true,
      //   errorMess: action.error.message,
      // };
    },
  },
});

export const { reducer: axiosStaff } = staffSlice;
export default axiosStaff;
