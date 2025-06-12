import { config } from "../config/app.config.js";

// Custom error class for application errors
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error messages in Ukrainian
const errorMessages = {
  // Authentication errors
  401: "Необхідна авторизація",
  403: "Доступ заборонено",
  404: "Ресурс не знайдено",
  409: "Конфлікт даних",
  422: "Невірні дані",
  500: "Внутрішня помилка сервера",
  
  // Validation errors
  VALIDATION_ERROR: "Помилка валідації",
  INVALID_EMAIL: "Невірний формат email",
  INVALID_PASSWORD: "Невірний формат паролю",
  INVALID_TOKEN: "Невірний токен",
  
  // Database errors
  DUPLICATE_KEY: "Запис вже існує",
  DB_ERROR: "Помилка бази даних",
  
  // File upload errors
  FILE_TOO_LARGE: "Файл занадто великий",
  INVALID_FILE_TYPE: "Невірний тип файлу",
  UPLOAD_ERROR: "Помилка завантаження файлу"
};

// Main error handler middleware
export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || config.errorMessages.serverError;
  const details = err.details || [];

  res.status(status).json({
    success: false,
    status,
    message,
    details: details.length > 0 ? details : undefined,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

// Not found handler
export const notFoundHandler = (req, res, next) => {
  const error = new Error(config.errorMessages.notFound);
  error.status = 404;
  next(error);
};

// Validation error handler
export const validationErrorHandler = (err) => {
  const error = new Error(config.errorMessages.validation);
  error.status = 400;
  error.details = Object.values(err.errors).map(val => val.message);
  return error;
};

// Duplicate key error handler
export const duplicateKeyErrorHandler = (err) => {
  const error = new Error(config.errorMessages.duplicateKey);
  error.status = 409;
  error.details = Object.keys(err.keyValue).map(key => 
    `${key} with value "${err.keyValue[key]}" already exists`
  );
  return error;
};

// JWT error handlers
export const jwtErrorHandler = () => {
  const error = new Error(config.errorMessages.jwtInvalid);
  error.status = 401;
  return error;
};

export const jwtExpiredErrorHandler = () => {
  const error = new Error(config.errorMessages.jwtExpired);
  error.status = 401;
  return error;
};
