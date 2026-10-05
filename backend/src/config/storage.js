// Private document storage configuration for DPDP compliance

export const storageConfig = {
  getPrivateDocumentPath: (documentRef) => {
    // Encrypted vault path, accessible exclusively to authorized admins via presigned / internal tokens
    return `vault/private/${documentRef}`;
  },
  validateDocumentRetention: (registeredDate, retentionYears = 3) => {
    const reg = new Date(registeredDate);
    const now = new Date();
    const diffYears = (now - reg) / (1000 * 60 * 60 * 24 * 365.25);
    return diffYears <= retentionYears;
  }
};
