import crypto from "crypto";

function generateStringId() {
  return crypto.randomBytes(16).toString("hex");
}

export default generateStringId;
