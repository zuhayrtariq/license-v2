const Header = () =>{
    return(
        <header className='flex justify-between sm:text-xl bg-gray-200 py-1 items-center px-2 mb-8'>
           {/* <img src={'/logo.jpg'} alt='' width={80} /> */}
           <h1 className="font-bold text-green-700">Contract Licenses</h1> 
           <div className='flex items-center gap-2'>
           <button
              className=' underline  text-primary font-semibold  px-4 py-2 rounded-full hover:font-bold duration-200 '
              >
              Login
            </button>
           </div>
        </header>
        
    )
}
export default Header   