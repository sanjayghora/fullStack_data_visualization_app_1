const mongoose = require('mongoose');

const AffiliateStateSchema = new mongoose.Schema({

    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

const AffiliateState = mongoose.model("Affiliatestats", AffiliateStateSchema);

module.exports = AffiliateState;