// openapi-typescript.js
const { exec } = require("child_process");

console.log("Generating types from OpenAPI spec...");

exec(
  "npx openapi-typescript swagger.yml --output src/types/api.ts",
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing openapi-typescript: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`openapi-typescript stderr: ${stderr}`);
      // continue because it might be warnings
    }
    console.log(`openapi-typescript stdout: ${stdout}`);
    console.log("API types generated successfully in src/types/api.ts");
  }
);
