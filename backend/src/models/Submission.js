const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    type: { type: String, default: 'gift-card' },
    amount: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    deliveryOption: { type: String },
    deliveryDate: { type: String },
    deliveryMode: { type: String },
    sender: { type: Object, default: {} },
    receiver: { type: Object, default: {} },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', submissionSchema);
