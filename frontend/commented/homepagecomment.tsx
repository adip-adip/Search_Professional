


// import { useNavigate } from 'react-router-dom';

// export interface UserInterface {
//   id: string;
//   name: string;
//   email: string;
//   title: string;
//   industry: string;
//   location: string;
//   experience: string;
//   skills: string[];
//   connections: number;
//   profileImage?: string;
//   about?: string;
//   education?: {
//     school: string;
//     degree: string;
//     field: string;
//     year: string;
//   }[];
//   workExperience?: {
//     company: string;
//     position: string;
//     duration: string;
//     description: string;
//   }[];
// }

// const ProfessionalSearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();
//   const [filters, setFilters] = useState({
//     industry: '',
//     location: '',
//     experience: ''
//   });

//   // Mock data for the logged-in user
//   const [user, setUser] = useState<UserInterface>({
//     id: 'user-001',
//     name: "Adip Sharma",
//     email: "adip.sharma@example.com",
//     title: "Senior Software Engineer",
//     industry: "Technology",
//     location: "San Francisco, CA",
//     experience: "8 years",
//     skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
//     connections: 243,
//     about: "Passionate full-stack developer with expertise in modern JavaScript frameworks. Focused on creating scalable and maintainable applications.",
//     education: [
//       {
//         school: "Stanford University",
//         degree: "Master's",
//         field: "Computer Science",
//         year: "2015"
//       },
//       {
//         school: "University of California",
//         degree: "Bachelor's",
//         field: "Software Engineering",
//         year: "2013"
//       }
//     ],
//     workExperience: [
//       {
//         company: "TechCorp Inc.",
//         position: "Senior Software Engineer",
//         duration: "2019 - Present",
//         description: "Leading frontend development team and architecting scalable solutions."
//       },
//       {
//         company: "WebSolutions Ltd.",
//         position: "Software Engineer",
//         duration: "2015 - 2019",
//         description: "Developed and maintained multiple web applications using React and Node.js."
//       }
//     ]
//   });

//   const professionals = [
//     {
//       id: 1,
//       name: 'John Smith',
//       title: 'Marketing Director',
//       industry: 'Marketing',
//       location: 'New York, NY',
//       experience: '10+ years',
//       skills: ['Digital Marketing', 'Brand Strategy', 'SEO'],
//       verified: true
//     },
//     {
//       id: 2,
//       name: 'Sarah Johnson',
//       title: 'Software Engineer',
//       industry: 'Technology',
//       location: 'San Francisco, CA',
//       experience: '5-7 years',
//       skills: ['JavaScript', 'React', 'Node.js'],
//       verified: true
//     },
//     {
//       id: 3,
//       name: 'Michael Chen',
//       title: 'Financial Analyst',
//       industry: 'Finance',
//       location: 'Chicago, IL',
//       experience: '3-5 years',
//       skills: ['Financial Modeling', 'Excel', 'Data Analysis'],
//       verified: false
//     }
//   ];

//   const filteredProfessionals = professionals.filter(professional => {
//     const matchesSearch = professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       professional.title.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesIndustry = !filters.industry || professional.industry === filters.industry;
//     const matchesLocation = !filters.location || professional.location === filters.location;
//     const matchesExperience = !filters.experience || professional.experience === filters.experience;

//     return matchesSearch && matchesIndustry && matchesLocation && matchesExperience;
//   });

//   const industries = [...new Set(professionals.map(p => p.industry))];
//   const locations = [...new Set(professionals.map(p => p.location))];
//   const experiences = [...new Set(professionals.map(p => p.experience))];

//   const handleFilterChange = (filterName: string, value: string) => {
//     setFilters(prev => ({
//       ...prev,
//       [filterName]: value
//     }));
//   };

//   const clearFilters = () => {
//     setSearchTerm('');
//     setFilters({
//       industry: '',
//       location: '',
//       experience: ''
//     });
//   };

//   const handleLogout = () => {
//     setUser({
//       id: '',
//       name: '',
//       email: '',
//       title: '',
//       industry: '',
//       location: '',
//       experience: '',
//       skills: [],
//       connections: 0
//     });
//     localStorage.removeItem("token");
//     localStorage.removeItem("refresh");
//     navigate("/");
//     sessionStorage.clear();
//   };

//   const navigateToProfile = () => {
//     navigate(`/profile/${user.id}`);
//   };

