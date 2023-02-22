const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Il cliente deve essere specificato"],
    }, 
    type: {
      type: String,
      required: [true, "La fattura riguarda prodotti o servizi?"],
    },
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: [true, "Il prodotto deve essere fornito"],
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    service: {
      type: mongoose.Types.ObjectId,
      ref: "Service",
    },
    total: {
      type: Number,
      required: [true, "Il totale deve essere fornito"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Il metodo di pagamento deve essere specificato"],
    },
    paidAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", BillSchema);
