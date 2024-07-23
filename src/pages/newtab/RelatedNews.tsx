import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import CardNews from '@root/src/components/CardNews';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const itemsPerPage = 9; // 페이지당 항목의 개수를 9로 설정

const fetchRelatedNews = async (page: number) => {
  const response = await axios.get(`http://localhost/api/v1/classifies/`, {
    params: { page },
  });
  console.log(response.data);
  return response.data;
};

const RelatedNews: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['classifiedNews', page],
    queryFn: () => fetchRelatedNews(page),
  });

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // 빈 카드를 계산하는 부분
  const news =
    data?.results.map((newsItem) => ({
      newsId: newsItem.news.news_id,
      title: newsItem.news.title,
      content: newsItem.news.content,
      img: newsItem.news.img,
      publishedDate: newsItem.news.published_date,
      channelName: newsItem.channel_name,
      score: newsItem.score,
    })) ?? [];
  const emptyCards = Array.from({ length: itemsPerPage - news.length });

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center w-full h-full bg-opacity-10 bg-white rounded-[3.125rem] shadow-md p-8 3xl:px-10 4xl:p-16 mx-[3rem]">
        <div className="grid grid-cols-3 gap-x-8 gap-y-4 3xl:gap-y-8">
          {news.map((newsItem) => (
            <CardNews key={newsItem.newsId} article={newsItem} />
          ))}
          {emptyCards.map((_, index) => (
            <div
              key={`empty-${index}`}
              className="w-[26rem] 3xl:w-[35rem] 4xl:w-[47.375rem] h-[11.5rem] 3xl:h-[12rem] 4xl:h-[16rem]"
            ></div>
          ))}
        </div>
        <div className="flex justify-center mt-8 3xl:mt-10 4xl:mt-16">
          <Pagination count={data.total_pages} page={page} onChange={handlePageChange} color="primary" />
        </div>
      </div>
    </div>
  );
};

export default RelatedNews;