//   return (
//     <div className="min-h-screen bg-[#222831] text-[#EEEEEE]">
//       {/* Header */}
//       <header className="bg-[#393E46] shadow-lg">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-semibold">ProConnect</h1>
//             <div className="flex items-center space-x-4">
//               {user.name && (
//                 <>
//                   <span className="text-[#EEEEEE]">Hello, {user.name}</span>
//                   <button
//                     onClick={handleLogout}
//                     className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
//                   >
//                     Logout
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content with Sidebar */}
//       <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
//         {/* User Profile Sidebar - Logged-in User */}
//         <aside className="w-full md:w-80 flex-shrink-0">
//           <div className="bg-[#393E46] rounded-lg shadow-lg overflow-hidden sticky top-8">
//             {/* Profile Header */}
//             <div className="bg-[#00ADB5] p-4 text-center relative">
//               <div className="w-24 h-24 mx-auto rounded-full bg-[#222831] flex items-center justify-center text-4xl font-bold mb-3 text-[#00ADB5]">
//                 {user.name.charAt(0)}
//               </div>
//               <h3 className="text-xl font-semibold">{user.name}</h3>
//               <p className="text-sm opacity-90">{user.title}</p>
//               <p className="text-xs mt-1">{user.location}</p>
//             </div>

//             {/* Profile Details */}
//             <div className="p-4">
//               <div className="mb-6">
//                 <div className="flex justify-between items-center mb-2">
//                   <h4 className="font-medium text-[#00ADB5]">About</h4>
//                   <button 
//                     onClick={navigateToProfile}
//                     className="text-xs text-[#00ADB5] hover:underline"
//                   >
//                     Edit Profile
//                   </button>
//                 </div>
//                 <p className="text-sm">{user.about}</p>
//               </div>

//               <div className="space-y-4 mb-6">
//                 <div>
//                   <h4 className="font-medium text-[#00ADB5] mb-1">Experience</h4>
//                   {user.workExperience && user.workExperience.length > 0 ? (
//                     <div className="space-y-3">
//                       {user.workExperience.map((exp, index) => (
//                         <div key={index} className="text-sm">
//                           <p className="font-medium">{exp.position}</p>
//                           <p className="text-[#00ADB5]">{exp.company}</p>
//                           <p className="text-xs opacity-80">{exp.duration}</p>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-sm opacity-80">No experience added</p>
//                   )}
//                 </div>

//                 <div>
//                   <h4 className="font-medium text-[#00ADB5] mb-1">Education</h4>
//                   {user.education && user.education.length > 0 ? (
//                     <div className="space-y-3">
//                       {user.education.map((edu, index) => (
//                         <div key={index} className="text-sm">
//                           <p className="font-medium">{edu.school}</p>
//                           <p className="text-[#00ADB5]">{edu.degree} in {edu.field}</p>
//                           <p className="text-xs opacity-80">{edu.year}</p>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-sm opacity-80">No education added</p>
//                   )}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <h4 className="font-medium text-[#00ADB5] mb-2">Skills</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {user.skills.map((skill, index) => (
//                     <span 
//                       key={index} 
//                       className="bg-[#222831] text-[#00ADB5] text-xs px-3 py-1 rounded"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex justify-between items-center text-sm">
//                 <div>
//                   <span className="font-medium">{user.connections.toLocaleString()}</span>
//                   <span className="opacity-80"> connections</span>
//                 </div>
//                 <button 
//                   onClick={navigateToProfile}
//                   className="px-4 py-2 bg-[#00ADB5] hover:bg-[#008E9B] text-white rounded-full text-sm transition-colors"
//                 >
//                   View Full Profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content Area */}
//         <main className="flex-1">
//           {/* Search Section */}
//           <section className="bg-[#393E46] rounded-lg shadow-lg p-6 mb-8">
//             <h2 className="text-2xl font-semibold mb-4">Find Qualified Professionals</h2>
//             <p className="text-[#EEEEEE] mb-6 opacity-80">Search by name, title, or filter by specific criteria</p>

//             <div className="flex flex-col md:flex-row gap-4 mb-6">
//               <input
//                 type="text"
//                 placeholder="Search by name or profession..."
//                 className="flex-grow px-4 py-3 bg-[#222831] border border-[#393E46] rounded focus:outline-none focus:ring-2 focus:ring-[#00ADB5] text-[#EEEEEE]"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <button className="px-6 py-3 bg-[#00ADB5] hover:bg-[#008E9B] text-[#EEEEEE] rounded transition-colors">
//                 Search
//               </button>
//             </div>

