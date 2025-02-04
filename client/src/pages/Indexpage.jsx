import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Contact from '../components/Contact';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);


// ReviewCard Component
const ReviewCard = ({ name, rating, comment, imgUrl }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
    <div className="flex items-center mb-4">
      <img src={imgUrl} alt={name} className="w-12 h-12 bg-gray-300 rounded-full mr-4" />
      <div>
        <h3 className="font-bold">{name}</h3>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
          ))}
        </div>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300">{comment}</p>
  </div>
);

const reviews = [
  { name: "Alice Johnson", rating: 5, comment: "RideShare has been a game-changer for my daily commute. I've saved money and made new friends!", imgUrl: "https://i.pravatar.cc/150?img=10" },
  { name: "Bob Smith", rating: 4, comment: "Great concept and execution. The app is user-friendly and the community is fantastic.", imgUrl: "https://i.pravatar.cc/150?img=15" },
  { name: "Charlie Brown", rating: 5, comment: "I love how RideShare helps reduce my carbon footprint. It's a win-win for me and the environment!", imgUrl: "https://i.pravatar.cc/150?img=20" },
  { name: "David Green", rating: 4, comment: "The rides are always smooth, and the app is very intuitive.", imgUrl: "https://i.pravatar.cc/150?img=25" },
  { name: "Eva White", rating: 5, comment: "Fantastic service! I've met so many wonderful people on my rides.", imgUrl: "https://i.pravatar.cc/150?img=30" },
  { name: "Kope Holand", rating: 4, comment: "Best Services Lots of opportunity to save money.", imgUrl: "https://i.pravatar.cc/150?img=36"}
];

const FloatingShape = ({ animationDuration, initialScale, color }) => (
  <motion.div
    className={`absolute rounded-full ${color}`}
    style={{
      width: Math.random() * 40 + 20,
      height: Math.random() * 40 + 20,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }}
    animate={{
      y: ["0%", "-20%", "0%"],
      scale: [initialScale, initialScale * 1.2, initialScale],
      opacity: [0.7, 0.9, 0.7],
    }}
    transition={{
      duration: animationDuration,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    }}
  />
);

const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default function Indexpage() {
  const [theme, setTheme] = useState('light');
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const heroRef = useRef(null);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Automatic Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % reviews.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // GSAP Animation for Hero Section
  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      }
    );
  }, []);

  const isDark = theme === 'dark';

  // Scroll to the ride options section
  const handleGetStarted = () => {
    const rideOptionsSection = document.getElementById('ride-options');
    if (rideOptionsSection) {
      rideOptionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="dark:bg-gray-900 dark:text-white">
        {/* Enhanced Hero Section */}
        <section
          ref={heroRef}
          className="relative h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-indigo-700 text-white overflow-hidden"


        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <ParticleCanvas />
          {[...Array(10)].map((_, index) => (
            <FloatingShape
              key={index}
              animationDuration={Math.random() * 10 + 10} // Longer duration for smoother effect
              initialScale={Math.random() * 0.5 + 0.5}
              color={index % 2 === 0 ? 'bg-pink-400' : 'bg-purple-400'}
            />
          ))}
          <div className="relative z-10 text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              Welcome to <span className="text-yellow-300">Side</span>
              <span>Ride</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8"
            >
              Your Sustainable Transportation Solution
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <button
                onClick={handleGetStarted}
                className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 hover:text-purple-700 transition duration-300 transform hover:scale-105"
              >
                Get Started
              </button>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, -10, 0],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </section>

        {/* Our Aim Section */}
        <section className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Aim</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[ 
                { icon: '🌿', title: 'Environment Friendly', description: 'Reduce carbon footprint with shared rides' },
                { icon: '💰', title: 'Save Costs', description: 'Split travel expenses with fellow riders' },
                { icon: '👥', title: 'Make New Friends', description: 'Connect with like-minded travelers' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <span className="text-5xl mb-4 inline-block">{item.icon}</span>
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ride Options Section */}
        <section id="ride-options" className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Choose Your Ride Option</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[ 
                { title: 'Join Ride', emoji: '🚗', description: 'Find available rides and join others heading to your destination.', color: 'from-blue-400 to-blue-600', path: '/login' },
                { title: 'Offer Ride', emoji: '🛣️', description: 'Share your ride with others traveling on the same route.', color: 'from-green-400 to-green-600', path: '/login' },
                { title: 'Plan Trip', emoji: '🗺️', description: 'Plan your trips and manage your routes efficiently.', color: 'from-red-400 to-red-600', path: '/login' }
              ].map((option, index) => (
                <div
                  key={index}
                  onClick={() => navigate(option.path)}
                  className={`bg-gradient-to-br ${option.color} text-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 cursor-pointer`}
                >
                  <div className="text-4xl mb-4">{option.emoji}</div>
                  <h3 className="text-2xl font-bold mb-2">{option.title}</h3>
                  <p>{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <ReviewCard 
                  key={index}
                  name={review.name}
                  rating={review.rating}
                  comment={review.comment}
                  imgUrl={review.imgUrl}
                />
              ))}
            </div>
          </div>
        </section>

      
        {/* Pricing Section */}
        <section className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Plan 1 */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Unlimited Ride</h3>
                <p className="text-4xl font-bold mb-4">₹2000</p>
                <p className="text-lg mb-4">Unlimited rides for 4 months</p>
                <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300">Select Plan</button>
              </div>
              {/* Plan 2 - Most Popular */}
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Most Popular</h3>
                <p className="text-4xl font-bold mb-4">₹500</p>
                <p className="text-lg mb-4">50 rides for 1 month</p>
                <button className="bg-yellow-600 text-white font-bold py-2 px-4 rounded-full hover:bg-yellow-700 transition duration-300">Select Plan</button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Contact/>
    </div>
    
  );
}