import crypto from "crypto";

function getCryptoHash256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function findHashWithPrefix(prefix: string) {
  let i = 0;
  while (true) {
    const input = String(i);
    const hash = getCryptoHash256(input);
    if (hash.startsWith(prefix)) {
      return { input, hash };
    }
    i++;
  }
}

const prefix = "0000";
const result = findHashWithPrefix(prefix);
console.log(`Input is: ${result.input}`);
console.log(`Output hash is: ${result.hash}`);
