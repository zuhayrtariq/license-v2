const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema(
  {
    pnNo: { type: String, unique: true },
    description: String,
    vendorName: String,
    coffStart: String,
    coffEnd: String,
    contractStart: String,
    contractEnd: String,
  },
  { timestamps: true }
);
const ContractModel = mongoose.model('Contract', ContractSchema);
module.exports = ContractModel;
