import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12
const TAG_LENGTH = 16

function getKey(): Buffer {
  const hex = process.env.SSN_ENCRYPTION_KEY
  if (!hex || hex.length !== 64) {
    throw new Error('SSN_ENCRYPTION_KEY must be a 64-character hex string (32 bytes)')
  }
  return Buffer.from(hex, 'hex')
}

export function encryptSSN(ssn: string): string {
  const stripped = ssn.replace(/\D/g, '')
  if (stripped.length !== 9) {
    throw new Error('SSN must be exactly 9 digits')
  }

  const key = getKey()
  const iv = randomBytes(IV_LENGTH)
  const cipher = createCipheriv(ALGORITHM, key, iv)

  const encrypted = Buffer.concat([cipher.update(stripped, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()

  // Store as: iv + encrypted + tag, base64-encoded
  const combined = Buffer.concat([iv, encrypted, tag])
  return combined.toString('base64')
}

export function decryptSSN(encryptedBase64: string): string {
  const key = getKey()
  const combined = Buffer.from(encryptedBase64, 'base64')

  const iv = combined.subarray(0, IV_LENGTH)
  const tag = combined.subarray(combined.length - TAG_LENGTH)
  const encrypted = combined.subarray(IV_LENGTH, combined.length - TAG_LENGTH)

  const decipher = createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(tag)

  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
  return decrypted.toString('utf8')
}

export function maskSSN(decryptedSSN: string): string {
  return `XXX-XX-${decryptedSSN.slice(-4)}`
}
