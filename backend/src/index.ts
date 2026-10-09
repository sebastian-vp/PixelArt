import "dotenv/config";

import mongoose from "mongoose";

import app from "#src/app";

const PORT = process.env.PORT || 3001;

mongoose.set("bufferCommands", false);
if (process.env.MONGODB_URI) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch {
    console.error("Could not connect to MongoDB");
    process.exit(1);
  }
} else {
  console.warn("MONGODB_URI is not configured; database operations are unavailable");
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
