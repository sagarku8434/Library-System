# Athena Library Production Deployment & Operations Guide

This guide details deploying Athena Library into production, configuring merchant payment gateways, and establishing DPDP data protection compliance.

---

## 1. Production Architecture

```
                    https://www.athenalibrary.in
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
     Vercel / Cloudflare                   Node.js Express Backend
     (React 19 Frontend)                   (Render / VPS / AWS EC2)
            │                                     │
            └───────────────┬─────────────────────┘
                            ▼
                     /api Reverse Proxy
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
      MongoDB Atlas     Razorpay API    Private Document
      Cluster (M10+)    (Direct Payout)  S3 Vault (Encrypted)
```

---

## 2. Environment Variables Checklist

### Backend `.env`:
```ini
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/athena_prod?retryWrites=true&w=majority
JWT_SECRET=super_secure_random_64_character_hex_key
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=live_secret_key_from_merchant_dashboard
ADMIN_EMAIL=owner@athenalibrary.in
```

### Frontend `.env`:
```ini
VITE_API_URL=https://api.athenalibrary.in/api
```

---

## 3. Merchant Gateway Setup (Razorpay)

1. The library owner creates an account at [Razorpay](https://razorpay.com).
2. Complete KYC using library business documents (PAN, GSTIN, Bank Account).
3. Generate **Live API Keys** (`Key ID` and `Key Secret`).
4. Set up Webhooks pointing to `https://api.athenalibrary.in/api/payments/webhook` with the events:
   - `payment.captured`
   - `refund.processed`
5. Verify settlement bank accounts: Payouts settle automatically on a T+1 or T+2 business day schedule directly into the client's commercial bank.

---

## 4. Indian DPDP Compliance Guidelines

Under the Digital Personal Data Protection Act:
- **Data Minimisation**: Collect only essential student information (Name, Phone, ID Proof).
- **Storage Security**: Personal identity documents (Aadhaar, College ID) must reside in private encrypted buckets with no public URLs.
- **Cardholder Data**: Never store student card details. All transactions tokenize through Razorpay.
- **Access Logs**: Administrative document access is logged in the `AuditLog` collection.
- **Data Deletion**: When a membership ends permanently, students can request document purging.
