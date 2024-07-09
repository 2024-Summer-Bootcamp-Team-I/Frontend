import CardNews from '@root/src/components/CardNews';
import Pagination from '@root/src/components/Pagination';
import React, { useState } from 'react';

const ClassifiedNews = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[85rem] h-[53.875rem] bg-opacity-10 bg-white rounded-[3.125rem] shadow-md p-12 mx-auto">
        <div className="grid grid-cols-3 gap-8">
          <CardNews />
          <CardNews />
          <CardNews />
          <CardNews />
          <CardNews />
          <CardNews />
          <CardNews />
          <CardNews />
          <CardNews />
        </div>
      </div>
    </div>
  );
};

export default ClassifiedNews;
