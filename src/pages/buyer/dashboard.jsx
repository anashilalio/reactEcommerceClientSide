import React, { useEffect, useState, useContext } from 'react';
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import RecentOrders from './recentOrders';
import { BarChart, LineChart } from '@mui/x-charts';
import { contextProviderInfo } from '../../context/ContextProvider';
import axios from 'axios';

const Dashboard = () => {
  const [earning, setEarning] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalEarning, setTotalEarning] = useState(0);
  const [todayEarning, setTodayEarning] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const { clientdata } = useContext(contextProviderInfo);
  console.log(clientdata);

  useEffect(() => {
    const fetchUsersInfo = async () => {
      try {
        const res = await axios.post("http://localhost/ecommerce%20project/admin/country.php");
        setUsers(res.data); // Accessing data from response correctly
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch users info:", error);
      }
    };

    const fetchProducts = async () => {
      const clientid = parseInt(clientdata);
      console.log("Client ID:", clientid);  // Add this line to debug
    
      try {
        const res = await axios.post("http://localhost/ecommerce%20project/admin/buyer/Earnings.php", { clientid });
        console.log(res.data);  // Log the response data for debugging
    
        const { monthlyEarnings, todaysEarnings } = res.data;
    
        if (monthlyEarnings && todaysEarnings) {
          const totalEarn = monthlyEarnings.reduce((total, current) => total + Number(current.earnings), 0);
          const todayEarn = todaysEarnings.reduce((total, current) => total + Number(current.earnings), 0);
    
          setTotalEarning(totalEarn);
          setTodayEarning(todayEarn);
          setEarning(monthlyEarnings);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      } catch (error) {
        console.error("Failed to fetch products info:", error);
      }
    };
    
    
    

    const fetchTotalUsers = async () => {
      try {
        const res = await fetch("http://localhost/ecommerce%20project/admin/totalUsers.php");
        const json = await res.json();
        setTotalUsers(json[0].count);
      } catch (error) {
        console.error("Failed to fetch total users info:", error);
      }
    };

    fetchUsersInfo();
    fetchProducts();
    fetchTotalUsers();
  }, [clientdata]);

  return (
    <div className='pl-64 pr-12 bg-gray-200 min-h-screen pb-12'>
      <div className='text-3xl font-mono font-bold pt-8'>Bonjour, bienvenue à nouveau</div>

      <div className='sales-info mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-white text-xl font-mono font-bold'>
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-6 rounded-xl shadow-2xl relative">
          <div className='text-lg'>Gain total</div>
          <div className='text-2xl'>{totalEarning} DH</div>
          <FaArrowCircleUp className='absolute right-6 bottom-6 text-3xl' />
        </div>
        <div className="bg-gradient-to-r from-red-700 to-red-500 p-6 rounded-xl shadow-2xl relative">
          <div className='text-lg'>Gagner aujourd'hui</div>
          <div className='text-2xl'>{todayEarning} DH</div>
          <FaArrowCircleDown className='absolute right-6 bottom-6 text-3xl' />
        </div>
      </div>

      <div className='mt-12'>
        <div className='shadow-xl bg-gray-100 p-4 rounded-xl'>
          <div className='text-4xl font-mono font-extrabold mb-2'>Gains mensuels</div>
          <LineChart
            xAxis={[{ data: earning.map(e => `Month ${e.month}`), scaleType: 'band' }]}
            series={[{ data: earning.map(e => parseInt(e.earnings)) }]}
            width={1000}
            height={300}
          />
        </div>
      </div>

      <div className='flex justify-between mt-12'>
        <div className='shadow-xl bg-gray-100 p-4 rounded-xl'>
          <div className='text-4xl font-mono font-extrabold mb-2'>Gains mensuels</div>
          <BarChart
            xAxis={[{ data: earning.map(e => `Month ${e.month}`), scaleType: 'band' }]}
            series={[{ data: earning.map(e => parseInt(e.earnings)) }]}
            width={600}
            height={300}
          />
        </div>
        </div>
    </div>
  );
}

export default Dashboard;
