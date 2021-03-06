import "reflect-metadata";
import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";

import routes from "./routes";
import uploadConfig from "./config/upload";
import uploadCategoriesConfig from "./config/uploadCategories";
import uploadProductsConfig from "./config/uploadProducts";
import AppError from "./errors/AppError";

import "./database";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use("/files_categories", express.static(uploadCategoriesConfig.directory));
app.use("/files_products", express.static(uploadProductsConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: "error",
    message: "internal server error",
  });
});

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
