import { Sidebar } from '../components/Sidebar'
import { Outlet } from 'react-router-dom';

const Layout = () => {
   
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar/>
            <div className=" w-[70%]">
                <Outlet /> 
            </div>
        </div>
    );
};

export default Layout;
