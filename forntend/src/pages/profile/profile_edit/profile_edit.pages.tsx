import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authSvc from '../../auth/auth.service';

import { 
  FaUser, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaBriefcase,
  FaIndustry,
  FaStar,
  FaEdit,
  FaCheck
} from 'react-icons/fa';
import profileSvc from '../profile.service';

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
}

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev!,
      [name]: value
    }));
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        if (!user?._id) throw new Error("User ID missing");

        // Create a clean payload with only the fields we want to update
        const payload = {
            name: user.name,
            title: user.title,
            email: user.email,
            industry: user.industry,
            location: user.location,
            experience: user.experience,
            skills: user.skills
        };

        const res = await profileSvc.update(user._id, payload);

        if (res.data && res.data.result) {
            setUser(res.data.result);
            setEditMode(false);
        }
    } catch (error) {
        console.error("Failed to update profile:", error);
        // Add user feedback here (toast notification, etc.)
    }
};

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
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Your Profile</h2>
          {editMode ? (
            <div className="flex space-x-2">
              <button 
                onClick={() => setEditMode(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button 
                type='button'
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#00ADB5] text-white rounded-lg hover:bg-[#008E9B] transition"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-[#00ADB5] text-white rounded-lg hover:bg-[#008E9B] transition flex items-center"
            >
              <FaEdit className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-[#393E46] rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 flex items-start space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#222831] flex items-center justify-center overflow-hidden border-2 border-[#00ADB5]">
                {user.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-3xl text-[#00ADB5]" />
                )}
              </div>
              
            </div>

            <div className="flex-1">
              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#EEEEEE] mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      className="w-full bg-[#222831] border border-[#393E46] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#EEEEEE] mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={user.title || ''}
                      onChange={handleChange}
                      className="w-full bg-[#222831] border border-[#393E46] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold text-[#EEEEEE]">{user.name}</h3>
                  {user.title && <p className="text-[#00ADB5] mt-1">{user.title}</p>}
                </div>
              )}
            </div>
          </div>

          {/* Profile Details Table */}
          <div className="border-t border-[#222831]">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-[#222831]">
                  <td className="py-4 px-6 font-medium text-[#EEEEEE] w-1/3">
                    <div className="flex items-center">
                      <FaEnvelope className="text-[#00ADB5] mr-2" />
                      Email
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {editMode ? (
                      <input
                        type="email"
                        name="email"
                        value={user.email || ''}
                        onChange={handleChange}
                        className="w-full bg-[#222831] border border-[#393E46] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                      />
                    ) : (
                      <span>{user.email}</span>
                    )}
                  </td>
                </tr>
                <tr className="border-b border-[#222831]">
                  <td className="py-4 px-6 font-medium text-[#EEEEEE]">
                    <div className="flex items-center">
                      <FaIndustry className="text-[#00ADB5] mr-2" />
                      Industry
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {editMode ? (
                      <input
                        type="text"
                        name="industry"
                        value={user.industry || ''}
                        onChange={handleChange}
                        className="w-full bg-[#222831] border border-[#393E46] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                      />
                    ) : (
                      <span>{user.industry}</span>
                    )}
                  </td>
                </tr>
                <tr className="border-b border-[#222831]">
                  <td className="py-4 px-6 font-medium text-[#EEEEEE]">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-[#00ADB5] mr-2" />
                      Location
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {editMode ? (
                      <input
                        type="text"
                        name="location"
                        value={user.location || ''}
                        onChange={handleChange}
                        className="w-full bg-[#222831] border border-[#393E46] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                      />
                    ) : (
                      <span>{user.location}</span>
                    )}
                  </td>
                </tr>
                <tr className="border-b border-[#222831]">
                  <td className="py-4 px-6 font-medium text-[#EEEEEE]">
                    <div className="flex items-center">
                      <FaStar className="text-[#00ADB5] mr-2" />
                      Experience
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {editMode ? (
                      <input
                        type="text"
                        name="experience"
                        value={user.experience || ''}
                        onChange={handleChange}
                        className="w-full bg-[#222831] border border-[#393E46] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                      />
                    ) : (
                      <span>{user.experience}</span>
                    )}
                  </td>
                </tr>
                <tr className="border-b border-[#222831]">
                  <td className="py-4 px-6 font-medium text-[#EEEEEE]">
                    <div className="flex items-center">
                      <FaBriefcase className="text-[#00ADB5] mr-2" />
                      Role
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="capitalize">{user.role}</span>
                  </td>
                </tr>
                {user.skills && user.skills.length > 0 && (
                  <tr>
                    <td className="py-4 px-6 font-medium text-[#EEEEEE] align-top">
                      <div className="flex items-center">
                        <FaCheck className="text-[#00ADB5] mr-2" />
                        Skills
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {editMode ? (
                        <div>
                          <textarea
                            name="skills"
                            value={user.skills.join(', ')}
                            onChange={(e) => {
                              const skillsArray = e.target.value.split(',').map(skill => skill.trim());
                              setUser(prev => ({
                                ...prev!,
                                skills: skillsArray
                              }));
                            }}
                            className="w-full bg-[#222831] border border-[#393E46] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                            rows={3}
                          />
                          <p className="text-sm text-[#EEEEEE] opacity-70 mt-1">Separate skills with commas</p>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {user.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-[#222831] text-[#00ADB5] px-3 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;