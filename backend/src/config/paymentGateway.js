import crypto from 'crypto';

export const paymentGateway = {
  createOrder: async ({ amount, receipt, notes }) => {
    // In production, instantiate Razorpay SDK: new Razorpay({ key_id, key_secret })
    // Supports sandbox test generation
    const orderId = `order_${crypto.randomBytes(8).toString('hex')}`;
    return {
      id: orderId,
      amount: amount * 100, // in paise
      currency: 'INR',
      receipt: receipt || `rec_${Date.now()}`,
      status: 'created',
      notes: notes || {}
    };
  },

  verifySignature: ({ orderId, paymentId, signature }) => {
    const secret = process.env.RAZORPAY_KEY_SECRET || 'athena_mock_secret';
    if (!signature) {
      // In sandbox/demo mock mode, signature check succeeds for valid IDs
      return paymentId && paymentId.startsWith('pay_');
    }
    const generated = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');
    return generated === signature;
  }
};
