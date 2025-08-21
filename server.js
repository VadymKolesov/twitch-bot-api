import app from "./app.js";

try {
  app.listen(3000, () => {
    console.log("Server is running. Use our API on port: 3000");
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
