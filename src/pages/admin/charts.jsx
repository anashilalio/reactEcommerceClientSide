import React, { useEffect, useState } from 'react';
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import RecentOrders from './recentOrders';
import { BarChart, LineChart } from '@mui/x-charts';
import { ResponsiveChoropleth } from '@nivo/geo';
import countries from './world_countries.json'; // Ensure you have the world_countries.json file

const Charts = () => {
  const [earning, setEarning] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalEarning, setTotalEarning] = useState(0);
  const [todayEarning, setTodayEarning] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsersInfo = async () => {
      try {
        const res = await fetch("http://localhost/ecommerce%20project/admin/country.php");
        const json = await res.json();
        setUsers(json);
        console.log(json);
      } catch (error) {
        console.error("Failed to fetch users info:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost/ecommerce%20project/admin/orders.php");
        const resp = await res.json();
        const { monthlyEarnings, todaysEarnings } = resp;

        const totalEarn = monthlyEarnings.reduce((total, current) => total + Number(current.earnings), 0);
        const todayEarn = todaysEarnings.reduce((total, current) => total + Number(current.earnings), 0);

        setTotalEarning(totalEarn);
        setTodayEarning(todayEarn);
        setEarning(monthlyEarnings);
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

    fetchProducts();
    fetchTotalUsers();
    fetchUsersInfo();
  }, []);

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
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-6 rounded-xl shadow-2xl relative">
          <div className='text-lg'>Nombre total d'utilisateurs</div>
          <div className='text-2xl'>{totalUsers}</div>
          <FaArrowCircleUp className='absolute right-6 bottom-6 text-3xl' />
        </div>
      </div>
      
      <div className='mt-12'>
        <div className='shadow-xl bg-gray-100 p-4 rounded-xl'>
          <div className='text-4xl font-mono font-extrabold mb-2'>Monthly Earnings</div>
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
        <div className='shadow-xl bg-gray-100 p-4 rounded-xl'>
          <div className='text-4xl font-mono font-extrabold mb-2'>Dernières commandes</div>
          <RecentOrders />
        </div>
      </div>

      <div className='mt-12 shadow-xl bg-gray-100 rounded-3xl p-4'>
        <div className='text-4xl font-mono font-extrabold mb-2'>Emplacements des utilisateurs</div>
        <div style={{ height: '500px' }}>
          <ResponsiveChoropleth
            data={users}
            features={countries.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            colors="nivo"
            domain={[0, Math.max(1, ...users.map(d => d.value))]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=">-.0s"
            projectionScale={150}
            projectionTranslation={[0.5, 0.5]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={true}
            graticuleLineColor="#dddddd"
            borderWidth={0.5}
            borderColor="#152538"
            legends={[
              {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
            tooltip={({ feature }) => {
              return feature.value ? (
                <span>
                  {feature.properties.name}: {feature.value} users
                </span>
              ) : (
                <span>
                  {feature.properties.name}: No data
                </span>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Charts;
