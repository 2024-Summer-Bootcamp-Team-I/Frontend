import React from 'react';
import WaveGraph from '@root/src/components/WaveGraph';

const ChannelRanking = () => {
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
    <div className="flex justify-center mt-6">
      <div className="  w-[75rem] h-[50rem] bg-white bg-opacity-10 rounded-[3.125rem]">
        <WaveGraph data={data} />
      </div>
    </div>
  );
};

export default ChannelRanking;
