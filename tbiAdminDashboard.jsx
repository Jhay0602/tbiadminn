import React, { useEffect, useRef, useState } from 'react';
import jQuery from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net';
import { HiOutlineMail, HiOutlineBell, HiOutlineUser } from 'react-icons/hi';
import { FaChartPie, FaUsers, FaClipboardList, FaCogs, FaInfoCircle, FaLifeRing, FaSignOutAlt } from 'react-icons/fa';
import { AiOutlineAppstore, AiFillSetting } from 'react-icons/ai';
import { BsPersonBadge, BsGraphUp } from 'react-icons/bs';
import { RiAdminLine } from 'react-icons/ri';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Startups from './startups';  // Adjust the path if needed
import PendingPosts from './pendingpost'; // Proper casing for import
import Events from './events'; // Proper casing for import
import Settings from './settings'; // Make sure the correct path is used





// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DataTableComponent = () => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const [totalIncubatees, setTotalIncubatees] = useState(0);
  const [totalStartups, setTotalStartups] = useState(0);
  const [pendingPosts, setPendingPosts] = useState(0);

  // Fetch data from the backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/mvinetproject/src/api/getIncubateesData.php');
        const result = await response.json();
        setData(result);

        // Count metrics for the dashboard
        setTotalIncubatees(result.length);
        setTotalStartups(result.filter(item => item.business_type === 'startup').length);
        setPendingPosts(result.filter(item => item.status === 'pending').length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Initialize DataTable when data is loaded
  useEffect(() => {
    if (data.length > 0 && activeSection === 'memberslist') {
      const table = jQuery(tableRef.current).DataTable();
      return () => {
        table.destroy();
      };
    }
  }, [data, activeSection]);

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  // Define sidebar sections with new icons
  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: { outline: FaChartPie, fill: AiOutlineAppstore } },
    { id: 'startups', label: 'Startups', icon: { outline: BsGraphUp, fill: BsGraphUp } },
    { id: 'memberslist', label: 'Incubatee Management', icon: { outline: FaUsers, fill: FaUsers } },
    { id: 'pendingpost', label: 'Pending Post', icon: { outline: RiAdminLine, fill: RiAdminLine } },
    { id: 'events', label: 'Events', icon: { outline: AiFillSetting, fill: AiFillSetting } },
    { id: 'settings', label: 'Settings', icon: { outline: AiFillSetting, fill: AiFillSetting } },
    { id: 'helpandsupport', label: 'Help & Support', icon: { outline: FaLifeRing, fill: FaLifeRing } },
    { id: 'about', label: 'About', icon: { outline: FaInfoCircle, fill: FaInfoCircle } },
    { id: 'logout', label: 'Logout', icon: { outline: FaSignOutAlt, fill: FaSignOutAlt } },
  ];
  // Chart Data
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Incubatees Growth',
        data: [5, 10, 15, 12, 20, 25],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Incubatee Growth Over Time',
      },
    },
  };

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <nav className={`bg-gray-50 h-full transition-all duration-300 ${isSidebarExpanded ? 'w-64' : 'w-20'} flex-shrink-0`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">☰</button>
        </div>
        <div className="text-center font-semibold text-lg py-2 text-blue-500">TBI Admin</div>

        <ul className="mt-5 space-y-4">
          {sections.map((section) => {
            const { outline, fill } = section.icon;
            const IconComponent = activeSection === section.id ? fill : outline;
            return (
              <li
                key={section.id}
                className={`flex items-center p-4 cursor-pointer rounded hover:bg-gray-100 ${activeSection === section.id ? 'bg-blue-100' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <div className={`flex items-center justify-center ${activeSection === section.id ? 'text-blue-500' : 'text-gray-600'}`} style={{ width: '40px', height: '40px' }}>
                  <IconComponent className="text-2xl" />
                </div>
                {isSidebarExpanded && <span className="ml-4">{section.label}</span>}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 p-5 overflow-y-auto">
        {/* Dashboard Section with Metrics and Chart */}
        {activeSection === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Total Incubatees */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Total Incubatees</h3>
                <p className="text-2xl font-bold text-blue-500">{totalIncubatees}</p>
              </div>

              {/* Total Startups */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Total Startups</h3>
                <p className="text-2xl font-bold text-blue-500">{totalStartups}</p>
              </div>

              {/* Pending Posts */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Pending Posts</h3>
                <p className="text-2xl font-bold text-red-500">{pendingPosts}</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Incubatee Growth Over Time</h3>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        )}

        {/* Startups Section */}
        {activeSection === 'startups' && <Startups />}

        {/* Pending Posts Section */}
        {activeSection === 'pendingpost' && <PendingPosts />}

         {/* Pending Posts Section */}
        {activeSection === 'events' && <Events />}
        {/* Settings Section */}
{activeSection === 'settings' && <Settings />}

        {/* Incubatee Management Section */}
        {activeSection === 'memberslist' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">Member List</h3>
            <div className="overflow-x-auto">
              <table ref={tableRef} className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business Type
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.business_type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTableComponent;
