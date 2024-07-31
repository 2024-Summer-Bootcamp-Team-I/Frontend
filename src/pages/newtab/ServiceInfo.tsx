import React, { useEffect, useState } from 'react';
import WaveGraph from '@root/src/components/WaveGraph';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Lottie from 'react-lottie-player';
import loadingAnimation from '@src/assets/img/loading004.json';

interface DataItem {
  news_count: number;
  created_at: string;
}

const getNewsCountAPI = async () => {
  const response = await axios.get('http://localhost/api/v1/news/count/classify');
  return response.data;
};

// 여기엔 async하는 거아님
const ServiceInfo: React.FC = () => {
  const {
    data: countData,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['newscount'],
    queryFn: getNewsCountAPI,
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    if (countData) {
      setData(countData);
      addItem(countData);
    }
  }, [countData]);

  // 순서 중요. useEffect보다 앞서면 안됨
  if (isLoading)
    return (
      <div>
        <Lottie loop animationData={loadingAnimation} play style={{ width: 300, height: 300 }} />
      </div>
    );

  if (isError) {
    // 오류 객체를 Error 타입으로 단언
    const errorMessage = (error as Error).message;
    return <div>Error: {errorMessage}</div>;
  }

  const addItem = (data) => {
    // if (data.length>0) //이게실행이안되었엇음
    const latestDate = new Date(data[0].created_at); //String 타입인 값을 'Date' 객체로 변환
    latestDate.setDate(latestDate.getDate() + 1); // 날짜 하루 증가
    const nextDate = latestDate.toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식의 문자열로 변환

    const latestHalf = data[0].news_count / 2;

    const newItem: DataItem = { news_count: latestHalf, created_at: nextDate };

    // setData((prev) => [...prev, newItem]);
    setData((prev) => {
      const updatedData = [...prev, newItem];
      updatedData.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      return updatedData;
    });
  };

  // useEffect(() => {
  //   newscount();
  // }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center backdrop-blur-md shadow-xl bg-white bg-opacity-10 rounded-[3.125rem] w-[86rem] h-[44.5rem] 3xl:w-[114rem] 3xl:h-[48.5rem] 4xl:w-[154rem] 4xl:h-[66rem] pl-[5rem] pr-32 pb-12 pt-24 ">
        <div className="scale-[0.85] 3xl:scale-[1] 4xl:scale-[1.43]">
          <WaveGraph data={data} />
        </div>
        {/* <button onClick={() => console.log(data)}>배열 출력</button> */}
      </div>
    </div>
  );
};

export default ServiceInfo;
