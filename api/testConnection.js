import { db } from "./connect.js";

console.log("Testing database connection...");

// The connect method is called in connect.js, so it should not be called again here.
db.query("SELECT 1", (err, results) => {
  if (err) {
    console.error("Error executing test query:", err.stack);
    process.exit(1);
  }
  console.log("Test query executed successfully:", results);

  db.end((err) => {
    if (err) {
      console.error("Error ending the connection:", err.stack);
      process.exit(1);
    }
    console.log("Connection closed.");
    process.exit(0);
  });
});
