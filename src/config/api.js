import Axios from "axios";

export const axios = Axios.create({
  baseURL: 'https://barangay413.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
})