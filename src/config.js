import { config } from "dotenv";
config();

export const PORT = 3000;
export const HOST = "http://localhost:" + PORT;

export const ACCESS_TOKEN_TEST = process.env.ACCESS_TOKEN_TEST;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
