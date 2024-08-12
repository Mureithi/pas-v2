import { encode as base64_encode, decode as base64_decode } from 'base-64';
// import { logout } from './form-actions';

/**
 * Encrypts a given text using a salt.
 * @param text The text to encrypt.
 * @param salt The salt used for encryption.
 * @returns The encrypted string or null if an error occurs.
 */
export const encrypt = (text: string, salt: string): string | null => {
  try {
    const base64 = base64_encode(text);
    return encryptGeneric(base64, salt, getLetterFromAlphabetForLetter);
  } catch (err) {
    console.error('Encryption error:', err);
    // logout();
    return null;
  }
};

/**
 * Encrypts a given text using a salt with special characters.
 * @param text The text to encrypt.
 * @param salt The salt used for encryption.
 * @returns The encrypted string or null if an error occurs.
 */
export const encryptSpecial = (text: string, salt: string): string | null => {
  try {
    const base64 = base64_encode(text);
    return encryptGeneric(base64, salt, getLetterFromAlphabetForLetterSpecial);
  } catch (err) {
    console.error('Encryption error:', err);
    // logout();
    return null;
  }
};

/**
 * Encrypts a given ID using a salt.
 * @param text The text to encrypt.
 * @param salt The salt used for encryption.
 * @returns The encrypted string or null if an error occurs.
 */
export const encryptID = (text: string, salt: string): string | null => {
  try {
    if (text && text !== 'pas' && isNaN(parseInt(text))) {
      return text;
    }
    const base64 = base64_encode(text);
    return encryptGeneric(base64, salt, getLetterFromAlphabetForLetterID);
  } catch (err) {
    console.error('Encryption error:', err);
    // logout();
    return null;
  }
};

/**
 * Generic encryption function.
 * @param text The base64 encoded text to encrypt.
 * @param salt The salt used for encryption.
 * @param getLetterFunc The function to get the encrypted letter.
 * @returns The encrypted string or null if an error occurs.
 */
const encryptGeneric = (text: string, salt: string, getLetterFunc: (saltChar: string, char: string) => string | null): string | null => {
  const textArr = text.split('');
  const saltArr = salt.split('');
  let encrypted = '';

  textArr.forEach((char, index) => {
    const saltChar = saltArr[index % saltArr.length];
    const encryptedChar = getLetterFunc(saltChar, char);

    if (encryptedChar) {
      encrypted += encryptedChar;
    } else {
      throw new Error(`Encryption failed: Invalid character ${char}`);
    }
  });

  return encrypted;
};

/**
 * Encrypts a single character using a salt character.
 * @param saltChar The salt character.
 * @param char The character to encrypt.
 * @returns The encrypted character or null if an error occurs.
 */
const getLetterFromAlphabetForLetter = (saltChar: string, char: string): string | null => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=!:,."\'()[]{}<>-_?@#$%^&*`~|\\';
  return getLetterFromAlphabetForLetterGeneric(saltChar, char, alphabet);
};

/**
 * Encrypts a single character using a salt character with special characters.
 * @param saltChar The salt character.
 * @param char The character to encrypt.
 * @returns The encrypted character or null if an error occurs.
 */
const getLetterFromAlphabetForLetterSpecial = (saltChar: string, char: string): string | null => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=!:,."\'()[]{}<>-_?@#$%^&*`~|\\';
  return getLetterFromAlphabetForLetterGeneric(saltChar, char, alphabet + '-•○▪︎∙••・◦●○?“”‘’‛‟″˝–❝❞*');
};

/**
 * Encrypts a single character using a salt character for IDs.
 * @param saltChar The salt character.
 * @param char The character to encrypt.
 * @returns The encrypted character or null if an error occurs.
 */
const getLetterFromAlphabetForLetterID = (saltChar: string, char: string): string | null => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=';
  return getLetterFromAlphabetForLetterGeneric(saltChar, char, alphabet);
};

/**
 * Generic function to get an encrypted letter.
 * @param saltChar The salt character.
 * @param char The character to encrypt.
 * @param alphabet The alphabet used for encryption.
 * @returns The encrypted character or null if an error occurs.
 */
