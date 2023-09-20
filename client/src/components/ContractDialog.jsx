import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';

const ContractDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'sm'}
        fullWidth={true}>
        <div className='flex flex-col bg-gray-100  py-5  '>
          <DialogTitle>
            <h1 className='text-2xl text-center py-4 px-4 font-bold'>
              Contract Details
            </h1>
          </DialogTitle>
          <DialogContent>
            <form className='w-full'>
              <div className='  text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>PN Number:</h2>
                <input
                  type='text'
                  placeholder='Enter Text'
                  className='text- font-semibold text-black text-base py-2 px-4 w-2/5 outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                />
              </div>
              <div className='   text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>Description:</h2>
                <input
                  type='text'
                  placeholder='Enter Text'
                  className='text- font-semibold text-black text-base py-2 px-4 w-4/5 overflow-ellipsis outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                />
              </div>
              <div className='col-span-2   text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>Vendor Name:</h2>
                <input
                  type='text'
                  placeholder='Enter Text'
                  className='text- font-semibold text-black text-base py-2 px-4 w-4/5 overflow-ellipsis outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                />
              </div>
              <div className='  text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>Call Off Start Date:</h2>
                <input
                  type='text'
                  placeholder='Enter Text'
                  className='text- font-semibold text-black text-base py-2 px-4 w-2/5 outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                />
              </div>
              <div className='  text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>Call Off End Date:</h2>
                <input
                  type='text'
                  placeholder='Enter Text'
                  className='text- font-semibold text-black text-base py-2 px-4 w-2/5 outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                />
              </div>
              <div className='  text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>Call Off End Date:</h2>
                <input
                  type='text'
                  placeholder='Enter Text'
                  className='text- font-semibold text-black text-base py-2 px-4 w-2/5 outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                />
              </div>
              <div className='  text-lg  flex items-center gap-4  my-4'>
                <h2 className='text-lg font-bold  '>Call Off End Date:</h2>
                <input
                  type='text'
                  placeholder='Enter Text'
                  className='text- font-semibold text-black text-base py-2 px-4 w-2/5 outline-none rounded-lg bg-inherit border-b-2 focus:border-black brightness-75 focus:font-bold'
                />
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <div className='flex gap-8 pr-4 text-lg'>
              <button
                onClick={handleClose}
                className='font-bold underline text-red-400'>
                Back
              </button>
              <button
                onClick={handleClose}
                className='font-bold underline text-green-400'>
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
