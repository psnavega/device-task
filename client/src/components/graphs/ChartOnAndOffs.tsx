import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import deviceService from '../../services/deviceService';
import { IIot } from '../../domains/interfaces/IIot';

const ChartOnAndOffs = () => {
  const [data, setData] = useState<IIot[]>([]);
  const [activeDevices, setActiveDevices] = useState<number>(0);
  const [inactiveDevices, setInactiveDevices] = useState<number>(0);

  useEffect(() => {
    deviceService.getDevices({ filter: { tag: 'on-and-offs', imei: '' }})
      .then(response => {
        const devicesData: IIot[] = response.data;
        setData(devicesData);

        let activeCount = 0;
        let inactiveCount = 0;
        devicesData.forEach(device => {
          if (device.tag === 'poweron') {
            activeCount++;
          } else if (device.tag === 'poweroff') {
            inactiveCount++;
          }
        });
        setActiveDevices(activeCount);
        setInactiveDevices(inactiveCount);

        renderChart(activeCount, inactiveCount);
      })
      .catch(error => {
        console.error('Error fetching device data:', error);
      });
  }, []);

  const renderChart = (activeCount: number, inactiveCount: number) => {
    const ctx = document.getElementById('deviceChart') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Power on', 'Power off'],
        datasets: [{
          label: 'Devices',
          data: [activeCount, inactiveCount],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <canvas id="deviceChart" width="400" height="400"></canvas>
        </div>
      </div>
    </div>
  );
};

export default ChartOnAndOffs;
