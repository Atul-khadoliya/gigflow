import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";



app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});


connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT);
