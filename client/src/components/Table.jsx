import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import moment from 'moment';
import ContractDialog from './ContractDialog';
import { FaMinus, FaPlus } from 'react-icons/fa';

const Table = () => {
  //Date for the table
  const [pnNo, setPnNo] = useState('');
  const [description, setDescription] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [coffStart, setCoffStart] = useState([]);
  const [coffEnd, setCoffEnd] = useState([]);
  const [sesEnd, setSesEnd] = useState([]);
  const [contractStart, setContractStart] = useState(['']);
  const [contractEnd, setContractEnd] = useState('');
  const [contractToOpen, setContractToOpen] = useState('');
  const [totalCallOffsToAdd, setTotalCallOffsToAdd] = useState(0);
  const [totalSESToAdd, setTotalSESToAdd] = useState(0);
  const [formOpen, setFormOpen] = useState(false);

  const [visibleCols, setVisibleCols] = useState([]);

  const [loadedData, setLoadedData] = useState(false);
  const [contractData, setContractData] = useState([]);

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
        sesEnd,
      });
      alert('Record Added Successfully!');
    } catch (e) {
      console.log('ERROR : ', e.message);
    }
  };

  function handleCbClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      setVisibleCols([...visibleCols, name]);
    } else {
      setVisibleCols([
        ...visibleCols.filter((selectedName) => selectedName !== name),
      ]);
    }
  }
  const handleFormClose = () => {
    setFormOpen(false);
  };
  const getDateRemaining = (date, type = 'contract') => {
    let diff = Math.ceil(
      moment
        .duration(moment(date, 'DD-MM-YYYY').diff(moment(new Date())))
        .asDays()
    );
    if (!Number.isInteger(diff)) {
      diff = Math.ceil(
        moment
          .duration(moment(date, 'DD-MMM-YYYY').diff(moment(new Date())))
          .asDays()
      );
    }
    if (Number.isInteger(diff)) {
      if (diff < 10 && type == 'contract') {
        return 'bg-red-700 text-white font-bold';
      } else if (diff < 10 && type == 'calloff') {
        return 'bg-yellow-700 text-white font-bold';
      } else if (diff < 10 && type == 'ses') {
        return 'bg-orange-700 text-white font-bold';
      }
    }

    return 'bg-white font-semibold';
  };

  const formatDate = (date) => {
    if (!date) {
      return 'N/A';
    }
    let newDate = Number.isInteger(
      moment(date, 'DD.MM.YYYY').format('DD-MMM-YY')
    );
    if (Number.isInteger(newDate)) {
      return newDate;
    } else {
      newDate = Number.isInteger(
        moment(date, 'DD.MMM.YYYY').format('DD-MMM-YY')
      );
      if (Number.isInteger(newDate)) {
        return newDate;
      }
    }
    return date;
  };
  const getDateFromNow = (date) => {
    if (!date) {
      return 'N/A';
    }
    let diff = moment(date, 'DD-MM-YYYY').fromNow();

    if (diff !== 'Invalid date') {
      return diff;
    } else {
      diff = moment(date, 'DD-MMM-YYYY').fromNow();
      if (diff !== 'Invalid date') {
        return diff;
      }
    }
    return date;
  };
  const TABLE_HEAD = [
    'PN No.',
    'Description',
    'Vendor Name',
    'COFF Start Date',
    'COFF End Date',
    'SES End Date',
    'Contract Start Date',
    'Contract End Date',
    'COFF Expiry',
    'Contract Expiry',
  ];

  useEffect(() => {
    setVisibleCols(TABLE_HEAD);
  }, []);
  // setVisibleCols(...TABLE_HEAD);
  // const contractData = [
  //   {
  //     pnNo: '5000018326',
  //     description:
  //       'Smart Access lorem403213 Smart Access lorem403213 CoDSDASDntrol Systems Maintenance',
  //     vendorName: 'LMKT PRIVATE LIMITED',
  //     coffStart: ['01-12-2022', '01-12-2024'],
  //     coffEnd: ['30-06-2023', '25-12-2025'],
  //     sesEnd: ['30-06-2023', '25-08-2023', '30-06-2023', '25-08-2023'],
  //     contractStart: '25-06-2020',
  //     contractEnd: '21-01-2024',
  //   },
  // ];

  const handleFormClick = (i) => {
    setContractToOpen(contractData[i]);

    setFormOpen(true);
  };
  return (
    <div className='justify-center  flex flex-col'>
      {formOpen && (
        <ContractDialog
          handleFormClose={handleFormClose}
          contractToOpen={contractToOpen}
        />
      )}
      <div className='bg-blue-200 flex justify-evenly mb-4 '>
        {TABLE_HEAD.slice(1).map((heading, i) => {
          return (
            <div className='gap-1 flex' key={heading}>
              <input
                required
                type='checkbox'
                name={heading}
                checked={visibleCols.includes(heading)}
                onChange={handleCbClick}
                id=''
              />
              <span>{heading}</span>
            </div>
          );
        })}
      </div>
      <div className='overflow-x-auto  sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full  text-center  text-sm font-light  '>
              <thead className='min-w-full border-b  font-medium dark:border-neutral-500 bg-green-700 text-gray-50'>
                <tr>
                  {TABLE_HEAD.filter((heading, i) => {
                    return visibleCols.includes(heading);
                  }).map((heading) => {
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
                  return (
                    <tr
                      key={i}
                      className={
                        'border-b-2 border-b-green-700  ' +
                        getDateRemaining(contract.contractEnd, 'contract')
                      }>
                      {visibleCols.includes(TABLE_HEAD[0]) && (
                        <td className='whitespace-nowrap px-2 py-3 font-medium '>
                          <span
                            className='cursor-pointer hover:underline'
                            onClick={() => handleFormClick(i)}>
                            {contract.pnNo}
                          </span>
                        </td>
                      )}

                      {visibleCols.includes(TABLE_HEAD[1]) && (
                        <td className=' min-w- px-2 py-3'>
                          {contract.description}
                        </td>
                      )}
                      {visibleCols.includes(TABLE_HEAD[2]) && (
                        <td className=' px-2 py-3'>{contract.vendorName}</td>
                      )}
                      {visibleCols.includes(TABLE_HEAD[3]) && (
                        <td className='whitespace-nowrap px-2 py-3'>
                          {contract.coffStart.map((x, i) => {
                            return (
                              <span key={i} className='bg-white font-semibold'>
                                {formatDate(x)}
                                <span className='mb-1 block'></span>
                              </span>
                            );
                          })}
                        </td>
                      )}
                      {visibleCols.includes(TABLE_HEAD[4]) && (
                        <td className='whitespace-nowrap px-2 py-3   '>
                          {contract.coffEnd.map((x, i) => {
                            return (
                              <span
                                key={i}
                                className={getDateRemaining(x, 'calloff')}>
                                {formatDate(x)}
                                <span className='mb-1 block'></span>
                              </span>
                            );
                          })}
                        </td>
                      )}
                      {visibleCols.includes(TABLE_HEAD[5]) && (
                        <td className='whitespace-nowrap px-2 py-3   '>
                          {contract.sesEnd.map((x, i) => {
                            return (
                              <span
                                key={i}
                                className={getDateRemaining(x, 'ses')}>
                                {formatDate(x)}
                                <span className='mb-1 block'></span>
                              </span>
                            );
                          })}
                          {!contract.sesEnd.length && (
                            <span className={'bg-white font-semibold'}>
                              N/A
                              <span className='mb-1 block'></span>
                            </span>
                          )}
                        </td>
                      )}
                      {visibleCols.includes(TABLE_HEAD[6]) && (
                        <td className='whitespace-nowrap px-2 py-3'>
                          {formatDate(contract.contractStart)}
                        </td>
                      )}
                      {visibleCols.includes(TABLE_HEAD[7]) && (
                        <td className='whitespace-nowrap px-2 py-3'>
                          {formatDate(contract.contractEnd)}
                        </td>
                      )}
                      {visibleCols.includes(TABLE_HEAD[8]) && (
                        <td>
                          <p className='capitalize'>
                            {getDateFromNow(contract.coffEnd)}
                          </p>
                        </td>
                      )}
                      {visibleCols.includes(TABLE_HEAD[9]) && (
                        <td>
                          <p className='capitalize'>
                            {getDateFromNow(contract.contractEnd)}
                          </p>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <form
              id='newRecord'
              onSubmit={handleFormSubmit}
              className='min-w-full bg-gray-200 mt-8'>
              <h1 className='font-bold text-lg text-center mt-4'>
                Add New Record
              </h1>
              <div className='flex w-full  '>
                <div className='  w-36 focus-within:flex-1 whitespace-nowrap px-2 py-3 font-medium'>
                  <h1 className='text-center font-semibold text-xs'>
                    Pn Number
                  </h1>
                  <input
                    required
                    type='number'
                    onChange={(e) => {
                      setPnNo(e.target.value);
                    }}
                    className='border-2 w-full text-center  py-2 rounded-md px-1 placeholder:text-center placeholder:font-semibold placeholder:text-xs text-sm '
                    name=''
                    placeholder='PN Number'
                    id=''
                  />
                </div>
                <div className='flex-1  w-[450px] focus-within:flex-none  whitespace-nowrap px-2 py-3'>
                  <h1 className='text-center font-semibold text-xs truncate'>
                    Description
                  </h1>
                  <input
                    required
                    type='text'
                    pattern='.*\S.*'
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    className='text-center truncate border-2 w-full py-2 rounded-md px-1 placeholder:text-center placeholder:font-semibold placeholder:text-xs text-sm'
                    name=''
                    id=''
                    placeholder='Description'
                  />
                </div>
                <div className='flex-1  w-[380px] focus-within:flex-none  text-center col-span-2 whitespace-nowrap px-2 py-3'>
                  <h1 className='text-center font-semibold text-xs'>
                    Vendor Name
                  </h1>
                  <input
                    required
                    type='text'
                    pattern='.*\S.*'
                    onChange={(e) => {
                      setVendorName(e.target.value);
                    }}
                    className='text-center truncate border-2 w-full py-2 rounded-md px-1 placeholder:text-center placeholder:font-semibold placeholder:text-xs text-sm'
                    name=''
                    id=''
                    placeholder='Vendor Name'
                  />
                </div>
                <div className='flex-1 flex flex-col items-center justify-center    '>
                  {[...Array(totalCallOffsToAdd)].map((x, i) => {
                    return (
                      <div className='flex justify-evenly' key={i}>
                        <div className='w-min focus-within:w-44  whitespace-nowrap px-2 py-3'>
                          <h1 className='text-center font-semibold text-xs'>
                            Call Off {i + 1} Start Date
                          </h1>

                          <input
                            required
                            type='text'
                            pattern='.*\S.*'
                            onChange={(e) => {
                              let newArr = [...coffStart];
                              newArr[i] = e.target.value.trim();
                              if (!newArr[i]) {
                                newArr.splice(i, 1);
                              }
                              setCoffStart(newArr);
                            }}
                            className='border-2 w-full text-center py-2 rounded-md px-1 placeholder:text-center placeholder:font-semibold placeholder:text-xs text-sm'
                            name=''
                            id=''
                            placeholder='Call Off Start'
                          />
                        </div>
                        <div className='w-min focus-within:w-44  whitespace-nowrap px-2 py-3'>
                          <h1 className='text-center font-semibold text-xs'>
                            Call Off {i + 1} End Date
                          </h1>
                          <input
                            required
                            type='text'
                            pattern='.*\S.*'
                            onChange={(e) => {
                              let newArr = [...coffEnd];
                              newArr[i] = e.target.value.trim();
                              if (!newArr[i]) {
                                newArr.splice(i, 1);
                              }
                              setCoffEnd(newArr);
                            }}
                            className='border-2 w-full text-center py-2 rounded-md px-1 placeholder:text-center placeholder:font-semibold placeholder:text-xs text-sm'
                            name=''
                            id=''
                            placeholder='Call Off End'
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div className='flex justify-end gap-2'>
                    {totalCallOffsToAdd > 0 ? (
                      <>
                        <span
                          className='text-md  px-2 bg-red-500 text-white py-2 rounded-md'
                          onClick={() => {
                            coffStart.splice(totalCallOffsToAdd - 1, 1);
                            coffEnd.splice(totalCallOffsToAdd - 1, 1);
                            setTotalCallOffsToAdd(totalCallOffsToAdd - 1);
                          }}>
                          <FaMinus />
                        </span>{' '}
                        <span
                          className='text-md m-w-min px-2 bg-green-500 text-white py-2 rounded-md'
                          onClick={() => {
                            setTotalCallOffsToAdd(totalCallOffsToAdd + 1);
                          }}>
                          <FaPlus />
                        </span>
                      </>
                    ) : (
                      <span
                        className='flex items-center gap-1 font-semibold text-md  px-2 bg-green-500 text-white py-2 rounded-md'
                        onClick={() => {
                          setTotalCallOffsToAdd(totalCallOffsToAdd + 1);
                        }}>
                        <FaPlus />
                        Add Call off
                      </span>
                    )}
                  </div>
                </div>
                <div className='flex-1 flex flex-col items-center justify-center    '>
                  {[...Array(totalSESToAdd)].map((x, i) => {
                    return (
                      <div className='flex justify-evenly' key={i}>
                        <div className=' focus-within:w-44  whitespace-nowrap px-2 py-3'>
                          <h1 className='text-center font-semibold text-xs'>
                            SES {i + 1} End Date
                          </h1>

                          <input
                            required
                            type='text'
                            pattern='.*\S.*'
                            onChange={(e) => {
                              let newArr = [...sesEnd];
                              newArr[i] = e.target.value.trim();
                              if (!newArr[i]) {
                                newArr.splice(i, 1);
                              }
                              setSesEnd(newArr);
                            }}
                            className='border-2 w-full text-center py-2 rounded-md px-1 placeholder:text-center placeholder:font-semibold placeholder:text-xs text-sm'
                            name=''
                            id=''
                            placeholder='SES End Date'
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div className='flex justify-end gap-2'>
                    {totalSESToAdd > 0 ? (
                      <>
                        <span
                          className='text-md  px-2 bg-red-500 text-white py-2 rounded-md'
                          onClick={() => {
                            sesEnd.splice(totalSESToAdd - 1, 1);
                            setTotalSESToAdd(totalSESToAdd - 1);
                          }}>
                          <FaMinus />
                        </span>
                        <span
                          className='text-md m-w-min px-2 bg-green-500 text-white py-2 rounded-md'
                          onClick={() => {
                            setTotalSESToAdd(totalSESToAdd + 1);
                          }}>
                          <FaPlus />
                        </span>
                      </>
                    ) : (
                      <span
                        className='flex items-center gap-1 font-semibold text-md  px-2 bg-green-500 text-white py-2 rounded-md'
                        onClick={() => {
                          setTotalSESToAdd(totalSESToAdd + 1);
                        }}>
                        <FaPlus />
                        Add SES
                      </span>
                    )}
                  </div>
                </div>

                <div className='flex-1 w-min focus-within:w-44  whitespace-nowrap px-2 py-3'>
                  <h1 className='text-center font-semibold text-xs'>
                    Contract Start Date
                  </h1>

                  <input
                    required
                    type='text'
                    pattern='.*\S.*'
                    onChange={(e) => {
                      setContractStart(e.target.value);
                    }}
                    className='border-2 w-full text-center py-2 rounded-md px-1 placeholder:text-center placeholder:font-semibold placeholder:text-xs text-sm'
                    name=''
                    id=''
                    placeholder='Contract Start'
                  />
                </div>
                <div className='flex-1 w-min focus-within:w-44 whitespace-nowrap px-2 py-3'>
                  <h1 className='text-center font-semibold  text-xs'>
                    Contract End Date
                  </h1>
                  <input
                    required
                    type='text'
                    pattern='.*\S.*'
                    onChange={(e) => {
                      setContractEnd(e.target.value);
                      console.log(contractStart);
                    }}
                    className='border-2 w-full text-center py-2 rounded-md px-1 placeholder:text-center placeholder:font-semibold placeholder:text-xs text-sm'
                    name=''
                    id=''
                    placeholder='Contract End'
                  />
                </div>
              </div>

              <div className='flex justify-end'>
                <button className='text-sm font-bold mr-4 bg-green-600 rounded-lg px-2 py-2 text-white hover:brightness-110'>
                  Add New Record
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
