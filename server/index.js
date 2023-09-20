const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = 'asde22df24ygb457hb52rfdhg';
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const ContractModel = require('./models/ContractModel');
const moment = require('moment');
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const bcryptSalt = bcrypt.genSaltSync(10);
mongoose.connect(
  'mongodb+srv://prime-pakistan:prime123@cluster0.qyyqgdl.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
);

app.post('/add-record', async (req, res) => {
  let {
    pnNo,
    description,
    vendorName,
    coffStart,
    coffEnd,
    contractStart,
    contractEnd,
  } = req.body;
  pnNo = pnNo.trim();
  description = description.trim();
  vendorName = vendorName.trim();
  coffStart = coffStart.trim();
  coffStart = moment(coffStart).format('DD-MM-YYYY');
  coffEnd = coffEnd.trim();
  coffEnd = moment(coffEnd).format('DD-MM-YYYY');
  contractStart = contractStart.trim();
  contractStart = moment(contractStart).format('DD-MM-YYYY');
  contractEnd = contractEnd.trim();
  contractEnd = moment(contractEnd).format('DD-MM-YYYY');
  const ContractDco = await ContractModel.create({
    pnNo,
    description,
    vendorName,
    coffStart,
    coffEnd,
    contractStart,
    contractEnd,
  });
  res.json(ContractDco);
});
app.get('/all-contracts', async (req, res) => {
  const ContractDoc = await ContractModel.find().lean();

  res.json(ContractDoc);
});
app.get('/', async (req, res) => {
  //   const ContractDoc = await ContractModel.deleteMany();
  res.json('Hello world');
});
app.listen(4000);
