import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";

const eas = new EAS("0x72E1d8ccf5299fb36fEfD8CC4394B8ef7e98Af92"); // Celo Contract Address
const provider = ethers.getDefaultProvider(
  'https://forno.celo.org'
);
const privateKey=process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider);
eas.connect(signer);

const SCHEMA_UID = "0x1636b2944b2b3a8d9553323543b8b0d4653915ffa4038c5bd18400fbffc368ad"; // Schema #49

// Initialize SchemaEncoder with the schema string
const schemaEncoder = new SchemaEncoder("bytes32 transactionId, string message");

// Variables
const recipient=""
const transactionId=""
const message=""

const encodedData = schemaEncoder.encodeData([
  { name: "transactionId", value: transactionId, type: "bytes32" },
  { name: "message", value: message, type: "string" },
]);


const tx = await eas.attest({
  schema: SCHEMA_UID,
  data: {
    recipient,
    expirationTime: 0,
    revocable: false,
    data: encodedData,
  },
});

const newAttestationUID = await tx.wait();