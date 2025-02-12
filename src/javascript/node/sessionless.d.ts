export declare const AsyncFunction: (func: () => {}) => void;

export declare interface Keys {
  privateKey: string;
  publicKey: string;
}

export declare const generateKeys: (
  getKeys: () => {},
  saveKeys: () => {},
) => Promise<Keys>;

export declare const getKeys: () => Keys;

export declare const sign: (message: string) => Promise<string>;

export declare const verifySignature: (
  sig: string,
  message: string,
  pubKey: string,
) => boolean;

export declare const generateUUID: () => string;

export declare const associate: (
  primarySignature: string,
  primaryMessage: string,
  primaryPublicKey: string,
  secondarySignature: string,
  secondaryMessage: string,
  secondaryPublicKey: string,
) => boolean;
