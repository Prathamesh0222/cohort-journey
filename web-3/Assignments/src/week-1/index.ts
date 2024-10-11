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

function findHashWithPrefix2(prefix: string, start: string) {
  let i = 0;
  while (true) {
    const input = start + i;
    const hash = getCryptoHash256(input);
    if (hash.startsWith(prefix)) {
      return { input, hash };
    }
    i++;
  }
}

function findNonceForInput(prefix: string, inputString: string) {
  let nonce = 0;
  while (true) {
    const combinedInput = `${inputString}${nonce}`;
    const hash = getCryptoHash256(combinedInput);
    if (hash.startsWith(prefix)) {
      return { nonce, hash };
    }
    nonce++;
  }
}

const prefix = "0000";
const startString = "100xdevs";
const inputString = "harkirat => Raman | Rs 100 Ram => Ankit | Rs 101935085";
const result = findHashWithPrefix(prefix);
const result2 = findHashWithPrefix2(prefix, startString);
const result3 = findNonceForInput(prefix, inputString);
console.log(`Input is: ${result.input}`);
console.log(`Output hash is: ${result.hash}`);
console.log(`Input: ${result2.input}\nOutput: ${result2.hash}`);
console.log(`Nonce: ${result3.nonce}\nOutput Hash: ${result3.hash}`);
