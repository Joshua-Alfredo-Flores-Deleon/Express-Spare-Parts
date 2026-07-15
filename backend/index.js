//Importando app
import app from "./app.js"

import "./database.js";

async function main() {
  try {
    await app.listen(4000);
    console.log("Guardado on port 4000");
  } catch (error) {
    console.log(error.message);
  }
}

main();