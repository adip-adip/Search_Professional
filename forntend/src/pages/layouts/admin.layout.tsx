import { Link, Outlet } from 'react-router-dom';
import { FiHome, FiUser, FiBriefcase, FiSettings, FiLogOut, FiBell, FiSearch } from 'react-icons/fi';

const AdminLayout = () => {
  return (
    <div className="min-h-screen w-full bg-[#222831] text-[#EEEEEE] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#393E46] shadow-lg fixed h-full">
        <div className="p-4 border-b border-[#222831]">
          <h1 className="text-2xl font-semibold">ProConnect</h1>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className="flex items-center p-3 rounded-lg hover:bg-[#00ADB5] hover:bg-opacity-20 transition-colors">
                <FiHome className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/profile" className="flex items-center p-3 rounded-lg hover:bg-[#00ADB5] hover:bg-opacity-20 transition-colors">
                <FiUser className="mr-3" />
                My Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard/projects" className="flex items-center p-3 rounded-lg hover:bg-[#00ADB5] hover:bg-opacity-20 transition-colors">
                <FiBriefcase className="mr-3" />
                Projects
              </Link>
            </li>
            <li>
              <Link to="/dashboard/settings" className="flex items-center p-3 rounded-lg hover:bg-[#00ADB5] hover:bg-opacity-20 transition-colors">
                <FiSettings className="mr-3" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-[#222831]">
          <button className="flex items-center p-3 rounded-lg w-full hover:bg-[#00ADB5] hover:bg-opacity-20 transition-colors">
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Navigation */}
        <header className="bg-[#393E46] shadow-sm p-4 flex items-center justify-between">
          <div className="relative w-1/3">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EEEEEE] opacity-80" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-[#222831] border border-[#393E46] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] text-[#EEEEEE]"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-[#222831]">
              <FiBell className="text-xl" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#00ADB5]"></span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-[#00ADB5] flex items-center justify-center text-white">
                JD
              </div>
              <span className="font-medium">John Doe</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Page Title */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
            <button className="bg-[#00ADB5] hover:bg-[#008E9B] text-white px-4 py-2 rounded-lg transition-colors">
              New Project
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-[#393E46] p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-2">Total Projects</h3>
              <p className="text-3xl font-bold text-[#00ADB5]">12</p>
            </div>
            <div className="bg-[#393E46] p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-2">Connections</h3>
              <p className="text-3xl font-bold text-[#00ADB5]">47</p>
            </div>
            <div className="bg-[#393E46] p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-2">Messages</h3>
              <p className="text-3xl font-bold text-[#00ADB5]">5</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#393E46] rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start pb-4 border-b border-[#222831]">
                <div className="h-10 w-10 rounded-full bg-[#00ADB5] flex items-center justify-center text-white mr-4">
                  JD
                </div>
                <div>
                  <p className="font-medium">You connected with Sarah Johnson</p>
                  <p className="text-sm text-[#EEEEEE] opacity-80">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start pb-4 border-b border-[#222831]">
                <div className="h-10 w-10 rounded-full bg-[#00ADB5] flex items-center justify-center text-white mr-4">
                  JD
                </div>
                <div>
                  <p className="font-medium">New project "Website Redesign" created</p>
                  <p className="text-sm text-[#EEEEEE] opacity-80">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-[#00ADB5] flex items-center justify-center text-white mr-4">
                  JD
                </div>
                <div>
                  <p className="font-medium">Your profile was viewed 15 times</p>
                  <p className="text-sm text-[#EEEEEE] opacity-80">2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Outlet for nested routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;