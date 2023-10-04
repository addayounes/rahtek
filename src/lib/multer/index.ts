import multer from "multer";

const m = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, "uploads/");
    },
    filename: (_req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export default m;
