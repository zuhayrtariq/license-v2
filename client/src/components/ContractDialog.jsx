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
  const [t_sesEnd, setSesEnd] = useState(sesEnd);
  const [t_contractStart, setContractStart] = useState(contractStart);
  const [t_contractEnd, setContractEnd] = useState(contractEnd);

  return (
    <div>
      {/* <Button variant='outlined' onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
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
            <form className='w-full'>
              <div className=' text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>PN Number:</h2>
                <input
                  type='text'
                  value={t_pnNo}
                  onChange={(e) => {
                    setPnNo(e.target.value);
                  }}
                  placeholder='Enter Text'
                  className='text- font-semibold text-black text-base py-2 px-4 w-2/5 outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                />
              </div>
              <div className='   text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>Description:</h2>
                <input
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
                <h2 className='text-lg font-bold  '>Call Off Start Date:</h2>
                <div className='grid gap-3 grid-cols-2'>
                  {t_coffStart.map((coffStart, i) => {
                    return (
                      <div className='col-span-1' key={i}>
                        <label
                          htmlFor=''
                          className='text-sm font-bold text-center'>
                          Call off {i + 1}
                        </label>

                        <input
                          type='text'
                          value={coffStart}
                          onChange={(e) => {
                            let newArr = [...t_coffStart];
                            newArr[i] = e.target.value;

                            setCoffStart(newArr);
                          }}
                          placeholder='Enter Text'
                          className='text- font-semibold text-black text-base py-2 px-4 w-[200px] outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                        />
                        <br />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className='  text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>Call Off End Date:</h2>
                <div className='grid gap-3 grid-cols-2'>
                  {t_coffEnd.map((coffEnd, i) => {
                    return (
                      <div className='col-span-1' key={i}>
                        <label
                          htmlFor=''
                          className='text-sm font-bold text-center'>
                          Call off {i + 1}
                        </label>

                        <input
                          type='text'
                          value={coffEnd}
                          onChange={(e) => {
                            let newArr = [...t_coffEnd];
                            newArr[i] = e.target.value;
                            setCoffEnd(newArr);
                          }}
                          placeholder='Enter Text'
                          className='text- font-semibold text-black text-base py-2 px-4 w-[200px] outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                        />
                        <br />
                      </div>
                    );
                  })}
                </div>
              </div>
              <span className=' block border-b border-b-4 my-4  border-blue-500'></span>

              <div className='  text-lg  flex items-center   gap-4  my-4'>
                <h2 className='text-lg font-bold  '>SES End Date:</h2>
                <div className='grid gap-3 grid-cols-2'>
                  {t_sesEnd.map((sesEnd, i) => {
                    return (
                      <div className='col-span-1  ' key={i}>
                        <label
                          htmlFor='ses'
                          className='text-sm font-bold text-center'>
                          SES {i + 1}
                        </label>

                        <input
                          type='text'
                          name='ses'
                          value={sesEnd}
                          onChange={(e) => {
                            let newArr = [...t_sesEnd];
                            newArr[i] = e.target.value;
                            setSesEnd(newArr);
                          }}
                          placeholder='Enter Text'
                          className='text- font-semibold text-black text-base py-2 px-4 w-[200px] outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                        />
                        <br />
                      </div>
                    );
                  })}
                </div>
              </div>
              <span className=' block border-b border-b-4 my-4  border-green-500'></span>

              <div className='  text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>Contract Start Date:</h2>
                <input
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
            </form>
          </DialogContent>
          <DialogActions>
            <div className='flex gap-8 pr-4 text-lg'>
              <button
                onClick={handleFormClose}
                className='font-bold underline text-red-400 outline hover:bg-red-400 hover:text-white px-2 rounded-sm hover:outline-red-700'>
                Back
              </button>
              <button
                onClick={handleFormClose}
                className='font-bold underline text-green-400 outline hover:bg-green-400 hover:text-white px-2 rounded-sm hover:outline-green-700'>
                Save
              </button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};
export default ContractDialog;
