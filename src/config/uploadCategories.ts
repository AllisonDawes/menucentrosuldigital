import path from "path";
import multer from "multer";
import crypto from "crypto";

const categoriesFolder = path.resolve(__dirname, "..", "..", "categories");

export default {
  directory: categoriesFolder,

  storage: multer.diskStorage({
    destination: categoriesFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
