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
app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
  })
);

mongoose.connect(
  'mongodb+srv://prime-pakistan:prime123@cluster0.qyyqgdl.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
);

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  if (username === 'testaccount' && password === 'password123') {
    jwt.sign({ username: username }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json('LoggedIn');
    });
  } else {
    res.status(422).json('Invalid Password');
  }
});
app.post('/add-record', async (req, res) => {
  let {
    pnNo,
    description,
    vendorName,
    coffStart,
    coffEnd,
    contractStart,
    contractEnd,
    sesEnd,
  } = req.body;

  pnNo = pnNo.trim();
  description = description.trim();
  vendorName = vendorName.trim();

  coffStart?.map((x) => {
    return x.trim();
  });
  // coffStart = coffStart.trim();
  // coffStart = moment(coffStart).format('DD-MM-YYYY');
  // coffEnd = coffEnd.trim();
  coffEnd?.map((x) => {
    return x.trim();
  });
  sesEnd?.map((x) => {
    return x.trim();
  });
  // coffEnd = moment(coffEnd).format('DD-MM-YYYY');
  contractStart = contractStart.trim();
  // contractStart = moment(contractStart).format('DD-MM-YYYY');
  contractEnd = contractEnd.trim();
  // contractEnd = moment(contractEnd).format('DD-MM-YYYY');
  const ContractDco = await ContractModel.create({
    section: 'PNI',
    pnNo,
    description,
    vendorName,
    coffStart,
    coffEnd,
    sesEnd,
    contractStart,
    contractEnd,
  });
  res.json(ContractDco);
});
app.post('/update-record', async (req, res) => {
  let {
    pnNo,
    description,
    vendorName,
    coffStart,
    coffEnd,
    contractStart,
    contractEnd,
    sesEnd,
  } = req.body;

  pnNo = pnNo.trim();
  description = description.trim();
  vendorName = vendorName.trim();

  coffStart?.map((x) => {
    return x.trim();
  });

  coffEnd?.map((x) => {
    return x.trim();
  });
  sesEnd?.map((x) => {
    return x.trim();
  });

  contractStart = contractStart.trim();

  contractEnd = contractEnd.trim();

  const ContractDco = await ContractModel.findOneAndUpdate(
    { pnNo: pnNo },
    {
      section: 'PNI',
      description,
      vendorName,
      coffStart,
      coffEnd,
      sesEnd,
      contractStart,
      contractEnd,
    }
  );
  res.json(ContractDco);
});
app.get('/all-contracts', async (req, res) => {
  const ContractDoc = await ContractModel.find().lean();

  res.json(ContractDoc);
});
app.get('/', async (req, res) => {
  // const ContractDoc = await ContractModel.deleteMany();
  // await ContractModel.insertMany([
  //   {
  //     pnNo: 5000018937,
  //     description: 'Internet Bandwidth Services - Primary Link',
  //     vendorName: 'WATEEN TELECOM LIMITED',
  //     coffStart: '1-Jul-23',
  //     coffEnd: '31-Oct-23',
  //     sesEnd: '30-Sep-23',
  //     contractStart: '1-Nov-20',
  //     contractEnd: '31-Oct-23',
  //   },
  //   {
  //     pnNo: 5000021110,
  //     Description: 'Dark fiber- Layer 2 Fiber Connectivity',
  //     vendorName: 'Cybernet',
  //     coffStart: ['21-Jun-23', '15-Jun-23'],
  //     coffEnd: ['20-Dec-23', '14-Dec-23'],
  //     sesEnd: '30-Sep-23',
  //     contractStart: '24-Nov-21',
  //     contractEnd: '23-Nov-24',
  //   },

  //   {
  //     pnNo: 5000012801,
  //     Description: 'Satellite Internet Rigless',
  //     vendorName: 'CLICKSAT PVT LTD',
  //     coffStart: '17-Mar-23',
  //     coffEnd: '10-Apr-23',
  //     sesEnd: 'na',
  //     contractStart: '14-Jun-18',
  //     contractEnd: '30-Jun-24',
  //   },

  //   {
  //     pnNo: 5000012590,
  //     Description: 'Karachi Office Internet Services',
  //     vendorName: 'Multinet Pakistan Pvt Ltd',
  //     coffStart: '1-Jul-23',
  //     coffEnd: '31-Dec-23',
  //     sesEnd: '30-Sep-23',
  //     contractStart: '21-May-18',
  //     contractEnd: '30-Jun-24',
  //   },
  //   {
  //     pnNo: 5000021671,
  //     Description: 'RSA Secure ID / Cisco ISE, RSA & OP Manager Maintenance',
  //     vendorName: 'Arwen Tech (Pvt) Ltd',
  //     coffStart: '21-Mar-23',
  //     coffEnd: '20-Mar-24',
  //     sesEnd: '20-Mar-24',
  //     contractStart: '21-Mar-22',
  //     contractEnd: '20-Mar-25',
  //   },
  //   {
  //     pnNo: 5000014391,
  //     Description: 'VHF Radio & Tower Maintenance',
  //     vendorName: 'AZAM ENTERPRISES',
  //     coffStart: '1-Jul-23',
  //     coffEnd: '31-Dec-23',
  //     sesEnd: '31-Dec-23',
  //     contractStart: '1-Jan-19',
  //     contractEnd: '31-Dec-23',
  //   },
  //   {
  //     pnNo: 5000017906,
  //     Description: 'HP Consumables',
  //     vendorName: 'PAKO Computers',
  //     coffStart: 'On -Demand',
  //     coffEnd: 'On -Demand',
  //     sesEnd: 'na',
  //     contractStart: '15-Apr-20',
  //     contractEnd: '30-Jun-24',
  //   },
  //   {
  //     pnNo: 5000017907,
  //     Description: 'HP Consumables',
  //     vendorName: 'JAFFER BUSINESS SYSTEMS (PRIVATE)\nLIMITED',
  //     coffStart: 'On -Demand',
  //     coffEnd: 'On -Demand',
  //     sesEnd: 'na',
  //     contractStart: '15-Apr-20',
  //     contractEnd: '14-Apr-23',
  //   },
  //   {
  //     pnNo: 5000017908,
  //     Description: 'HP Consumables',
  //     vendorName: 'COMPSI (PVT) LTD.',
  //     coffStart: 'On -Demand',
  //     coffEnd: 'On -Demand',
  //     sesEnd: 'na',
  //     contractStart: '15-Apr-20',
  //     contractEnd: '14-Apr-23',
  //   },
  //   {
  //     pnNo: 5000021090,
  //     Description: 'SLA for ISS at Bhit',
  //     vendorName: 'SG TECHNICAL SERVICES',
  //     coffStart: '1-Jun-23',
  //     coffEnd: '30-Nov-23',
  //     sesEnd: '30-Nov-23',
  //     contractStart: '1-Dec-21',
  //     contractEnd: '30-Nov-24',
  //   },
  //   {
  //     pnNo: 5000020452,
  //     Description: 'ICT Consumables & Stationary ',
  //     vendorName: 'KNOW WELL',
  //     coffStart: 'On -Demand',
  //     coffEnd: 'On -Demand',
  //     sesEnd: 'na',
  //     contractStart: '8-Aug-21',
  //     contractEnd: '7-Aug-24',
  //   },
  //   {
  //     pnNo: 5000018888,
  //     Description: 'Cisco Equipments Maintenance',
  //     vendorName: 'WATEEN SOLUTIONS (PVT) LTD',
  //     coffStart: '18-Dec-22',
  //     coffEnd: '31-Oct-23',
  //     sesEnd: '31-Oct-23',
  //     contractStart: '1-Nov-20',
  //     contractEnd: '31-Oct-23',
  //   },

  //   {
  //     pnNo: 5000018326,
  //     Description: 'Smart Access Control Systems Maintenance',
  //     vendorName: 'LMKT PRIVATE LIMITED',
  //     coffStart: '25-Dec-22',
  //     coffEnd: '30-Jun-23',
  //     sesEnd: '24-Mar-23',
  //     contractStart: '25-Jun-20',
  //     contractEnd: '30-Jun-23',
  //   },
  //   {
  //     pnNo: 5000016881,
  //     Description: 'Non Directional Beacons',
  //     vendorName: '\nINTERNATIONAL AERADIO PAKISTAN',
  //     coffStart: '1-Nov-22',
  //     coffEnd: '31-Dec-23',
  //     sesEnd: '31-Oct-23',
  //     contractStart: '1-Nov-19',
  //     contractEnd: '31-Dec-23',
  //   },
  //   {
  //     pnNo: 5000016426,
  //     Description: 'Panasonic PABX Maint.',
  //     vendorName: 'MARS OFFICE PRODUCTS',
  //     coffStart: '1-Oct-23',
  //     coffEnd: '31-Dec-23',
  //     sesEnd: '31-Dec-23',
  //     contractStart: '10-Sep-19',
  //     contractEnd: '30-Sep-23',
  //   },
  //   {
  //     pnNo: 5000013757,
  //     Description: 'Maintenance & Support Aruba WiFi System',
  //     vendorName: 'ZH TECHNOLOGIES- PAKISTAN',
  //     coffStart: '1-Nov-22',
  //     coffEnd: '31-Oct-23',
  //     sesEnd: '31-Oct-23',
  //     contractStart: '1-Nov-18',
  //     contractEnd: '31-Oct-23',
  //   },
  //   {
  //     pnNo: 5000021789,
  //     Description: 'Alcatel PABX System',
  //     vendorName: 'Curve Technologies (Pvt) Ltd',
  //     coffStart: '21-Mar-23',
  //     coffEnd: '20-Mar-24',
  //     sesEnd: '20-Dec-23',
  //     contractStart: '20-Mar-22',
  //     contractEnd: '31-Mar-25',
  //   },
  //   {
  //     pnNo: 5000018826,
  //     Description: 'SCPC VSAT Satellite Communication Links',
  //     vendorName: 'WATEEN TELECOM LIMITED',
  //     coffStart: '15-Aug-23',
  //     coffEnd: '24-Oct-23',
  //     sesEnd: '14-Oct-23',
  //     contractStart: '25-Oct-20',
  //     contractEnd: '24-Oct-23',
  //   },

  //   {
  //     pnNo: 5000012616,
  //     Description: 'HP PLOTTERS, PRINTERS AND SCANNERS -Maintenance',
  //     vendorName: 'COMPSI (PVT) LTD. ',
  //     coffStart: '1-Jul-23',
  //     coffEnd: '31-Dec-23',
  //     sesEnd: '30-Sep-22',
  //     contractStart: '20-Jun-18',
  //     contractEnd: '30-Jun-24',
  //   },

  //   {
  //     pnNo: 5000019255,
  //     Description: 'Microwave Communication Link for Voice- Bhit',
  //     vendorName: 'Pakistan Telecommunication Company',
  //     coffStart: '1-Sep-23',
  //     coffEnd: '31-Dec-23',
  //     sesEnd: '31-Aug-23',
  //     contractStart: '1-Jan-21',
  //     contractEnd: '31-Dec-23',
  //   },

  //   {
  //     pnNo: 5000020968,
  //     Description: 'Home Internet Services-Storm Fiber',
  //     vendorName: 'CYBER INTERNET SERVICES (PVT)',
  //     coffStart: '1-Jul-23',
  //     coffEnd: '30-Sep-23',
  //     sesEnd: '30-Sep-23',
  //     contractStart: '1-Nov-21',
  //     contractEnd: '31-Oct-24',
  //   },
  //   {
  //     pnNo: 5000011654,
  //     Description: 'Vulnerability Management',
  //     vendorName: 'REWTERZ',
  //     coffStart: '24-Jan-23',
  //     coffEnd: '23-Jan-24',
  //     sesEnd: '23-Jan-24',
  //     contractStart: '24-Jan-18',
  //     contractEnd: '31-Mar-24',
  //   },

  //   {
  //     pnNo: 5000020948,
  //     Description: 'Cellular Services (Mobile Communication)',
  //     vendorName: 'PAK TELECOM MOBILE LIMITED (U-FONE)',
  //     coffStart: '1-Jul-23',
  //     coffEnd: '30-Sep-23',
  //     sesEnd: '30-Jun-23',
  //     contractStart: '1-Nov-21',
  //     contractEnd: '31-Oct-24',
  //   },
  //   {
  //     pnNo: 5000010088,
  //     Description: 'Community Attendance Management System',
  //     vendorName: 'LIMTON INNOVATIVE SYSTEMS',
  //     coffStart: '21-Jul-22',
  //     coffEnd: '20-Jul-23',
  //     sesEnd: '20-Jul-23',
  //     contractStart: '21-Jul-17',
  //     contractEnd: '30-Jun-24',
  //   },
  //   {
  //     pnNo: 5000015576,
  //     Description: 'Emergency Mustering Solution',
  //     vendorName: 'LMKT PRIVATE LIMITED',
  //     coffStart: '14-Jun-22',
  //     coffEnd: '13-Jun-23',
  //     sesEnd: '13-Jun-23',
  //     contractStart: '14-Jun-19',
  //     contractEnd: '30-Jun-23',
  //   },
  //   {
  //     pnNo: 5000015190,
  //     Description: 'Riverbed (WAN optimization technology)',
  //     vendorName: 'INFORMATION SYSTEMS ASSOCIATES LTD.',
  //     coffStart: '20-Apr-22',
  //     coffEnd: '19-Apr-23',
  //     sesEnd: '19-Apr-22',
  //     contractStart: '20-Apr-19',
  //     contractEnd: '30-Apr-23',
  //   },
  //   {
  //     pnNo: 5000020661,
  //     Description:
  //       'Procurement of Cisco Equipment to replace EOL equipment running in Eni Pakistan Environment',
  //     vendorName: 'Arwen Tech (Pvt.) Limited',
  //     coffStart: '21-Dec-22',
  //     coffEnd: '20-Dec-23',
  //     sesEnd: '0-Jan-00',
  //     contractStart: '10-Sep-21',
  //     contractEnd: '9-Sep-24',
  //   },
  //   {
  //     pnNo: 5000014187,
  //     Description: 'HP Workstations Maintenance',
  //     vendorName: 'SG TECHNICAL SERVICES',
  //     coffStart: '1-Jan-23',
  //     coffEnd: '31-Dec-23',
  //     sesEnd: '31-Dec-23',
  //     contractStart: '14-Dec-18',
  //     contractEnd: '31-Dec-23',
  //   },
  //   {
  //     pnNo: 5000022862,
  //     Description: 'Fortigate hardware Maint & licenses Supp',
  //     vendorName: 'Pronet Private Limited',
  //     coffStart: '24-Oct-22',
  //     coffEnd: '23-Oct-23',
  //     sesEnd: '23-Oct-23',
  //     contractStart: '1-Oct-22',
  //     contractEnd: '30-Sep-25',
  //   },

  //   {
  //     pnNo: 5000022205,
  //     Description:
  //       'Maintenance and Support of Webex Subscription of the Video Conferencing Equipment',
  //     vendorName: 'WATEEN SOLUTIONS (PVT) LTD',
  //     coffStart: '',
  //     coffEnd: '',
  //     sesEnd: '#N/A',
  //     contractStart: '1-Jun-22',
  //     contractEnd: '31-May-25',
  //   },
  //   {
  //     pnNo: 5000030026,
  //     Description: 'Cyber Security Solution � Managed XDR Services',
  //     vendorName: 'Jaffer Business Systems (Private) Limited',
  //     coffStart: '7-Apr-23',
  //     coffEnd: '31-Mar-24',
  //     sesEnd: '31-Mar-24',
  //     contractStart: '1-Apr-23',
  //     contractEnd: '31-Mar-26',
  //   },
  // ]);
  res.json('Hello world');
});
app.listen(4000);
