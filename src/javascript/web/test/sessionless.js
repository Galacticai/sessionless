import { webcrypto } from 'node:crypto';
if (!globalThis.crypto) globalThis.crypto = webcrypto;

const { should } = await import('chai');
import sessionless from '../sessionless.js';
import * as secp from '@noble/secp256k1';
//secp.etc.hmacSha256Sync = () => {};

console.log(sessionless);

/*let should;
let sessionless;

before(async () => {
  const chai = await import('chai');
  should = chai.should;
  sessionless = await import('../sessionless.js');
  should();
});*/

should();

let keys;

const message = 'foo bar baz';

const generateNewKeys = async () => {
  return await sessionless.generateKeys((keysToSave) => {
    keys = keysToSave;
  }, () => {
    return keys;
  });
};

it('should generate keys', async () => {
  keys = await generateNewKeys();

  keys.pubKey.should.be.a('string');
  keys.privateKey.should.be.a('string');
});

it('should get keys', async () => {
  keys = await generateNewKeys();
  const storedKeys = await sessionless.getKeys();

  storedKeys.pubKey.should.be.a('string');
  storedKeys.privateKey.should.be.a('string');
});


it('should sign a message', async () => {
  keys = await generateNewKeys();
  const signature = await sessionless.sign(message);

  signature.should.be.a('string');
});

it('should verify a signature', async () => {
  keys = await generateNewKeys();
  const signature = await sessionless.sign(message);

  const verified = await sessionless.verifySignature(signature, message, keys.pubKey);

  verified.should.be.true;
});

it('should reject a bad signature', async () => {
  keys = await generateNewKeys();
  const signature = await sessionless.sign('One message');

  const verified = await sessionless.verifySignature(signature, 'A different message', keys.pubKey);

  verified.should.be.false;
});

it('should generate a uuid', async () => {
  
  const uuid = await sessionless.generateUUID();

  uuid.should.be.a('string');
});

it('should associate', async () => {
  keys = await generateNewKeys();
  const signature1 = await sessionless.sign(message);
  const pubKey1 = keys.pubKey;

  keys = await generateNewKeys();
  const signature2 = await sessionless.sign(message);
  const pubKey2 = keys.pubKey;

  const shouldAssociate = await sessionless.associate(signature1, message, pubKey1, signature2, message, pubKey2);

  shouldAssociate.should.be.true;
});

