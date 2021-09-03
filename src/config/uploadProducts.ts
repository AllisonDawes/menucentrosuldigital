import path from "path";
import multer from "multer";
import crypto from "crypto";

const productsFolder = path.resolve(__dirname, "..", "..", "products");

export default {
  directory: productsFolder,

  storage: multer.diskStorage({
    destination: productsFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
