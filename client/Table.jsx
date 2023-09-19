import React, { useState } from 'react'

const Table = () => {
  const [pnNo, setPnNo] = useState('');
  const [description, setDescription] = useState('')
  const [vendorName, setVendorName] = useState('')
  const [coffStart, setCoffStart] = useState('')
  const [coffEnd, setCoffEnd] = useState('')
  const [contractStart, setContractStart] = useState('');
  const [contractEnd, setContractEnd] = useState('');
  const [showSave,setShowSave] = useState(false);
  if(pnNo && description && vendorName && coffStart && coffEnd && contractStart && contractEnd && !showSave)
  {
    // setShowSave(true);
  }

    const TABLE_HEAD = ["PN No.", "Description", "Vendor Name", "COFF Start Date", "COFF End Date", "Contract Start Date", "Contract End Date"];
    const TABLE_ROWS = [
        {
            pn_no: "5000018937",
          description: "Internet Bandwidth Services - Primary Link",
          vendor_name: "Wateen Telecom Limited",
          coff_start : "1-Jul-23",
          coff_end : "31-Oct-23",
          contract_start : "30-Sep-23",
          contract_end : "30-Jun-23",
        },
       
       
      ];
    return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center  text-sm font-light">
              <thead className="border-b  font-medium dark:border-neutral-500 bg-green-700 text-gray-50">
                <tr>
                    {TABLE_HEAD.map((heading) =>{
                       return <th scope="col" className="px-2 py-3">{heading}</th>
                    })}
                  
              
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((rowData)=>{
                  
                    return(
                 <tr className="border-b dark:border-neutral-500">
                 <td className="whitespace-nowrap px-2 py-3 font-medium">{rowData.pn_no}</td>
                 <td className="whitespace-nowrap px-2 py-3">{rowData.description}</td>
                 <td className="whitespace-nowrap px-2 py-3">{rowData.vendor_name}</td>
                 <td className="whitespace-nowrap px-2 py-3">{rowData.coff_start}</td>
                 <td className="whitespace-nowrap px-2 py-3">{rowData.coff_end}</td>
                 <td className="whitespace-nowrap px-2 py-3">{rowData.contract_start}</td>
                 <td className="whitespace-nowrap px-2 py-3">{rowData.contract_end}</td>
                </tr>)
                })}
               <tr className="border-b dark:border-neutral-500">
                 <td className="whitespace-nowrap px-2 py-3 font-medium">
                 <input type="number" onChange={(e)=>{
                  setPnNo(e.target.value)
                 }} className='border-2 w-11/12 py-2 rounded-md px-1' name="" id="" />
                 </td>
                 <td className="whitespace-nowrap px-2 py-3"><input type="text" onChange={(e)=>{
                  setDescription(e.target.value)
                 }} className='border-2 w-11/12 py-2 rounded-md px-1' name="" id="" /></td>
                 <td className="whitespace-nowrap px-2 py-3"><input type="text" onChange={(e)=>{
                  setVendorName(e.target.value)
                 }} className='border-2 w-11/12 py-2 rounded-md px-1' name="" id="" /></td>
                 <td className="whitespace-nowrap px-2 py-3"><input type="text" onChange={(e)=>{
                  setCoffStart(e.target.value)
                 }}  className='border-2 w-11/12 py-2 rounded-md px-1' name="" id="" /></td>
                 <td className="whitespace-nowrap px-2 py-3"><input type="text" onChange={(e)=>{
                  setCoffEnd(e.target.value)
                 }}  className='border-2 w-11/12 py-2 rounded-md px-1' name="" id="" /></td>
                 <td className="whitespace-nowrap px-2 py-3"><input type="text" onChange={(e)=>{
                  setContractStart(e.target.value)
                 }}  className='border-2 w-11/12 py-2 rounded-md px-1' name="" id="" /></td>
                 <td className="whitespace-nowrap px-2 py-3"><input type="text" onChange={(e)=>{
                  setContractEnd(e.target.value);
                  console.log(contractStart)
                 }}  className='border-2 w-11/12 py-2 rounded-md px-1' name="" id="" /></td>
                </tr>
               
              </tbody>
            </table>
            {(pnNo && description && vendorName && coffStart && coffEnd && contractStart && contractEnd) &&(
<div className='flex justify-end  py-2'>
  <div><button className='text-bold mr-4 bg-green-600 rounded-lg px-2 py-2 text-white hover:brightness-110'>Add New Record</button>
</div>
</div>
            )
             
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table