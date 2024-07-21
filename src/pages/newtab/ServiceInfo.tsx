import React, { useEffect, useState } from 'react';
import WaveGraph from '@root/src/components/WaveGraph';
import axios from 'axios';

const ServiceInfo = () => {
  // 여기엔 async하는 거아님
  const [data, setData] = useState([]);

  const mock = [
    // 기존 mocking data
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

  const newscount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/newscount');
      setData(response.data);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const addItem = async () => {
    if (data.length > 0) {
      const latestDate = new Date(data[0].created_at); //String 타입인 값을 'Date' 객체로 변환
      latestDate.setDate(latestDate.getDate() + 1); // 날짜 하루 증가
      const nextDate = latestDate.toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식의 문자열로 변환

      const latestHalf = data[0].news_count / 2;

      const newItem = { news_count: latestHalf, created_at: nextDate };

      setData((data) => [...data, newItem]);
      console.log(data);
    }
  };

  useEffect(() => {
    newscount();
    addItem();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center bg-white bg-opacity-10 rounded-[3.125rem] w-[85rem] h-[40rem] 3xl:w-[95rem] 3xl:h-[45rem] 4xl:w-[150rem] 4xl:h-[70rem] pl-[5rem] pr-32 pb-12 pt-24 ">
        <div className="scale-[0.85] 3xl:scale-[1] 4xl:scale-[1.55]">
          <WaveGraph data={data} carry={data} />
        </div>
        <button onClick={addItem}>바뀐배열출력</button>
        <button onClick={() => console.log(data)}>배열출력</button>
      </div>
    </div>
  );
};

export default ServiceInfo;
