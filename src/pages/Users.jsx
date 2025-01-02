import { useEffect, useState } from 'react';
import { useUsers } from '../customeHooks/useAPIfetch';
import { useAuth } from '../contextAPI/AuthContext';
import { useSidebar } from '../contextAPI/sidebarContext';
import { Spinner } from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
    const { data: users, isLoading, error } = useUsers();
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate();
    const { isSidebarOpen } = useSidebar();
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated])

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <div className="text-red-500">Error fetching users: {error.message}</div>;
    }

    const filteredUsers = users?.filter(user =>
        `${user.name.firstname} ${user.name.lastname}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`min-h-screen  ${isSidebarOpen ? 'w-[83vw]' : 'ml-0 w-[94vw]'} transition-all`}

        >
            <div className="w-full mx-auto h-full p-10">
                <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">User Management</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                </div>
                <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
                    <thead className="bg-gray-800 text-white sticky top-0 z-10">
                        <tr >
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">City</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white shadow-md">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <tr key={user.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-all`}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {`${user.name.firstname} ${user.name.lastname}`}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.address.city}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
