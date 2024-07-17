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
};
