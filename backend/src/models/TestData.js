import mongoose from "mongoose";

const TestData = mongoose.model(
  "TestData",
  new mongoose.Schema(
    {},
    {
      strict: false,
      collection: "testdata",
      timestamps: true,
    }
  )
);

export default TestData;