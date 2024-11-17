import { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaSync, FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';

const PendingPosts = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('Pending');
  const [editingPost, setEditingPost] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);  // For the save confirmation message

  useEffect(() => {
    const mockPosts = [
      { id: 1, title: 'Event 1', description: 'Description for Event 1', status: 'Pending', type: 'Event', date: '2024-12-05', time: '10:00 AM', location: 'Hall A' },
      { id: 2, title: 'Startup 1', description: 'Description for Startup 1', status: 'Pending', type: 'Startup', date: '2024-11-25', time: '09:00 AM', industry: 'Technology' },
      { id: 3, title: 'Event 2', description: 'Description for Event 2', status: 'Pending', type: 'Event', date: '2024-12-12', time: '02:00 PM', location: 'Hall B' },
      { id: 4, title: 'Startup 2', description: 'Description for Startup 2', status: 'Pending', type: 'Startup', date: '2024-12-01', time: '11:00 AM', industry: 'Health' },
      { id: 5, title: 'Event 3', description: 'Description for Event 3', status: 'Pending', type: 'Event', date: '2024-12-15', time: '03:00 PM', location: 'Hall C' },
      { id: 6, title: 'Rejected Event 1', description: 'Description for Rejected Event 1', status: 'Rejected', type: 'Event', date: '2024-12-05', time: '10:00 AM', location: 'Hall D' },
      { id: 7, title: 'Rejected Startup 1', description: 'Description for Rejected Startup 1', status: 'Rejected', type: 'Startup', date: '2024-11-25', time: '09:00 AM', industry: 'Technology' },
      { id: 8, title: 'Accepted Event 1', description: 'Description for Accepted Event 1', status: 'Accepted', type: 'Event', date: '2024-12-12', time: '02:00 PM', location: 'Hall E' },
      { id: 9, title: 'Accepted Startup 1', description: 'Description for Accepted Startup 1', status: 'Accepted', type: 'Startup', date: '2024-12-01', time: '11:00 AM', industry: 'Health' }
    ];

    setPosts(mockPosts);
  }, []);

  const handleDelete = () => {
    setPosts(posts.filter(post => post.id !== postToDelete.id));
    setShowDeleteConfirmation(false);
  };

  const handleEdit = (postId, newTitle, newDescription, newIndustry, newLocation) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, title: newTitle, description: newDescription, industry: newIndustry, location: newLocation } 
        : post
    ));
    setEditingPost(null);
    setShowSaveConfirmation(true);  // Show the save confirmation after saving
  };

  const handleRetry = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, status: 'Pending' } : post));
  };

  const filteredPosts = posts
    .filter(post => post.status === filter && post.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const events = filteredPosts.filter(post => post.type === 'Event');
  const startups = filteredPosts.filter(post => post.type === 'Startup');

  const filteredByCategory = category === 'All' ? [...events, ...startups] : (category === 'Event' ? events : startups);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">{filter} Posts</h1>

      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-6">
        {['Pending', 'Accepted', 'Rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded ${filter === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Categories Dropdown */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <label className="mr-4">Filter by Category: </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Event">Event</option>
            <option value="Startup">Startup</option>
          </select>
        </div>
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded w-64"
          />
          <FaSearch className="absolute right-2 top-3 text-gray-500" />
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold">Are you sure you want to delete this post?</h3>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Popup */}
      {editingPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-md w-120">
            <h3 className="text-lg font-semibold mb-4">Edit Post</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit(
                  editingPost.id,
                  e.target.title.value,
                  e.target.description.value,
                  e.target.industry.value,
                  e.target.location.value
                );
              }}
            >
              <input
                type="text"
                name="title"
                defaultValue={editingPost.title}
                className="block mb-4 px-4 py-2 w-full border rounded"
              />
              <textarea
                name="description"
                defaultValue={editingPost.description}
                className="block mb-4 px-4 py-2 w-full border rounded h-24"
              />
              {editingPost.type === 'Startup' && (
                <div className="block mb-4">
                  <label htmlFor="industry" className="block text-sm font-semibold mb-2">Industry</label>
                  <select
                    name="industry"
                    defaultValue={editingPost.industry}
                    className="block mb-4 px-4 py-2 w-full border rounded"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Retail">Retail</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              )}
              {editingPost.type === 'Event' && (
                <input
                  type="text"
                  name="location"
                  defaultValue={editingPost.location}
                  className="block mb-4 px-4 py-2 w-full border rounded"
                />
              )}
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {filteredByCategory.map((post) => (
          <div key={post.id} className={`p-4 border rounded ${post.status === 'Pending' ? 'bg-yellow-100' : post.status === 'Accepted' ? 'bg-green-100' : 'bg-red-100'} relative`}>
            <h4 className="text-xl font-semibold">{post.title}</h4>
            <p>{post.description}</p>
            <p>{post.date} at {post.time}</p>
            {post.type === 'Startup' && <p>Industry: {post.industry}</p>}
            {post.type === 'Event' && <p>Location: {post.location}</p>}

            {/* Action Icons - Positioned to the Right */}
            <div className="absolute top-4 right-4 flex space-x-4">
              {post.status === 'Pending' && (
                <>
                  <button
                    onClick={() => setEditingPost(post)}
                    className="text-blue-500"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setPostToDelete(post);
                      setShowDeleteConfirmation(true);
                    }}
                    className="text-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    onClick={() => handleRetry(post.id)}
                    className="text-yellow-500"
                  >
                    <FaSync />
                  </button>
                </>
              )}
              {post.status === 'Accepted' && (
                <button
                  onClick={() => setPostToDelete(post)}
                  className="text-red-500"
                >
                  <FaTrashAlt />
                </button>
              )}
              {post.status === 'Rejected' && (
                <>
                  <button
                    onClick={() => setEditingPost(post)}
                    className="text-blue-500"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setPostToDelete(post);
                      setShowDeleteConfirmation(true);
                    }}
                    className="text-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    onClick={() => handleRetry(post.id)}
                    className="text-yellow-500"
                  >
                    <FaSync />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Save Confirmation */}
      {showSaveConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold">Changes Saved Successfully!</h3>
            <div className="mt-4">
              <button
                onClick={() => setShowSaveConfirmation(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingPosts;
