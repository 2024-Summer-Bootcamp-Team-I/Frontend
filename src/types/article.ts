type NewsData = {
  title: string;
  channel: string;
  published_date: string;
  content: string;
  summarize: string;
  img: string;
  similar_articles: SimilarArticle[];
  opposite_articles: OppositeArticle[];
};

type SimilarArticle = {
  news_id: number;
  channel: string;
  title: string;
  url: string;
};

type OppositeArticle = {
  news_id: number;
  channel: string;
  title: string;
  url: string;
};
