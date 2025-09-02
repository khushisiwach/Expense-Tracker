import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Signup from '../../pages/Auth/SignUp';
import Login from '../../pages/Auth/Login';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const TrendingDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L5.25 15L10.5 20.25L15.75 15L21.75 21.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15H21.75V21.75" />
  </svg>
);

// SVG for a wallet icon
export const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12A9 9 0 1112 3C7.03 3 3 7.03 3 12h18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 009-9h-9a9 9 0 00-9-9z" />
  </svg>
);

// SVG for a dollar sign icon
export const DollarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12V3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// SVG for a person circle icon
export const PersonCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-full h-full text-gray-400 group-hover:text-purple-400 transition-all duration-300">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.93 0 3.5 1.57 3.5 3.5S13.93 12 12 12 8.5 10.43 8.5 8.5 10.07 5 12 5zm0 14.1c-2.73 0-5.1-1.35-6.6-3.41.03-2.15 4.47-3.3 6.6-3.3s6.57 1.15 6.6 3.3c-1.5 2.06-3.87 3.41-6.6 3.41z"/>
  </svg>
);

// SVG for an upload icon
export const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={34} height={34} strokeWidth={1.5} stroke="currentColor" className="text-white text-md">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 7.5L7.5 12M12 7.5V19.5" />
  </svg>
);

const StatsInfoCard = ({ icon, color, label, value, shadowColor, delay }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`flex items-center p-4 rounded-2xl shadow-lg w-full text-left backdrop-blur-xl bg-white/40 transform transition-all duration-300 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:scale-110 hover:shadow-2xl hover:${shadowColor}`}>
      <div className={`w-14 h-14 flex items-center justify-center text-2xl ${color} rounded-full mr-4 shadow-md`}>
        {icon}
      </div>
      <div>
        <h6 className='text-sm text-gray-600 font-medium'>{label}</h6>
        <span className='text-xl font-bold text-gray-900'>${value}</span>
      </div>
    </div>
  );
};




// Component for the animated chart
const AnimatedChart = () => {
  const [data, setData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Expenses',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
      backgroundColor: 'rgba(139, 92, 246, 0.2)', // purple-500 with opacity
        borderColor: 'rgb(139, 92, 246)', // purple-500
        tension: 0.4,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to fill container
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(75, 85, 99)' // gray-600
        }
      },
      title: {
        display: true,
        text: 'Monthly Expenses',
        color: 'rgb(31, 41, 55)' // gray-800
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.3)' // gray-500 with opacity
        },
        ticks: {
          color: 'rgb(107, 114, 128)' // gray-500
        }
      },
      x: {
        grid: {
          color: 'rgba(107, 114, 128, 0.3)' // gray-500 with opacity
        },
        ticks: {
          color: 'rgb(107, 114, 128)' // gray-500
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.datasets[0].data];
        newData.shift();
        newData.push(Math.floor(Math.random() * (100 - 40 + 1)) + 40);
        return {
          ...prevData,
          datasets: [{ ...prevData.datasets[0], data: newData }],
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return <Line data={data} options={options} />;
};


const Authlayout = ({children}) => {
  
  return (
    <div className='flex min-h-screen font-sans antialiased text-gray-900 overflow-hidden bg-gradient-to-br from-purple-50 to-violet-100'>
      {/* Left Pane (Auth Form) */}
      <div className='w-full lg:w-[60%] flex flex-col p-8 md:p-12 relative items-start justify-center'>
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-100 via-violet-200 to-purple-300 bg-[length:400%_400%] animate-flow-bg"></div>
        <div className='relative z-10 flex-grow flex items-center justify-center w-full'>
            {children}
        </div>
      </div>

    {/* Right Pane (Visuals) */}
<div className='hidden lg:flex w-[40vw] relative items-center justify-center p-8 group overflow-hidden 
  bg-gradient-to-br from-purple-100 via-violet-200 to-purple-300 backdrop-blur-xl rounded-3xl shadow-lg shadow-purple-200/50 animate-bg-flow'>

  {/* Dynamic Shape Animations (glassmorphic glowing orbs) */}
  <div className="absolute w-24 h-24 rounded-full bg-purple-300/40 backdrop-blur-md shadow-lg shadow-purple-400/50 animate-orbit-slow" 
    style={{ top: '10%', left: '15%' }}></div>
  
  <div className="absolute w-20 h-20 rounded-xl bg-violet-400/30 backdrop-blur-md shadow-lg shadow-violet-500/50 animate-orbit-fast" 
    style={{ bottom: '20%', right: '10%' }}></div>
  
  <div className="absolute w-18 h-18 rounded-full bg-pink-300/40 backdrop-blur-md shadow-lg shadow-pink-400/50 animate-orbit-slow-reverse" 
    style={{ top: '30%', left: '5%' }}></div>
  
  <div className="absolute w-20 h-20 rounded-full bg-indigo-400/30 backdrop-blur-md shadow-lg shadow-indigo-500/50 animate-orbit-fast-reverse" 
    style={{ bottom: '5%', left: '30%' }}></div>

  {/* Floating cards with staggered animation */}
  <div className='absolute top-[10%] left-[20%] z-20 transform -translate-x-1/2 -translate-y-1/2'>
    <StatsInfoCard
      icon={<TrendingDownIcon />}
      label="Track your Expenses"
      value="43,000"
      color="bg-purple-600"
      shadowColor="shadow-purple-500/50"
      delay={100}
    />
  </div>

  <div className='absolute bottom-[15%] right-[10%] z-20 transform -translate-x-1/2 translate-y-1/2'>
    <StatsInfoCard
      icon={<WalletIcon />}
      label="Total Balance"
      value="150,000"
      color="bg-violet-600"
      shadowColor="shadow-violet-500/50"
      delay={300}
    />
  </div>

  {/* Animated Chart inside glass card */}
  <div className="relative z-10 w-[80%] h-auto rounded-2xl shadow-xl shadow-purple-200/50 p-6 
    bg-white/30 backdrop-blur-lg border border-white/20">
    <div className="w-full h-70">
      <AnimatedChart />
    </div>
  </div>
</div>

    </div>
  );
};

export default Authlayout;