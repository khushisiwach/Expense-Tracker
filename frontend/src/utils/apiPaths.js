export const BASE_URL = "https://expense-tracker-rfmq.onrender.com/";

export const API_PATHS = {
  AUTH: {
    LOGIN:"/api/v1/auth/login",
    REGISTER:"/api/v1/auth/register",
    GET_USER_INFO:"/api/v1/auth/getUser",
  },
  DASHBOARD:{
    GET_DATA:"/api/v1/auth/dashboard",
  },
  INCOME:{
    ADD_INCOME:"/api/v1/auth/income/add",
    GET_ALL_INCOME:"/api/v1/auth/income/get",
    DELETE_INCOME: (incomeId) => `/api/v1/auth/income/${incomeId}`,
    DOWNLOAD_INCOME:`api/v1/auth/income/downloadexcel`,
  },
  EXPENSE:{
    ADD_EXPENSE:"/api/v1/auth/expense/add",
    GET_ALL_EXPENSE:"/api/v1/auth/expense/get",
    DELETE_EXPENSE: (expenseId) => `/api/v1/auth/expense/${expenseId}`,
    DOWNLOAD_EXPENSE:`/api/v1/auth/expense/downloadexcel`,
  },
  IMAGE:{
    UPLOAD_IMAGE :"/api/v1/auth/upload-image",
  }
}

  
 



