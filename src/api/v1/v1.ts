import axios from "axios";

const host = process.env.REACT_APP_HOST

export const v1 = axios.create({baseURL: `http://${host}:3000/`})
