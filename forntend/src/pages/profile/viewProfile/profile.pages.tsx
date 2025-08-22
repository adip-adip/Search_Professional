import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import authSvc from '../../auth/auth.service';
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBriefcase,
  FaPhone,
  FaInstagram,
  FaEdit,
  FaPlus,
  FaCalendarAlt,
  FaTimes
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
  phone?: string;
  socialMedia?: string;
}

export interface ExperienceInterface {
  _id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
  createdBy: string;
  createdAt?: string;
}

const ViewProfile = () => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<UserInterface | null>(null);
  const [experiences, setExperiences] = useState<ExperienceInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    currentJob: false
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from URL params

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Get the logged-in user first
        const loggedInRes = await authSvc.getLoggedInuser();
        const loggedInUserData = loggedInRes.data.result;
        setLoggedInUser(loggedInUserData);

        // If an ID is provided in the URL, fetch that user's data
        if (id) {
          const userRes = await profileSvc.getUserById(id);
          setUser(userRes.data.result);
          
          // Fetch experiences for this user
          const expRes = await profileSvc.getUserExperiences(id);
          setExperiences(expRes.data.data || []);
          
          // Check if this is the logged-in user's own profile
          setIsOwnProfile(loggedInUserData._id === id);
        } else {
          // If no ID provided, show the logged-in user's profile
          setUser(loggedInUserData);
          
          // Fetch experiences for logged-in user
          const expRes = await profileSvc.getUserExperiences(loggedInUserData._id!);
          setExperiences(expRes.data.data || []);
          
          setIsOwnProfile(true);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked,
        ...(checked && { endDate: '' }) // Clear end date if current job is checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitting(true);
  
  try {
    const experienceData = {
      company: formData.company,
      position: formData.position,
      startDate: formData.startDate,
      endDate: formData.currentJob ? undefined : formData.endDate,
      description: formData.description
    };
    
    // Pass the user ID as the first parameter
    const response = await profileSvc.addExperience(experienceData);
    
    if (response.data.success) {
      // Refresh experiences
      const expRes = await profileSvc.getUserExperiences(loggedInUser!._id!);
      setExperiences(expRes.data.data || []);
      
      // Close modal and reset form
      setShowExperienceModal(false);
      setFormData({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        currentJob: false
      });
    }
  } catch (error) {
    console.error("Failed to add experience:", error);
  } finally {
    setSubmitting(false);
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
            onClick={() => navigate('/home')}
            className="px-4 py-2 bg-[#00ADB5] hover:bg-[#008E9B] text-white rounded transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE]">
      {/* Experience Modal */}
      {showExperienceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#393E46] rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-[#222831]">
              <h3 className="text-lg font-semibold">Add Experience</h3>
              <button 
                onClick={() => setShowExperienceModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Company *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#222831] border border-[#00ADB5] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Position *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#222831] border border-[#00ADB5] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#222831] border border-[#00ADB5] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    disabled={formData.currentJob}
                    className="w-full bg-[#222831] border border-[#00ADB5] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5] disabled:opacity-50"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="currentJob"
                    checked={formData.currentJob}
                    onChange={handleInputChange}
                    className="mr-2 h-5 w-5 text-[#00ADB5] focus:ring-[#00ADB5] border-gray-300 rounded"
                  />
                  <span>I currently work here</span>
                </label>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-[#222831] border border-[#00ADB5] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowExperienceModal(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-[#00ADB5] hover:bg-[#008E9B] rounded transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Adding...' : 'Add Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-[#393E46] shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">ProConnect</h1>
            <div className="flex items-center space-x-4">
              <span className="text-[#EEEEEE]">Hello, {loggedInUser?.name}</span>
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
          <h2 className="text-2xl font-semibold">
            {isOwnProfile ? 'Your Profile' : `${user.name}'s Profile`}
          </h2>
          {isOwnProfile && (
            <div className="flex gap-4">
              <button
                onClick={() => setShowExperienceModal(true)}
                className="px-4 py-2 bg-[#00ADB5] text-white rounded-lg hover:bg-[#008E9B] transition flex items-center"
              >
                <FaPlus className="mr-2" />
                Add Experience
              </button>
              <Link 
                to={`/update/${user._id}`} 
                className="px-4 py-2 bg-[#00ADB5] text-white rounded-lg hover:bg-[#008E9B] transition flex items-center"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </Link>
            </div>
          )}
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#EEEEEE]">Experience</h2>
                {isOwnProfile && experiences.length > 0 && (
                  <button
                    onClick={() => setShowExperienceModal(true)}
                    className="px-3 py-1 bg-[#00ADB5] text-white rounded-lg hover:bg-[#008E9B] transition flex items-center text-sm"
                  >
                    <FaPlus className="mr-1" />
                    Add More
                  </button>
                )}
              </div>
              
              {experiences.length > 0 ? (
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp._id} className="border-l-4 border-[#00ADB5] pl-4 py-2">
                      <h3 className="font-medium text-[#EEEEEE]">{exp.position}</h3>
                      <p className="text-gray-400">{exp.company}</p>
                      <div className="flex items-center text-gray-400 mt-1">
                        <FaCalendarAlt className="text-[#00ADB5] mr-2" />
                        <span>
                          {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-gray-400 mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-400 mb-4">
                    {isOwnProfile ? "You haven't added any experiences yet." : "This user hasn't added any experiences yet."}
                  </p>
                  {isOwnProfile && (
                    <button
                      onClick={() => setShowExperienceModal(true)}
                      className="px-4 py-2 bg-[#00ADB5] text-white rounded-lg hover:bg-[#008E9B] transition inline-flex items-center"
                    >
                      <FaPlus className="mr-2" />
                      Add Your First Experience
                    </button>
                  )}
                </div>
              )}
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
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;