import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

// Birthday song - make sure this path is correct
const birthdaySong = "/Media/Happy Birthday Song in Baby Voice _ Very Cute [IkYQNjcIO6I].mp3";

// Sample images
const sampleImages = [
  "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlydGhkYXklMjBjYWtlfGVufDB8fDB8fHww",
  "http://cdn.giftlaya.com/images/59/a9b95beb-171c-4a50-a533-9ccd76d21525.webp",
  "https://www.onlinedelivery.in/images/detailed/36/58529319-9815-4907-b5bb-f8f7941504c0.jpg",
  "https://i.pinimg.com/736x/28/6c/1d/286c1d46c37681cb5d2e27800b28a56f.jpg"
];

export default function Birthday() {
  const [hearts, setHearts] = useState([]);
  const [cakes, setCakes] = useState([]);
  const [showCake, setShowCake] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [memories, setMemories] = useState([]);
  const audioRef = useRef(null);

  // Fetch memories from backend
  useEffect(() => {
    axios.get("/api/memories/birthday", { withCredentials: true })
      .then(res => setMemories(res.data))
      .catch(err => setMemories([]));
  }, []);

  // Create floating elements
  useEffect(() => {
    const heartInterval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-25),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          size: Math.random() * 25 + 15,
          duration: Math.random() * 4 + 3,
          type: 'heart'
        }
      ]);
    }, 200);

    const cakeInterval = setInterval(() => {
      setCakes((prev) => [
        ...prev.slice(-10),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          size: Math.random() * 30 + 20,
          duration: Math.random() * 5 + 4,
          type: 'cake'
        }
      ]);
    }, 800);

    return () => {
      clearInterval(heartInterval);
      clearInterval(cakeInterval);
    };
  }, []);

  const handleCakeClick = () => {
    setShowCake(true);
    
    if (audioRef.current) {
      audioRef.current.loop = true; // Enable looping
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          console.log("Audio is playing");
        })
        .catch(e => {
          console.error("Audio playback failed:", e);
          setIsPlaying(false);
        });
    }
  };

  const handleCloseCake = () => {
    setShowCake(false);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Audio element */}
      <audio 
        ref={audioRef} 
        src={birthdaySong} 
        loop // Added loop attribute
      />
      
      {/* Floating Elements */}
      {[...hearts, ...cakes].map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: "100vh", x: `${Math.random() * 20 - 10}%`, opacity: 0 }}
          animate={{ 
            y: `-${item.size}vh`,
            rotate: item.type === 'cake' ? [0, 5, -5, 0] : 0,
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: item.duration,
            ease: "linear"
          }}
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`
          }}
          className="absolute pointer-events-none"
          onAnimationComplete={() => {
            if (item.type === 'heart') setHearts(hearts.filter(h => h.id !== item.id));
            else setCakes(cakes.filter(c => c.id !== item.id));
          }}
        >
          {item.type === 'heart' ? '❤️' : '🎂'}
        </motion.div>
      ))}

      {/* Cake Modal */}
      {showCake && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
          onClick={handleCloseCake}
        >
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 10 }}
            className="relative"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          >
            <img 
              src="/Media\Pink Watercolor Congratulation Card (2).png" 
              alt="Birthday Cake"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 left-0 right-0 text-center text-white text-lg"
              >
                🎶 Happy Birthday to You! 🎶
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="max-w-4xl w-full p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl"
        >
          {/* Animated Title */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [-2, 2, -2, 2, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-blue-600 bg-clip-text text-transparent mb-4">
              Happy Birthday Sweetheart! 💋
            </h1>
            <div className="text-4xl mb-6">
              🎂🎉🎁❤️🔥💐
            </div>
          </motion.div>

          {/* Gallery Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {sampleImages.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="overflow-hidden rounded-xl shadow-md aspect-square bg-gray-100"
              >
                <img 
                  src={img} 
                  alt={`Memory ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Romantic Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-pink-50 border border-pink-200 rounded-xl p-6 my-6"
          >
            <p className="text-xl md:text-2xl text-pink-800 font-medium">
              "To the one who makes my heart skip a beat every day...
              May your birthday be as magical as your smile! 🥰"
            </p>
            <div className="text-3xl mt-4">
              💖✨🌹🎈
            </div>
          </motion.div>

          {/* Interactive Button */}
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 8px 15px rgba(236, 72, 153, 0.3)",
              background: "linear-gradient(to right, #ec4899, #8b5cf6)"
            }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-lg shadow-xl relative overflow-hidden"
            onClick={handleCakeClick}
          >
            <span className="relative z-10">Open Your Cake! 🎂</span>
            <motion.span
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}