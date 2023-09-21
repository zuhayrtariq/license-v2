import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const ContractDialog = ({ handleFormClose, contractToOpen }) => {
  const {
    pnNo,
    description,
    vendorName,
    coffStart,
    coffEnd,
    contractStart,
    contractEnd,
    sesEnd,
  } = contractToOpen;

  const [t_pnNo, setPnNo] = useState(pnNo);
  const [t_description, setDescription] = useState(description);
  const [t_vendorName, setVendorName] = useState(vendorName);
  const [t_coffStart, setCoffStart] = useState(coffStart);
  const [t_coffEnd, setCoffEnd] = useState(coffEnd);
  console.log(sesEnd);
  const [t_sesEnd, setSesEnd] = useState(sesEnd);
  const [t_contractStart, setContractStart] = useState(contractStart);
  const [t_contractEnd, setContractEnd] = useState(contractEnd);
  const [totalCallOffs, setTotalCallOffs] = useState(t_coffStart.length);
  const [totalSES, setTotalSES] = useState(t_sesEnd.length);

  const handleSESDelete = (indexToDelete) => {
    const newSES = t_sesEnd.filter((x, i) => {
      return i !== indexToDelete;
    });
    setSesEnd(newSES);

    setTotalSES(totalSES - 1);
  };
  const handleCallOffDelete = (indexToDelete) => {
    const newCoffStart = t_coffStart.filter((x, i) => {
      return i !== indexToDelete;
    });
    const newCoffEnd = t_coffEnd.filter((x, i) => {
      return i !== indexToDelete;
    });
    setCoffStart(newCoffStart);
    setCoffEnd(newCoffEnd);
    setTotalCallOffs(totalCallOffs - 1);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(t_coffStart);
    try {
      const { data } = await axios.post('http://127.0.0.1:4000/update-record', {
        pnNo: t_pnNo,
        description: t_description,
        vendorName: t_vendorName,
        coffStart: t_coffStart,
        coffEnd: t_coffEnd,
        contractStart: t_contractStart,
        contractEnd: t_contractEnd,
        sesEnd: t_sesEnd,
      });
      alert('Record Updated Successfully!');
    } catch (e) {
      console.log('ERROR : ', e.message);
    }
    console.log('SAVED');
  };
  return (
    <div>
      <Dialog
        open={true}
        onClose={handleFormClose}
        maxWidth={'sm'}
        fullWidth={true}>
        <div className='flex flex-col bg-gray-100  py-5  '>
          <DialogTitle>
            <p className='text-2xl text-center py-4 px-4 font-bold'>
              Contract Details
            </p>
          </DialogTitle>
          <DialogContent>
            <form className='w-full' onSubmit={handleFormSubmit}>
              <div className=' text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>PN Number:</h2>
                <input
                  required
                  readOnly
                  type='text'
                  value={t_pnNo}
                  placeholder='Enter Text'
                  className='text- font-semibold text-black text-base py-2 px-4 w-2/5 outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                />
              </div>
              <div className='   text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>Description:</h2>
                <input
                  required
                  type='text'
                  value={t_description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder='Enter Text'
                  className='text- font-semibold text-black text-base py-2 px-4 w-4/5 overflow-ellipsis outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                />
              </div>
              <div className='col-span-2   text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>Vendor Name:</h2>
                <input
                  required
                  type='text'
                  value={t_vendorName}
                  onChange={(e) => {
                    setVendorName(e.target.value);
                  }}
                  placeholder='Enter Text'
                  className='text- font-semibold text-black text-base py-2 px-4 w-4/5 overflow-ellipsis outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                />
              </div>
              <span className=' block border-b border-b-4 my-4  border-red-500'></span>
              <div className='  text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>Call off Details:</h2>
                <div className='flex  flex-col '>
                  {[...Array(totalCallOffs)].map((x, i) => {
                    return (
                      <React.Fragment key={`Calloff` + i}>
                        <h2 className='text-lg font-bold text-center '>
                          Call off {i + 1}
                        </h2>

                        <span
                          className='mx-auto  justify-self-end    text-red-500 cursor-pointer '
                          onClick={() => handleCallOffDelete(i)}>
                          <FaTrash />
                        </span>

                        <div className='grid grid-cols-2 mb-4'>
                          <div className='text-center'>
                            <label
                              htmlFor='callOff'
                              className='text-sm font-bold text-center'>
                              Call Off {i + 1} Start
                            </label>

                            <input
                              required
                              type='text'
                              name='callOff'
                              pattern='.*\S.*'
                              onChange={(e) => {
                                let newArr = [...t_coffStart];
                                newArr[i] = e.target.value.trim();
                                if (!newArr[i]) {
                                  newArr.splice(i, 1);
                                }
                                setCoffStart(newArr);
                              }}
                              value={t_coffStart[i] || ''}
                              placeholder='Enter Text'
                              className='text- font-semibold text-black text-base py-2 px-4 w-[200px] outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                            />
                          </div>

                          <div className='text-center'>
                            <label
                              htmlFor='callOff'
                              className='text-sm font-bold text-center'>
                              Call Off {i + 1} End
                            </label>

                            <input
                              required
                              type='text'
                              name='callOff'
                              pattern='.*\S.*'
                              onChange={(e) => {
                                let newArr = [...t_coffEnd];
                                newArr[i] = e.target.value.trim();
                                if (!newArr[i]) {
                                  newArr.splice(i, 1);
                                }
                                setCoffEnd(newArr);
                              }}
                              value={t_coffEnd[i] || ''}
                              placeholder='Enter Text'
                              className='text- font-semibold text-black text-base py-2 px-4 w-[200px] outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                            />
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}

                  <div className='flex justify-end mt-4'>
                    <div
                      className=' cursor-pointer bg-green-400 text-white text-lg px-2 py-1 font-semibold'
                      onClick={() => {
                        setTotalCallOffs(totalCallOffs + 1);
                      }}>
                      <FaPlus />
                    </div>
                  </div>
                </div>
              </div>

              <span className=' block border-b border-b-4 my-4  border-blue-500'></span>

              <div className='  text-lg  flex items-center   gap-4  my-4'>
                <h2 className='text-lg font-bold  '>SES End Date:</h2>
                <div className='flex flex-auto justify-center flex-col'>
                  {[...Array(totalSES)].map((x, i) => {
                    return (
                      <React.Fragment key={'ses' + i}>
                        <label
                          htmlFor='callOff'
                          className='text-sm font-bold text-center '>
                          SES {i + 1} End
                        </label>
                        <div className='flex align-middle items-center justify-center gap-x-3 '>
                          <input
                            required
                            type='text'
                            name='callOff'
                            pattern='.*\S.*'
                            onChange={(e) => {
                              let newArr = [...t_sesEnd];
                              newArr[i] = e.target.value.trim();
                              if (!newArr[i]) {
                                newArr.splice(i, 1);
                              }
                              setSesEnd(newArr);
                            }}
                            value={t_sesEnd[i] || ''}
                            placeholder='Enter Text'
                            className=' font-semibold text-black text-base py-2 px-4 w-[200px] outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                          />
                          <span
                            className=' text-red-500 cursor-pointer '
                            onClick={() => handleSESDelete(i)}>
                            <FaTrash />
                          </span>
                        </div>

                        <br />
                      </React.Fragment>
                    );
                  })}
                  <div className='flex justify-end mt-4'>
                    <div
                      className=' cursor-pointer bg-green-400 text-white text-lg px-2 py-1 font-semibold'
                      onClick={() => {
                        setTotalSES(totalSES + 1);
                      }}>
                      <FaPlus />
                    </div>
                  </div>
                </div>
              </div>
              <span className=' block border-b border-b-4 my-4  border-green-500'></span>

              <div className='  text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>Contract Start Date:</h2>
                <input
                  required
                  type='text'
                  value={t_contractStart}
                  onChange={(e) => {
                    setContractStart(e.target.value);
                  }}
                  placeholder='Enter Text'
                  className='text- font-semibold text-black text-base py-2 px-4 w-2/5 outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                />
              </div>
              <div className='  text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>Contract Start Date:</h2>
                <input
                  required
                  type='text'
                  value={t_contractEnd}
                  onChange={(e) => {
                    setContractEnd(e.target.value);
                  }}
                  placeholder='Enter Text'
                  className='text- font-semibold text-black text-base py-2 px-4 w-2/5 outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                />
              </div>
              <span className=' block border-b border-b-4 my-4  border-orange-500'></span>
              <div className='flex justify-end'>
                <button className='font-bold justify-end underline text-green-400 outline hover:bg-green-400 hover:text-white px-2 rounded-sm hover:outline-green-700'>
                  Save
                </button>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <div className='flex gap-8 pr-4 text-lg'>
              <div
                onClick={handleFormClose}
                className='font-bold underline text-red-400 outline hover:bg-red-400 hover:text-white px-2 rounded-sm hover:outline-red-700'>
                Back
              </div>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};
export default ContractDialog;
