import * as secp from '@noble/secp256k1';
import createKeccakHash from 'keccak';

let getKeys;

const AsyncFunction = (async () => {}).constructor;

const generateKeys = async (saveKeys, _getKeys) => {
  if(!saveKeys || !_getKeys) {
    throw new Error(`Since this can be run on any machine with node, there is no default secure storage. You will need to provide a saveKeys and getKeys function`);
  }
  
  const privateKeyBytes = secp.utils.randomPrivateKey();
  const privateKey = secp.etc.bytesToHex(privateKeyBytes);
  const pubKeyBytes = secp.getPublicKey(privateKey);
  const pubKey = secp.etc.bytesToHex(pubKeyBytes);

  const keys = {
    privateKey,
    pubKey
  };

  saveKeys && (saveKeys instanceof AsyncFunction ? await saveKeys(keys) : saveKeys(keys));
  sessionless.getKeys = _getKeys;
  return keys;
};

const sign = async (message) => {
  const { privateKey } = await sessionless.getKeys();
  const messageHash = createKeccakHash('keccak256').update(message).digest('hex');
  const signatureAsBigInts = await secp.signAsync(messageHash, privateKey);
  const signature = signatureAsBigInts.toCompactHex();
  return signature;
};

const verifySignature = (signature, message, pubKey) => {
  const messageHash = createKeccakHash('keccak256').update(message).digest('hex');
  const isValid = secp.verify(signature, messageHash, pubKey);
  return isValid;
};

const backupUUID = () => {
  return 'do i need this polyfill?';
};

const generateUUID = () => 'foo';

const associate = (primarySignature, primaryMessage, primaryPublicKey, secondarySignature, secondaryMessage, secondaryPublicKey) => {
  return (verifySignature(primarySignature, primaryMessage, primaryPublicKey) && verifySignature(secondarySignature, secondaryMessage, secondaryPublicKey));
};

const sessionless = {
  generateKeys,
  getKeys,
  sign,
  verifySignature,
  generateUUID,
  associate
};

export default sessionless;
