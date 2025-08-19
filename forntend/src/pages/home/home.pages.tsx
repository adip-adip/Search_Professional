import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authSvc from '../auth/auth.service';
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCheck,
  FaTimes,
  FaBars,
  FaSearch,
  FaEdit,
  FaAddressCard,
  FaSpinner
} from 'react-icons/fa';
import userListSvc from './home.service';

export interface UserInterface {
  name: string;
  email?: string;
  _id?: string;
  role?: string;
  title?: string;
  location?: string;
  skills?: string[];
  profilePicture?: string;
  verified?: boolean;
  experience?: string;
  industry?: string;
}

const ProfessionalSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
    experience: ''
  });

  const [user, setUser] = useState<UserInterface | null>(null);
  const [professionals, setProfessionals] = useState<UserInterface[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingProfessionals, setLoadingProfessionals] = useState(true);
  const [showSidePanel, setShowSidePanel] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await authSvc.getLoggedInuser();
        if (userResponse.data?.result) {
          setUser(userResponse.data.result);
        }

        // Fetch professionals data
        const professionalsResponse = await userListSvc.getUserList();
        
        // Handle both array and { result: [...] } formats
        const professionalsData = Array.isArray(professionalsResponse.data) 
          ? professionalsResponse.data 
          : professionalsResponse.data?.result || [];
        
        setProfessionals(professionalsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingUser(false);
        setLoadingProfessionals(false);
      }
    };

    fetchData();
  }, []);

  const filteredProfessionals = professionals.filter(professional => {
    const matchesSearch = professional?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (professional?.title && professional.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesIndustry = !filters.industry || professional?.industry === filters.industry;
    const matchesLocation = !filters.location || professional?.location === filters.location;
    const matchesExperience = !filters.experience || professional?.experience === filters.experience;

    return matchesSearch && matchesIndustry && matchesLocation && matchesExperience;
  });

  const industries = [...new Set(professionals.map(p => p?.industry).filter(Boolean))];
  const locations = [...new Set(professionals.map(p => p?.location).filter(Boolean))];
  const experiences = [...new Set(professionals.map(p => p?.experience).filter(Boolean))];

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      industry: '',
      location: '',
      experience: ''
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE]">
      {/* Header */}
      <header className="bg-[#393E46] shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">ProConnect</h1>
            <div className="flex items-center space-x-4">
              {loadingUser ? (
                <span className="text-sm opacity-70">Loading user...</span>
              ) : user ? (
                <>
                  <span className="text-[#EEEEEE]">Hello, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <span className="text-sm text-red-400">User not found</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Side Panel */}
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Side Panel */}
        {showSidePanel && (
          <aside className="relative w-full md:w-72 bg-[#393E46] p-6 rounded-lg shadow-lg sticky top-6 h-fit">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Profile</h2>
              <button
                onClick={() => setShowSidePanel(false)}
                className="md:hidden text-[#EEEEEE] hover:text-[#00ADB5]"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {loadingUser ? (
              <div className="flex justify-center items-center h-20">
                <FaSpinner className="animate-spin text-2xl text-[#00ADB5]" />
              </div>
            ) : user ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-[#222831] flex items-center justify-center overflow-hidden border-2 border-[#00ADB5]">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-2xl text-[#00ADB5]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-lg truncate">{user.name}</h3>
                    {user.title && <p className="text-[#00ADB5] text-sm truncate">{user.title}</p>}
                  </div>
                </div>

                <div className="space-y-3">
                  {user.email && (
                    <div className="flex items-start">
                      <FaEnvelope className="w-5 h-5 mr-2 text-[#00ADB5] flex-shrink-0 mt-0.5" />
                      <span className="break-words">{user.email}</span>
                    </div>
                  )}

                  {user.location && (
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="w-5 h-5 mr-2 text-[#00ADB5] flex-shrink-0" />
                      <span>{user.location}</span>
                    </div>
                  )}

                  {user.role && (
                    <div className="flex items-center">
                      <FaBriefcase className="w-5 h-5 mr-2 text-[#00ADB5] flex-shrink-0" />
                      <span className="capitalize">{user.role}</span>
                    </div>
                  )}
                </div>

                {user.skills && user.skills.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-[#222831] text-[#00ADB5] text-sm px-3 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <button
                    onClick={() => navigate(`/update/${user._id}`, { state: { user } })}
                    className="w-full mt-4 px-4 py-2 bg-[#00ADB5] hover:bg-[#008E9B] text-white rounded transition-colors font-medium flex items-center justify-center"
                  >
                    <FaEdit className="mr-2" />
                    Edit Profile
                  </button>
                  <button
                    onClick={() => navigate('/profile')}
                    className="w-full mt-2 px-4 py-2 bg-[#00ADB5] hover:bg-[#008E9B] text-white rounded transition-colors font-medium flex items-center justify-center"
                  >
                    <FaAddressCard className="mr-2" />
                    View Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-red-400 mb-4">User information not available</p>
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-[#00ADB5] hover:bg-[#008E9B] text-white rounded transition-colors"
                >
                  Sign In
                </button>
              </div>
            )}
          </aside>
        )}

        {/* Main Content */}
        <main className={`flex-1 ${!showSidePanel ? 'md:ml-0' : ''}`}>
          {!showSidePanel && (
            <button
              onClick={() => setShowSidePanel(true)}
              className="mb-4 flex items-center text-[#00ADB5] hover:text-[#008E9B] transition-colors"
            >
              <FaBars className="w-5 h-5 mr-2" />
              Show Profile
            </button>
          )}

          {/* Search Section */}
          <section className="bg-[#393E46] rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Find Qualified Professionals</h2>
            <p className="text-[#EEEEEE] mb-6 opacity-80">Search by name, title, or filter by specific criteria</p>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name or profession..."
                  className="w-full pl-10 pr-4 py-3 bg-[#222831] border border-[#393E46] rounded focus:outline-none focus:ring-2 focus:ring-[#00ADB5] text-[#EEEEEE]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="px-6 py-3 bg-[#00ADB5] hover:bg-[#008E9B] text-[#EEEEEE] rounded transition-colors">
                Search
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <select
                className="px-4 py-3 bg-[#222831] border border-[#393E46] rounded focus:outline-none focus:ring-2 focus:ring-[#00ADB5] text-[#EEEEEE]"
                value={filters.industry}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
              >
                <option value="">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>

              <select
                className="px-4 py-3 bg-[#222831] border border-[#393E46] rounded focus:outline-none focus:ring-2 focus:ring-[#00ADB5] text-[#EEEEEE]"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              <select
                className="px-4 py-3 bg-[#222831] border border-[#393E46] rounded focus:outline-none focus:ring-2 focus:ring-[#00ADB5] text-[#EEEEEE]"
                value={filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
              >
                <option value="">All Experience Levels</option>
                {experiences.map(experience => (
                  <option key={experience} value={experience}>{experience}</option>
                ))}
              </select>

              <button
                onClick={clearFilters}
                className="px-4 py-3 bg-[#393E46] hover:bg-[#00ADB5] text-[#EEEEEE] rounded transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </section>

          {/* Results Section */}
          <section>
            <h3 className="text-xl font-medium mb-4">
              {filteredProfessionals.length} {filteredProfessionals.length === 1 ? 'Professional' : 'Professionals'} Found
            </h3>

            {loadingProfessionals ? (
              <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-4xl text-[#00ADB5]" />
              </div>
            ) : filteredProfessionals.length === 0 ? (
              <div className="bg-[#393E46] rounded-lg shadow-lg p-8 text-center text-[#EEEEEE] opacity-80">
                {professionals.length === 0 
                  ? "No professionals available" 
                  : "No professionals match your search criteria. Try adjusting your filters."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProfessionals.map(professional => (
                  <div
                    key={professional._id || professional.id}
                    className="bg-[#393E46] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-semibold">{professional.name}</h4>
                        {professional.verified && (
                          <span className="bg-[#00ADB5] text-[#EEEEEE] text-xs px-3 py-1 rounded-full flex items-center">
                            <FaCheck className="w-3 h-3 mr-1" />
                            Verified
                          </span>
                        )}
                      </div>

                      {professional.title && (
                        <p className="text-[#00ADB5] font-medium mb-2">{professional.title}</p>
                      )}
                      {professional.location && (
                        <p className="text-[#EEEEEE] text-sm mb-3 opacity-80">{professional.location}</p>
                      )}
                      {professional.experience && (
                        <p className="text-[#EEEEEE] text-sm mb-4 opacity-60">{professional.experience} experience</p>
                      )}

                      {professional.skills && professional.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {professional.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-[#222831] text-[#00ADB5] text-xs px-3 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button 
                          onClick={() => navigate(`/profile/${professional._id || professional.id}`)}
                          className="flex-1 bg-[#222831] hover:bg-[#00ADB5] text-[#EEEEEE] px-4 py-2 rounded text-sm font-medium transition-colors"
                        >
                          View Profile
                        </button>
                        <button className="flex-1 bg-[#00ADB5] hover:bg-[#008E9B] text-[#EEEEEE] px-4 py-2 rounded text-sm font-medium transition-colors">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#393E46] py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-semibold mb-4 md:mb-0">ProConnect</div>
            <div className="flex space-x-6">
              <a href="#" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-colors">About</a>
              <a href="#" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-colors">Contact</a>
              <a href="#" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-colors">Privacy</a>
              <a href="#" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-colors">Terms</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-[#222831] text-center text-[#EEEEEE] opacity-80">
            &copy; {new Date().getFullYear()} ProConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalSearch;