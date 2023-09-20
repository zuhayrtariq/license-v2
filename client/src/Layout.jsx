import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
  return (
    <div className='p-4  overflow-x-hidden flex flex-col min-h-screen bg-gray-100 '>
      <Header />
      <Outlet />
    </div>
  );
};
export default Layout;
