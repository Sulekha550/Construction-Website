import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import ContactInquiry from "../models/ContactInquiry.js";
import { createContactInquiry } from "../controllers/contact.controller.js";
import mongoose from "mongoose";

async function runTests() {
  console.log("=== STARTING MONGODB & CONTACT INQUIRY INTEGRATION TESTS ===");

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI not found in backend/.env");
  }

  console.log("1. Connecting to MongoDB Atlas...");
  await connectDB(uri);
  console.log("   ✓ MongoDB connection established.");

  // Helper mock for Express req & res
  const mockReqRes = (body) => {
    const req = {
      body,
      ip: "127.0.0.1",
      headers: {},
      socket: { remoteAddress: "127.0.0.1" },
    };
    let statusCode = 200;
    let jsonResult = null;
    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: (data) => {
        jsonResult = data;
        return res;
      },
    };
    return { req, res, getStatus: () => statusCode, getResult: () => jsonResult };
  };

  // Test 1: Valid submission
  console.log("\n2. Testing valid submission...");
  const validPayload = {
    name: "Rajesh Sharma",
    phone: "+91 9876543210",
    email: "rajesh.sharma@example.com",
    inquiry: "Get a Quote",
    message: "Interested in the luxury residential villa project details.",
  };

  const test1 = mockReqRes(validPayload);
  await createContactInquiry(test1.req, test1.res);

  if (test1.getStatus() !== 201) {
    throw new Error(`Expected 201, got ${test1.getStatus()}: ${JSON.stringify(test1.getResult())}`);
  }
  const resultData = test1.getResult();
  console.log("   ✓ API responded with 201 Created:", resultData.message);
  console.log("   ✓ Saved record ID:", resultData.data.id);

  // Test 2: Verify in MongoDB directly
  console.log("\n3. Verifying document directly in MongoDB Atlas...");
  const dbDoc = await ContactInquiry.findById(resultData.data.id);
  if (!dbDoc) {
    throw new Error("Document was not found in MongoDB!");
  }
  console.log("   ✓ Found document in MongoDB:");
  console.log("     - Name:", dbDoc.name);
  console.log("     - Phone:", dbDoc.phone);
  console.log("     - Email:", dbDoc.email);
  console.log("     - Inquiry:", dbDoc.inquiry);
  console.log("     - Status:", dbDoc.status);
  console.log("     - CreatedAt:", dbDoc.createdAt);

  // Test 3: Validation - Missing name
  console.log("\n4. Testing validation: missing name...");
  const testMissingName = mockReqRes({ ...validPayload, name: "" });
  await createContactInquiry(testMissingName.req, testMissingName.res);
  if (testMissingName.getStatus() !== 400) {
    throw new Error(`Expected 400 for missing name, got ${testMissingName.getStatus()}`);
  }
  console.log("   ✓ Rejected missing name with 400:", testMissingName.getResult().message);

  // Test 4: Validation - Invalid phone
  console.log("\n5. Testing validation: invalid phone...");
  const testInvalidPhone = mockReqRes({ ...validPayload, phone: "123" });
  await createContactInquiry(testInvalidPhone.req, testInvalidPhone.res);
  if (testInvalidPhone.getStatus() !== 400) {
    throw new Error(`Expected 400 for invalid phone, got ${testInvalidPhone.getStatus()}`);
  }
  console.log("   ✓ Rejected invalid phone with 400:", testInvalidPhone.getResult().message);

  // Test 5: Validation - Invalid email format
  console.log("\n6. Testing validation: invalid email format...");
  const testInvalidEmail = mockReqRes({ ...validPayload, email: "not-an-email" });
  await createContactInquiry(testInvalidEmail.req, testInvalidEmail.res);
  if (testInvalidEmail.getStatus() !== 400) {
    throw new Error(`Expected 400 for invalid email, got ${testInvalidEmail.getStatus()}`);
  }
  console.log("   ✓ Rejected invalid email with 400:", testInvalidEmail.getResult().message);

  // Test 6: Validation - Unsupported inquiry category
  console.log("\n7. Testing validation: unsupported inquiry category...");
  const testBadCategory = mockReqRes({ ...validPayload, inquiry: "Unsupported Category" });
  await createContactInquiry(testBadCategory.req, testBadCategory.res);
  if (testBadCategory.getStatus() !== 400) {
    throw new Error(`Expected 400 for bad category, got ${testBadCategory.getStatus()}`);
  }
  console.log("   ✓ Rejected bad category with 400:", testBadCategory.getResult().message);

  // Test 7: Validation - Message too short
  console.log("\n8. Testing validation: message too short...");
  const testShortMsg = mockReqRes({ ...validPayload, message: "Hi" });
  await createContactInquiry(testShortMsg.req, testShortMsg.res);
  if (testShortMsg.getStatus() !== 400) {
    throw new Error(`Expected 400 for short message, got ${testShortMsg.getStatus()}`);
  }
  console.log("   ✓ Rejected short message with 400:", testShortMsg.getResult().message);

  // Cleanup test document
  console.log("\n9. Cleaning up test record from database...");
  await ContactInquiry.findByIdAndDelete(resultData.data.id);
  console.log("   ✓ Test record deleted from MongoDB.");

  await mongoose.disconnect();
  console.log("\n=== ALL TESTS PASSED SUCCESSFULLY! ===");
}

runTests().catch((err) => {
  console.error("TEST FAILED:", err);
  process.exit(1);
});
