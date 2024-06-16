export const configServer = {
  PORT: process.env.PORT || 3001,
  DB_URI: <string>process.env.DB_URI,
  DEVELOPEMENT_DATABASE_URL: <string>process.env.DEVELOPEMENT_DATABASE_URL,
  JWT_SECRET:
    process.env.JWT_SECRET ||
    "MIICXQIBAAKBgQCSgwP+By4GmUAAlMM7kdbescMSjN/q9fwsjcmoLoPRuTtwl/CzJ7x9+kf63im4zPdejJVNM/",
  REFRESH_JWT_KEY:
    <string>process.env.REFRESH_JWT_KEY ||
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSgwP+By4GmUAAlMM7kdbescMSjN/q9fwsjcmoLoPRuTtwl/CzJ7x9+kf63im4zPdejJVNM/",
};

export const CONFIG_JWT_TIMING = {
  access_token_expireIn: "10m",
  refresh_token_expireIn: "7d",
};

export const isProduction = () => {
  return process.env.NODE_ENV === "production";
};

export const isDevelopmet = () => {
  return process.env.NODE_ENV === "development";
};

export const SUPERADMIN = {
  username: process.env.SUPERADMIN_USERNAME,
  password: process.env.SUPERADMIN_PASSWORD,
  email: process.env.SUPERADMIN_EMAIl,
};
