import React from 'react';
import WaveGraph from '@root/src/components/WaveGraph';

const ServiceInfo = () => {
  // const data = [30, 50, 59, 68, 48, 53, 82, 75];
  const data = [
    { date: '2024-06-30', value: 56 },
    { date: '2024-07-01', value: 50 },
    { date: '2024-07-02', value: 59 },
    { date: '2024-07-03', value: 68 },
    { date: '2024-07-04', value: 48 },
    { date: '2024-07-05', value: 53 },
    { date: '2024-07-06', value: 82 },
    { date: '2024-07-07', value: 75 },
    { date: '2024-07-08', value: 75 },
  ];

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center w-full h-full bg-white bg-opacity-10 rounded-[3.125rem] pl-8 pr-16 pb-4 pt-12 mx-[3rem]">
        <WaveGraph data={data} />
      </div>
    </div>
  );
};

export default ServiceInfo;
