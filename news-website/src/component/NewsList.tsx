import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

interface News {
  id: number;
  title: string;
  description: string;
  urlToImage: string;
  url: string;
}

const NewsList: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=f5d30a52f8914ba289e5f375719e9ff3`)
      .then(response => {
        setNews(response.data.articles);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredNews = news.filter((newsItem) =>
    newsItem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {filteredNews.map((newsItem) => (
      <div className='news' key={newsItem.id}>
        <h2 className='news_title'>{newsItem.title}</h2>
        <p className='news_desc'>{newsItem.description}</p>
        <img className='news_img' src={newsItem.urlToImage} alt="Haber Resmi" />
        <Link to={newsItem.url}>{newsItem.url}</Link>
        </div>
      ))}
    </div>
  );
}

export default NewsList;

//{news.map(newsItem => (
//<Link to={`/news/${newsItem.id}`} >Read More</Link>