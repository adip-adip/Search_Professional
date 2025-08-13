import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authSvc from '../../auth/auth.service';
import { 
  FaUser, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaBriefcase,
  FaPhone,
  FaInstagram,
  FaEdit
} from 'react-icons/fa';

export interface UserInterface {
  name: string;
  email?: string;
  _id?: string;
  role?: string;
  title?: string;
  industry?: string;
  location?: string;
  experience?: string;
  skills?: string[];
  profilePicture?: string;
  phone?: string;
  socialMedia?: string;
}

const ViewProfile = () => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authSvc.getLoggedInuser();
        setUser(res.data.result);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#222831] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00ADB5]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#222831] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load user data</p>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-[#00ADB5] hover:bg-[#008E9B] text-white rounded transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE]">
      {/* Header */}
      <header className="bg-[#393E46] shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">ProConnect</h1>
            <div className="flex items-center space-x-4">
              <span className="text-[#EEEEEE]">Hello, {user.name}</span>
              <button
                onClick={() => navigate('/home')}
                className="px-4 py-2 bg-[#00ADB5] hover:bg-[#008E9B] text-white rounded transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Your Profile</h2>
          <Link 
            to={`/update/${user._id}`}
            className="px-4 py-2 bg-[#00ADB5] text-white rounded-lg hover:bg-[#008E9B] transition flex items-center"
          >
            <FaEdit className="mr-2" />
            Edit Profile
          </Link>
        </div>

        {/* Profile Header */}
        <div className="bg-[#393E46] shadow rounded-lg overflow-hidden mb-8">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-[#00ADB5] to-[#393E46]"></div>
          
          {/* Profile Info */}
          <div className="px-6 py-4 relative">
            {/* Avatar */}
            <div className="absolute -top-16 left-6 border-4 border-[#393E46] rounded-full overflow-hidden">
              {user.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt="Profile"
                  className="h-32 w-32 object-cover"
                />
              ) : (
                <div className="h-32 w-32 bg-[#222831] flex items-center justify-center">
                  <FaUser className="text-5xl text-[#00ADB5]" />
                </div>
              )}
            </div>
            
            {/* User Info */}
            <div className="ml-40">
              <h1 className="text-2xl font-bold text-[#EEEEEE]">{user.name}</h1>
              <p className="text-[#00ADB5]">{user.title}</p>
              <div className="flex items-center mt-2 text-gray-400">
                <FaMapMarkerAlt className="w-5 h-5 mr-1 text-[#00ADB5]" />
                <span>{user.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Experience Section */}
            <div className="bg-[#393E46] shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#EEEEEE] mb-4">Experience</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-[#00ADB5] pl-4 py-2">
                  <h3 className="font-medium text-[#EEEEEE]">Senior Frontend Developer</h3>
                  <p className="text-gray-400">TechCorp Inc.</p>
                  <p className="text-gray-400 mt-1">{user.experience || 'No experience description'}</p>
                </div>
                <div className="border-l-4 border-[#00ADB5] pl-4 py-2">
                  <h3 className="font-medium text-[#EEEEEE]">Frontend Developer</h3>
                  <p className="text-gray-400">WebSolutions Ltd.</p>
                  <p className="text-gray-400 mt-1">Developed and maintained multiple client projects using React and Redux.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills Section */}
            <div className="bg-[#393E46] shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#EEEEEE] mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills && user.skills.length > 0 ? (
                  user.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-[#222831] text-[#00ADB5] rounded-full text-sm">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400">No skills listed</p>
                )}
              </div>
            </div>
            
            {/* Role Section */}
            <div className="bg-[#393E46] shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#EEEEEE] mb-4">Role</h2>
              <div className="flex items-center text-gray-400">
                <FaBriefcase className="text-[#00ADB5] mr-2" />
                <span className="capitalize">{user.role || 'No role specified'}</span>
              </div>
            </div>
            
            {/* Contact Section */}
            <div className="bg-[#393E46] shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#EEEEEE] mb-4">Contact</h2>
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <FaEnvelope className="text-[#00ADB5] mr-2" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <FaPhone className="text-[#00ADB5] mr-2" />
                  <span>{user.phone || 'No phone provided'}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <FaInstagram className="text-[#00ADB5] mr-2" />
                  <span>{user.socialMedia ? `@${user.socialMedia}` : 'No social media provided'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;