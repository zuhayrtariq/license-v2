import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import moment from 'moment';

const Table = () => {
  const currentDate = new Date();
  const [pnNo, setPnNo] = useState('');
  const [description, setDescription] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [coffStart, setCoffStart] = useState('');
  const [coffEnd, setCoffEnd] = useState('');
  const [contractStart, setContractStart] = useState('');
  const [contractEnd, setContractEnd] = useState('');
  const [showSave, setShowSave] = useState(false);
  const [loadedData, setLoadedData] = useState(false);
  const [contractData, setContractData] = useState([]);
  let x;
  const getData = async () => {
    const { data } = await axios.get('http://127.0.0.1:4000/all-contracts');
    setLoadedData(true);
    return data;
  };
  useEffect(() => {
    if (!loadedData) {
      (async () => {
        const result = await getData();
        console.log(result);
        setContractData(result);
      })();
    }
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://127.0.0.1:4000/add-record', {
        pnNo,
        description,
        vendorName,
        coffStart,
        coffEnd,
        contractStart,
        contractEnd,
      });
      alert('Record Added Successfully!');
    } catch (e) {
      console.log('ERROR : ', e.message);
    }
  };

  const TABLE_HEAD = [
    'PN No.',
    'Description',
    'Vendor Name',
    'COFF Start Date',
    'COFF End Date',
    'Contract Start Date',
    'Contract End Date',
    'COFF Expiry',
    'Contract Expiry',
  ];
  const TABLE_ROWS = [
    {
      pn_no: '5000018937',
      description: 'Internet Bandwidth Services - Primary Link',
      vendor_name: 'Wateen Telecom Limited',
      coff_start: '1-Jul-23',
      coff_end: '31-Oct-23',
      contract_start: '30-Sep-23',
      contract_end: '30-Jun-23',
    },
  ];
  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <form action='' onSubmit={handleFormSubmit}>
              <table className='min-w-full text-center  text-sm font-light'>
                <thead className='border-b  font-medium dark:border-neutral-500 bg-green-700 text-gray-50'>
                  <tr>
                    {TABLE_HEAD.map((heading) => {
                      return (
                        <th key={heading} scope='col' className='px-2 py-3'>
                          {heading}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {contractData.map((contract, i) => {
                    {
                      x = Math.ceil(
                        moment
                          .duration(
                            moment(contract.contractEnd, 'DD-MM-YYYY').diff(
                              moment(new Date())
                            )
                          )
                          .asDays()
                      );
                      x--;
                      x > 60
                        ? (x = 'bg-white font-semibold')
                        : (x = 'bg-red-700 text-white font-bold');
                    }
                    return (
                      <tr
                        key={i}
                        className={'border-b-2 border-b-green-700  ' + x}>
                        <td className='whitespace-nowrap px-2 py-3 font-medium '>
                          {contract.pnNo}
                        </td>

                        <td className='whitespace-nowrap px-2 py-3'>
                          {contract.description}
                        </td>
                        <td className='whitespace-nowrap px-2 py-3'>
                          {contract.vendorName}
                        </td>
                        <td className='whitespace-nowrap px-2 py-3'>
                          {moment(contract.coffStart, 'DD-MM-YYYY').format(
                            'DD-MMM-YY'
                          )}
                        </td>
                        <td className='whitespace-nowrap px-2 py-3'>
                          {moment(contract.coffEnd, 'DD-MM-YYYY').format(
                            'DD-MMM-YY'
                          )}
                        </td>
                        <td>
                          <p className='capitalize'>
                            {moment(contract.coffEnd, 'DD-MM-YYYY').fromNow()}
                          </p>
                        </td>
                        <td className='whitespace-nowrap px-2 py-3'>
                          {moment(contract.contractStart, 'DD-MM-YYYY').format(
                            'DD-MMM-YY'
                          )}
                        </td>

                        <td className='whitespace-nowrap px-2 py-3'>
                          {moment(contract.contractEnd, 'DD-MM-YYYY').format(
                            'DD-MMM-YY'
                          )}
                        </td>
                        <td>
                          <p className='capitalize'>
                            {moment(
                              contract.contractEnd,
                              'DD-MM-YYYY'
                            ).fromNow()}{' '}
                          </p>
                        </td>
                      </tr>
                    );
                  })}

                  <tr className='border-b dark:border-neutral-500'>
                    <td className='whitespace-nowrap px-2 py-3 font-medium'>
                      <input
                        type='number'
                        onChange={(e) => {
                          setPnNo(e.target.value);
                        }}
                        className='border-2 w-11/12 py-2 rounded-md px-1'
                        name=''
                        id=''
                      />
                    </td>
                    <td className='whitespace-nowrap px-2 py-3'>
                      <input
                        type='text'
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        className='border-2 w-11/12 py-2 rounded-md px-1'
                        name=''
                        id=''
                      />
                    </td>
                    <td className='whitespace-nowrap px-2 py-3'>
                      <input
                        type='text'
                        onChange={(e) => {
                          setVendorName(e.target.value);
                        }}
                        className='border-2 w-11/12 py-2 rounded-md px-1'
                        name=''
                        id=''
                      />
                    </td>
                    <td className='whitespace-nowrap px-2 py-3'>
                      <input
                        type='text'
                        onChange={(e) => {
                          setCoffStart(e.target.value);
                        }}
                        className='border-2 w-11/12 py-2 rounded-md px-1'
                        name=''
                        id=''
                      />
                    </td>
                    <td className='whitespace-nowrap px-2 py-3'>
                      <input
                        type='text'
                        onChange={(e) => {
                          setCoffEnd(e.target.value);
                        }}
                        className='border-2 w-11/12 py-2 rounded-md px-1'
                        name=''
                        id=''
                      />
                    </td>
                    <td className='whitespace-nowrap px-2 py-3'>
                      <input
                        type='text'
                        onChange={(e) => {
                          setContractStart(e.target.value);
                        }}
                        className='border-2 w-11/12 py-2 rounded-md px-1'
                        name=''
                        id=''
                      />
                    </td>
                    <td className='whitespace-nowrap px-2 py-3'>
                      <input
                        type='text'
                        onChange={(e) => {
                          setContractEnd(e.target.value);
                          console.log(contractStart);
                        }}
                        className='border-2 w-11/12 py-2 rounded-md px-1'
                        name=''
                        id=''
                      />
                    </td>

                    {pnNo &&
                      description &&
                      vendorName &&
                      coffStart &&
                      coffEnd &&
                      contractStart &&
                      contractEnd && (
                        <td colSpan={2}>
                          <button className='font-bold mr-4 bg-green-600 rounded-lg px-2 py-3 text-white hover:brightness-110'>
                            Add New Record
                          </button>
                        </td>
                      )}
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
