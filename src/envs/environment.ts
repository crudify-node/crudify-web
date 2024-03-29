export const BASE_URL = (): string => {
  switch (process.env.REACT_APP_CURRENT_ENV) {
    case "LOCAL":
      return "http://localhost:5000/";
    case "DEVELOPMENT":
      return "https://api-crudify-dev.onrender.com/";
    case "PRODUCTION":
      return "";
    case "default":
      return "http://localhost:5000/";
  }
  return "";
};
