import CardNews from '@root/src/components/CardNews';

type ClassifiedNewsProps = {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  getChannelName: (channelId: number) => string;
  getDiscriminant: (newsId: number) => Discriminant | undefined;
};

const ClassifiedNews: React.FC<ClassifiedNewsProps> = ({
  articles,
  onArticleClick,
  getChannelName,
  getDiscriminant,
}) => {
  const emptyCards = Array.from({ length: 9 - articles.length });

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center w-full h-full bg-opacity-10 bg-white rounded-[3.125rem] shadow-md p-8 3xl:px-10 4xl:p-16 mx-[3rem]">
        <div className="grid grid-cols-3 gap-x-8 gap-y-4 3xl:gap-y-8">
          {articles.map((article) => (
            <CardNews
              key={article.id}
              article={article}
              onClick={onArticleClick}
              getChannelName={getChannelName}
              getDiscriminant={getDiscriminant}
            />
          ))}
          {emptyCards.map((_, index) => (
            <div
              key={index}
              className="w-[26rem] 3xl:w-[35rem] 4xl:w-[47.375rem] h-[11.5rem] 3xl:h-[12rem] 4xl:h-[16rem]"
            ></div>
          ))}
        </div>
        <div className="flex justify-center w-[15rem] h-[2rem] bg-red-500 mt-8 3xl:mt-10 4xl:mt-16" />
      </div>
    </div>
  );
};

export default ClassifiedNews;
