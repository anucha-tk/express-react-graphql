import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "debug",
  format: format.simple(),
  transports: [new transports.Console()],
});
