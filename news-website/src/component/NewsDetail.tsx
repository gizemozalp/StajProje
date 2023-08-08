import React from 'react';
import { useParams } from 'react-router-dom';

interface News {
  id: number;
  title: string;
  description: string;
}

interface Props {
  newsList: News[];
}

const NewsDetail: React.FC<Props> = ({ newsList }) => {
  const { id } = useParams<{ id: string }>();
  const selectedNews = newsList.find(news => news.id === Number(id));

  if (!selectedNews) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{selectedNews.title}</h1>
      <p>{selectedNews.description}</p>
    </div>
  );
};

export default NewsDetail;