const getLetterFromAlphabetForLetterGeneric = (saltChar: string, char: string, alphabet: string): string | null => {
  const saltPos = alphabet.indexOf(saltChar);
  const charPos = alphabet.indexOf(char);

  if (saltPos === -1 || charPos === -1) {
    console.error(`Invalid character for encryption: ${saltChar} or ${char}`);
    return null;
  }

  const newAlphabet = alphabet.slice(saltPos) + alphabet.slice(0, saltPos);
  return newAlphabet[charPos];
};

/**
 * Decrypts a given text using a salt and an inversion function.
 * @param salt The salt used for decryption.
 * @param text The text to decrypt.
 * @param getInvertedLetterFunc The function to get the decrypted letter.
 * @returns The decrypted string or null if an error occurs.
 */
const decryptGeneric = (salt: string, text: string, getInvertedLetterFunc: (saltChar: string, char: string) => string | null): string | null => {
  try {
    const arr = text.split('');
    const saltArr = salt.split('');
    let decrypted = '';

    arr.forEach((char, index) => {
      const saltChar = saltArr[index % saltArr.length];
      const decryptedChar = getInvertedLetterFunc(saltChar, char);

      if (decryptedChar) {
        decrypted += decryptedChar;
      } else {
        throw new Error(`Decryption failed: Invalid character ${char}`);
      }
    });

    return base64_decode(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    // logout();
    return null;
  }
};

/**
 * Decrypts a given text using a salt.
 * @param salt The salt used for decryption.
 * @param text The text to decrypt.
 * @returns The decrypted string or null if an error occurs.
 */
export const decrypt = (salt: string, text: string): string | null => {
  return decryptGeneric(salt, text, getInvertedLetterFromAlphabetForLetter);
};

/**
 * Decrypts a given text using a salt with special characters.
 * @param salt The salt used for decryption.
 * @param text The text to decrypt.
 * @returns The decrypted string or null if an error occurs.
 */
export const decryptSpecial = (salt: string, text: string): string | null => {
  return decryptGeneric(salt, text, getInvertedLetterFromAlphabetForLetterSpecial);
};

/**
 * Decrypts a given text using a salt for IDs.
 * @param salt The salt used for decryption.
 * @param text The text to decrypt.
 * @returns The decrypted string or null if an error occurs.
 */
export const decryptID = (salt: string, text: string): string | null => {
  return decryptGeneric(salt, text, getInvertedLetterFromAlphabetForLetterID);
};

/**
 * Generic function to get a decrypted letter.
 * @param saltChar The salt character.
 * @param char The character to decrypt.
 * @param alphabet The alphabet used for decryption.
 * @returns The decrypted character or null if an error occurs.
 */
const getInvertedLetterGeneric = (saltChar: string, char: string, alphabet: string): string | null => {
  const saltPos = alphabet.indexOf(saltChar);

  if (saltPos === -1) {
    return null;
  }

  const newAlphabet = alphabet.slice(saltPos) + alphabet.slice(0, saltPos);
  const charPos = newAlphabet.indexOf(char);

  if (charPos === -1) {
    return null;
  }

  return alphabet[charPos];
};

/**
 * Gets the decrypted letter from the alphabet.
 * @param saltChar The salt character.
 * @param char The character to decrypt.
 * @returns The decrypted character or null if an error occurs.
 */
export const getInvertedLetterFromAlphabetForLetter = (saltChar: string, char: string): string | null => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=!:,."\'()[]{}<>-_?@#$%^&*`~|\\';
  return getInvertedLetterGeneric(saltChar, char, alphabet);
};

/**
 * Gets the decrypted letter from the alphabet with special characters.
 * @param saltChar The salt character.
 * @param char The character to decrypt.
 * @returns The decrypted character or null if an error occurs.
 */
export const getInvertedLetterFromAlphabetForLetterSpecial = (saltChar: string, char: string): string | null => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=!:,."\'()[]{}<>-_?@#$%^&*`~|\\';
  return getInvertedLetterGeneric(saltChar, char, alphabet + '-•○▪︎∙••・◦●○?“”‘’‛‟″˝–❝❞*');
};

/**
 * Gets the decrypted letter from the alphabet for IDs.
 * @param saltChar The salt character.
 * @param char The character to decrypt.
 * @returns The decrypted character or null if an error occurs.
 */
export const getInvertedLetterFromAlphabetForLetterID = (saltChar: string, char: string): string | null => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=';
  return getInvertedLetterGeneric(saltChar, char, alphabet);
};
