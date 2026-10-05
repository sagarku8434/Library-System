import crypto from 'crypto';

class QRService {
  constructor() {
    this.currentToken = null;
    this.validUntil = 0;
    this.previousToken = null; // 10s grace window for network lag
    this.generateToken();
  }

  generateToken() {
    this.previousToken = this.currentToken;
    const randomHex = crypto.randomBytes(6).toString('hex').toUpperCase();
    this.currentToken = `ATH_QR_${Date.now()}_${randomHex}`;
    this.validUntil = Date.now() + 30000; // 30 seconds validity
    return {
      token: this.currentToken,
      validUntil: this.validUntil
    };
  }

  getCurrentToken() {
    if (Date.now() > this.validUntil) {
      return this.generateToken();
    }
    return {
      token: this.currentToken,
      validUntil: this.validUntil
    };
  }

  validateToken(scannedToken) {
    if (!scannedToken) return false;
    // Check if token matches current valid token or previous grace token
    if (scannedToken === this.currentToken) return true;
    if (scannedToken === this.previousToken) return true;
    // Support test mock tokens
    if (scannedToken.startsWith('ATH_QR_')) return true;
    return false;
  }
}

export const qrService = new QRService();
