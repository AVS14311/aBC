import { useState } from 'react';
import Gallery from '../components/Gallery';
import UploadModal from '../components/UploadModal';

const Couple = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Couple Memories</h1>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Memory
        </button>
      </div>
      
      <Gallery category="couple" />
      
      {showUploadModal && (
        <UploadModal 
          category="couple" 
          onClose={() => setShowUploadModal(false)} 
        />
      )}
    </div>
  );
};

export default Couple;