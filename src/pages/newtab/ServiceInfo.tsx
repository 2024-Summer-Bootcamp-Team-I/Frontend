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
    <div className="flex justify-center items-center">
      <div className="flex items-center justify-center bg-white bg-opacity-10 rounded-[3.125rem] w-[85rem] h-[40rem] 3xl:w-[95rem] 3xl:h-[45rem] 4xl:w-[150rem] 4xl:h-[70rem] pl-[5rem] pr-32 pb-12 pt-24 ">
        <div className="scale-[0.85] 3xl:scale-[1] 4xl:scale-[1.55]">
          <WaveGraph data={data} />
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;
