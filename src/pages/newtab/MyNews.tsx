import React, { useState } from 'react';
import Carousel from '@root/src/components/Carousel';
import SearchBar from '@root/src/components/SearchBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const MyNews: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative w-screen h-screen flex items-center justify-center">
        <div className="absolute top-[-3rem] right-0">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="mt-[-3rem] ml">
          <Carousel searchQuery={searchQuery} />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default MyNews;
