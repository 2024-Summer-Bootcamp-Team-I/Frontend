type Article = {
  id: number;
  channelId: number;
  title: string;
  image: string;
  content: string;
  category: string;
  publishDate: string;
};

type ChannelName = {
  id: number;
  name: string;
};

type Discriminant = {
  newsId: number;
  score: number;
  reason: string;
};
