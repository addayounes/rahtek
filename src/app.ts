import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import compressFilter from "./utils/compressFilter.util";
import { mainRouter } from "./routes/v1";
import { errorHandler } from "./middleware/errorHandler";
import config from "./config/config";
import authLimiter from "./middleware/authLimiter";
import { xssMiddleware } from "./middleware/xssMiddleware";
import passport from "passport";
import "./utils/passport";

const app: Express = express();

// Helmet is used to secure this app by configuring the http-header
app.use(helmet());

// Initialize Passport
app.use(passport.initialize());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(xssMiddleware());

app.use(cookieParser());

// Compression is used to reduce the size of the response body
app.use(compression({ filter: compressFilter }));

app.use(
  cors({
    // origin is given a array if we want to have multiple origins later
    origin: "*",
    credentials: true,
  })
);

if (config.node_env === "production") {
  app.use("/api/v1/auth", authLimiter);
}

app.use("/api/v1", mainRouter);

app.all("*", (_req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.use(errorHandler);

export default app;
