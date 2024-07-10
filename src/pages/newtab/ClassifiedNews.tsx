import CardNews from '@root/src/components/CardNews';

const ClassifiedNews = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center w-full h-full bg-opacity-10 bg-white rounded-[3.125rem] shadow-md p-8 3xl:px-10 4xl:p-16 mx-[3rem]">
        <div className="grid grid-cols-3 gap-x-8 gap-y-4 3xl:gap-y-8">
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
        <div className="flex justify-center w-[15rem] h-[2rem] bg-red-500 mt-8 3xl:mt-10" />
      </div>
    </div>
  );
};

export default ClassifiedNews;
