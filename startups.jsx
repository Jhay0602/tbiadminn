import React, { useState } from 'react';

// AddStartup Component (Pop-up form)
const AddStartup = ({ addStartup, closeForm }) => {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !industry || !type) {
      alert("Please fill out all fields.");
      return;
    }

    addStartup({ name, industry, type });
    setName('');
    setIndustry('');
    setType('');
    closeForm();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button 
          className="absolute top-2 right-4 text-gray-400 hover:text-gray-600"
          onClick={closeForm}
        >
          &times;
        </button>
        <h3 className="text-xl font-semibold mb-4">Add New Startup</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">Startup Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter startup name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="industry" className="block text-sm font-medium">Industry</label>
            <input
              id="industry"
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter industry"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium">Category</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Category</option>
              <option value="incubatee">Incubatee</option>
              <option value="investor">Investor</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
            Add Startup
          </button>
        </form>
        <button onClick={closeForm} className="mt-4 text-red-500 hover:text-red-700 w-full text-center">
          Cancel
        </button>
      </div>
    </div>
  );
};
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-6 flex justify-end gap-5 w-full">
      <input
        type="text"
        className="p-2 border rounded-md w-full sm:w-1/2 lg:w-1/4"
        placeholder="Search startups..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};


// CategoryDropdown Component
const CategoryDropdown = ({ setCategory }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md w-64">
      <h3 className="text-xl font-semibold mb-4">Filter by Category</h3>
      <select
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded-md w-full"
      >
        <option value="">All Categories</option>
        <option value="incubatee">Incubatee</option>
        <option value="investor">Investor</option>
      </select>
    </div>
  );
};
const IndustryFilter = ({ setSelectedIndustry }) => {
  return (
    <div className="flex justify-left gap-4 mt-10 mb-10">
      <button onClick={() => setSelectedIndustry('')} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
        All Industries
      </button>
      <button onClick={() => setSelectedIndustry('Technology')} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Technology
      </button>
      <button onClick={() => setSelectedIndustry('Sustainability')} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        Sustainability
      </button>
      <button onClick={() => setSelectedIndustry('Healthcare')} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
        Healthcare
      </button>
      <button onClick={() => setSelectedIndustry('Education')} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
        Education
      </button>
    </div>
  );
};
// GetIndustryColor function
const getIndustryColor = (industry) => {
  switch (industry) {
    case 'Technology':
      return 'bg-blue-100';
    case 'Sustainability':
      return 'bg-green-100';
    case 'Healthcare':
      return 'bg-red-100';
    case 'Education':
      return 'bg-yellow-100';
    default:
      return 'bg-gray-100';
  }
};

// StartupsList Component
const StartupsList = ({ filteredStartups }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredStartups.length > 0 ? (
        filteredStartups.map((startup, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-lg ${getIndustryColor(startup.industry)}`}>
            <h3 className="text-xl font-semibold">{startup.name}</h3>
            <p className="text-sm">{startup.industry}</p>
            <p className="text-sm">{startup.type}</p>
          </div>
        ))
      ) : (
        <p>No startups found.</p>
      )}
    </div>
  );
};const StartupsPage = () => {
  const [startups, setStartups] = useState([
    { name: "Tech Innovators", industry: "Technology", type: "incubatee" },
    { name: "Green Ventures", industry: "Sustainability", type: "incubatee" },
    { name: "Health Plus", industry: "Healthcare", type: "investor" },
    { name: "EduGrowth", industry: "Education", type: "investor" },
    { name: "NextGen Health", industry: "Healthcare", type: "incubatee" },
    { name: "Future Tech", industry: "Technology", type: "investor" },
    { name: "Sustainable Solutions", industry: "Sustainability", type: "investor" },
    { name: "EduLeap", industry: "Education", type: "incubatee" },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [category, setCategory] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Add startup to the list
  const addStartup = (startup) => {
    setStartups([...startups, startup]);
  };

  // Filter startups based on search query, selected industry, and category
  const filteredStartups = startups.filter((startup) => {
    const matchesSearch = startup.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry ? startup.industry === selectedIndustry : true;
    const matchesCategory = category ? startup.type === category : true;
    return matchesSearch && matchesIndustry && matchesCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">Startups Dashboard</h1>

      {/* Search bar and Add button side by side */}
      <div className="flex justify-between items-center mb-2 gap-2">
  {/* Search Bar */}
  <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

  {/* Add New Startup Button with '+' */}
  <button
  onClick={() => setShowAddForm(!showAddForm)}
  className="text-black px-2 py-2 rounded-md w-full sm:w-1/4 lg:w-1/6 mt-2" // Adds top margin to push it down from the top
>
  <span className="mr-2">+</span> {showAddForm ? "Close Add Form" : "Add New Startup"}
</button>
{showAddForm && <AddStartup addStartup={addStartup} closeForm={() => setShowAddForm(false)} />}
</div>

      <div className="flex justify-between mb-6">
        {/* Category Dropdown */}
        <CategoryDropdown setCategory={setCategory} />
      </div>

      {/* Industry Filter buttons displayed below the category filter */}
      <IndustryFilter setSelectedIndustry={setSelectedIndustry} />

      {/* List of Startups */}
      <StartupsList filteredStartups={filteredStartups} />
    </div>
  );
};


export default StartupsPage;

