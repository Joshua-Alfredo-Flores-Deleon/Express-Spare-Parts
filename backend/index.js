//Importando app
import app from "./app.js"

import "./database.js";

async function main() {
  app.listen(4000);
  console.log("Guardado on port 4000");
}

main();