//             {/* Filters */}
//             <div className="flex flex-col md:flex-row gap-4 mb-4">
//               <select
//                 className="px-4 py-3 bg-[#222831] border border-[#393E46] rounded focus:outline-none focus:ring-2 focus:ring-[#00ADB5] text-[#EEEEEE]"
//                 value={filters.industry}
//                 onChange={(e) => handleFilterChange('industry', e.target.value)}
//               >
//                 <option value="">All Industries</option>
//                 {industries.map(industry => (
//                   <option key={industry} value={industry}>{industry}</option>
//                 ))}
//               </select>

//               <select
//                 className="px-4 py-3 bg-[#222831] border border-[#393E46] rounded focus:outline-none focus:ring-2 focus:ring-[#00ADB5] text-[#EEEEEE]"
//                 value={filters.location}
//                 onChange={(e) => handleFilterChange('location', e.target.value)}
//               >
//                 <option value="">All Locations</option>
//                 {locations.map(location => (
//                   <option key={location} value={location}>{location}</option>
//                 ))}
//               </select>

//               <select
//                 className="px-4 py-3 bg-[#222831] border border-[#393E46] rounded focus:outline-none focus:ring-2 focus:ring-[#00ADB5] text-[#EEEEEE]"
//                 value={filters.experience}
//                 onChange={(e) => handleFilterChange('experience', e.target.value)}
//               >
//                 <option value="">All Experience Levels</option>
//                 {experiences.map(experience => (
//                   <option key={experience} value={experience}>{experience}</option>
//                 ))}
//               </select>

//               <button
//                 onClick={clearFilters}
//                 className="px-4 py-3 bg-[#393E46] hover:bg-[#00ADB5] text-[#EEEEEE] rounded transition-colors"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           </section>

//           {/* Results Section */}
//           <section>
//             <h3 className="text-xl font-medium mb-4">
//               {filteredProfessionals.length} {filteredProfessionals.length === 1 ? 'Professional' : 'Professionals'} Found
//             </h3>

//             {filteredProfessionals.length === 0 ? (
//               <div className="bg-[#393E46] rounded-lg shadow-lg p-8 text-center text-[#EEEEEE] opacity-80">
//                 No professionals match your search criteria. Try adjusting your filters.
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
//                 {filteredProfessionals.map(professional => (
//                   <div
//                     key={professional.id}
//                     className="bg-[#393E46] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
//                   >
//                     <div className="p-6">
//                       <div className="flex justify-between items-start mb-4">
//                         <h4 className="text-xl font-semibold">{professional.name}</h4>
//                         {professional.verified && (
//                           <span className="bg-[#00ADB5] text-[#EEEEEE] text-xs px-3 py-1 rounded-full flex items-center">
//                             <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                             </svg>
//                             Verified
//                           </span>
//                         )}
//                       </div>

//                       <p className="text-[#00ADB5] font-medium mb-2">{professional.title}</p>
//                       <p className="text-[#EEEEEE] text-sm mb-3 opacity-80">{professional.location}</p>
//                       <p className="text-[#EEEEEE] text-sm mb-4 opacity-60">{professional.experience} experience</p>

//                       <div className="flex flex-wrap gap-2 mb-6">
//                         {professional.skills.map(skill => (
//                           <span
//                             key={skill}
//                             className="bg-[#222831] text-[#00ADB5] text-xs px-3 py-1 rounded"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>

//                       <div className="flex gap-3">
//                         <button className="flex-1 bg-[#222831] hover:bg-[#00ADB5] text-[#EEEEEE] px-4 py-2 rounded text-sm font-medium transition-colors">
//                           View Profile
//                         </button>
//                         <button className="flex-1 bg-[#00ADB5] hover:bg-[#008E9B] text-[#EEEEEE] px-4 py-2 rounded text-sm font-medium transition-colors">
//                           Connect
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </section>
//         </main>
//       </div>

//       {/* Footer */}
//       <footer className="bg-[#393E46] py-8 mt-12">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="text-xl font-semibold mb-4 md:mb-0">ProConnect</div>
//             <div className="flex space-x-6">
//               <a href="#" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-colors">About</a>
//               <a href="#" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-colors">Contact</a>
//               <a href="#" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-colors">Privacy</a>
//               <a href="#" className="text-[#EEEEEE] hover:text-[#00ADB5] transition-colors">Terms</a>
//             </div>
//           </div>
//           <div className="mt-6 pt-6 border-t border-[#222831] text-center text-[#EEEEEE] opacity-80">
//             &copy; {new Date().getFullYear()} ProConnect. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default ProfessionalSearch;