import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Gallery = ({ category }) => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const { data } = await axios.get(`/api/memories/${category}`, {
          withCredentials: true
        });
        setMemories(data);
      } catch (error) {
        setError('Error fetching memories');
      } finally {
        setLoading(false);
      }
    };
    fetchMemories();
  }, [category]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/memories/${id}`, { withCredentials: true });
      setMemories(memories.filter(m => m._id !== id));
      setSelected(null);
    } catch (err) {
      setError('Delete failed');
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`/api/memories/${selected._id}`, {
        title: editTitle,
        description: editDesc
      }, { withCredentials: true });
      setMemories(memories.map(m => m._id === selected._id ? { ...m, title: editTitle, description: editDesc } : m));
      setEditMode(false);
      setSelected({ ...selected, title: editTitle, description: editDesc });
    } catch (err) {
      setError('Edit failed');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {error && <div className="text-red-500 text-center mb-2">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {memories.map((memory, idx) => (
          <motion.div
            key={memory._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => {
              setSelected(memory);
              setEditMode(false);
              setEditTitle(memory.title);
              setEditDesc(memory.description || "");
              setCurrentIndex(idx);
            }}
          >
            <img 
              src={memory.imageUrl} 
              alt={memory.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{memory.title}</h3>
              <p className="text-gray-600">{memory.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative flex flex-col items-center">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl" onClick={() => setSelected(null)}>&times;</button>
            {/* Arrows */}
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 text-2xl shadow hover:bg-blue-100"
              onClick={() => {
                if (currentIndex > 0) {
                  const prev = memories[currentIndex - 1];
                  setSelected(prev);
                  setEditMode(false);
                  setEditTitle(prev.title);
                  setEditDesc(prev.description || "");
                  setCurrentIndex(currentIndex - 1);
                }
              }}
              disabled={currentIndex === 0}
              style={{ left: 0 }}
            >
              &#8592;
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 text-2xl shadow hover:bg-blue-100"
              onClick={() => {
                if (currentIndex < memories.length - 1) {
                  const next = memories[currentIndex + 1];
                  setSelected(next);
                  setEditMode(false);
                  setEditTitle(next.title);
                  setEditDesc(next.description || "");
                  setCurrentIndex(currentIndex + 1);
                }
              }}
              disabled={currentIndex === memories.length - 1}
              style={{ right: 0 }}
            >
              &#8594;
            </button>
            <img src={selected.imageUrl} alt={selected.title} className="w-full max-h-[70vh] object-contain rounded mb-4" />
            {editMode ? (
              <>
                <input
                  className="w-full border p-2 mb-2 rounded"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  placeholder="Title"
                />
                <textarea
                  className="w-full border p-2 mb-2 rounded"
                  value={editDesc}
                  onChange={e => setEditDesc(e.target.value)}
                  placeholder="Description"
                />
                <div className="flex gap-2 justify-end">
                  <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setEditMode(false)}>Cancel</button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleEdit}>Save</button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-bold text-xl mb-2">{selected.title}</h3>
                <p className="text-gray-700 mb-4">{selected.description}</p>
                <div className="flex gap-2 justify-end">
                  <button className="px-4 py-2 bg-yellow-400 text-white rounded" onClick={() => setEditMode(true)}>Edit</button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => handleDelete(selected._id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;