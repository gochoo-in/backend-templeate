import express from "express";
import * as http from 'http';
import { StatusCodes } from "http-status-codes";
import Config from "./config/index.js";
import logger from "./config/logger.js";
import allV1Routes from './v1/routes/index.js';
import { connectMongoDB, checkMongoDBDatabaseHealth } from "./config/db/mongo.js";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { cookieManager } from "./utils/middleware.js";
import cors from 'cors';
import expressListEndpoints from 'express-list-endpoints';

dotenv.config();
const { port } = Config;

const app = express();
const httpServer = http.Server;

app.use(express.json());
app.use(cookieParser());
app.use(cookieManager);
// app.use(trackUserActivity);

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true, 
}));


app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json("API Testing SuccessFull!!");
});

app.get('/health', async (req, res) => {
  const healthStatus = await checkSqlDatabaseHealth();
  if (healthStatus.status === 'healthy') {
    res.status(StatusCodes.OK).json(healthStatus);
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(healthStatus);
  }
});

app.get('/health/mongo', async (req, res) => {
  const healthStatus = await checkMongoDBDatabaseHealth();
  if (healthStatus.status === 'healthy') {
    res.status(StatusCodes.OK).json(healthStatus);
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(healthStatus);
  }
});


app.get('/endpoints', (req, res) => {
  const endpoints = expressListEndpoints(app);  
  res.status(StatusCodes.OK).json({ endpoints });
});
app.use('/api/v1', allV1Routes);


// Error handling middleware
app.use((req, res, next) => {
  const error = new Error("Invalid request");
  res.status(StatusCodes.NOT_FOUND);
  next(error);
});

app.use((error, req, res, next) => {
  if (req.expiredToken) {
    delete req.headers.authorization;
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Your token has been removed. Please log in again.",
    });
  }
  res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR);
  return res.json({ message: error.message });
});

// Start server function
async function startServer() {
  try {
    const server = app.listen(port, '0.0.0.0', () => {
      logger.info(`Listening on port ${port}`);
    });
    await connectMongoDB();

    // Error handling for EADDRINUSE
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        logger.error(`Port ${port} is already in use. Please choose another port.`);
      } else {
        logger.error("An error occurred:", error);
      }
      setTimeout(() => process.exit(1), 1000);
    });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.message);
      setTimeout(() => process.exit(1), 1000);
    }
  }
}

// Start the server
startServer();

const exitHandler = () => {
  if (httpServer) {
    httpServer.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
