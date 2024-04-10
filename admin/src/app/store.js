import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import axiosStaff from "../redux/feature/staffSlice";
import { combineReducers } from "redux";
import axiosDepartment from "../redux/feature/departmentSlice";
import axiosStaffsSalary from "../redux/feature/salarySlice";


const rootReducer = combineReducers({
  getSalaryScale: axiosStaffsSalary,
  getStaffs: axiosStaff,
  getDepartment: axiosDepartment,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware().concat(logger)
});
