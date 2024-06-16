import "dotenv/config";
import { Server } from "./server";

function main() {
  const port = process.env.PORT || 3001;
  const app = new Server(port);

  app.listen();
}

main();
