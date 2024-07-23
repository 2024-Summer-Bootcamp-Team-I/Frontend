const ItemTypes = {
  SCRAP_ITEM: 'scrapItem',
};

type DragItem = {
  url: string;
};

type ScrapItem = {
  userId: number;
  newsId: string;
  title: string;
  img: string;
  publishedDate: string;
  channelName: string;
  type: string;
};

type MyScrapItem = {
  userId: number;
  newsId: string;
  title: string;
  content: string;
  img: string;
  publishedDate: string;
  channelName: string;
  type: string;
};
