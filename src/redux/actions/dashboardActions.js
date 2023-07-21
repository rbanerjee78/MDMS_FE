import { SET_DAILY_DATA, SET_MONTHLY_DATA, SET_OUTAGE_DATA, SET_ONDEMAND_DATA, SET_PERFORMANCE_DATA } from "./types";


// Define action creators
export const setMonthlyData = (data) => ({
  type: SET_MONTHLY_DATA,
  payload: data,
});

export const setDailyData = (data) => ({
  type: SET_DAILY_DATA,
  payload: data,
});

export const setOutageData = (data) => ({
  type: SET_OUTAGE_DATA,
  payload: data,
});

export const setOndemandData = (data) => ({
  type: SET_ONDEMAND_DATA,
  payload: data,
});

export const setPerformanceData = (data) => ({
  type: SET_PERFORMANCE_DATA,
  payload: data,
});