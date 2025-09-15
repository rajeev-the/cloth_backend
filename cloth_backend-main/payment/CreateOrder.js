const Razorpay = require('razorpay');
const crypto = require('crypto');
const { log } = require('console');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createRazorpayOrder = async (req, res) => {
  try {
    let { amount } = req.body;
    console.log(req.body);
    
    // Convert amount to paise and ensure integer
    amount = Math.round(amount * 100);

    const order = await razorpay.orders.create({
      amount: amount,          // amount in paise, integer
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    });

    
    res.json({ orderId: order.id, amount: order.amount });
  } catch (err) {
    console.error("Razorpay order creation error:", err);
    res.status(500).json({ error: "Razorpay order creation failed", details: err.message });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false, message: "Signature mismatch" });
  }

  res.json({ success: true, razorpay_payment_id });
};

// ✅ Export both functions

module.exports = {
  createRazorpayOrder,
  verifyPayment,
};
