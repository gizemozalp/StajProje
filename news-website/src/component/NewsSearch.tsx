import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface News {
  id: number;
  title: string;
  description: string;
}

const NewsSearch: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  console.log(id);

  useEffect(() => {
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=f5d30a52f8914ba289e5f375719e9ff3`)
      .then(response => {
        // Yanıt verisi içerisindeki haberleri alın
        const allNews: News[] = response.data.articles; // Varsayılan olarak, NewsAPI yanıt verisi 'articles' adlı bir dizi içerir.

        // Doğru haberin verilerini bulun
        //const selectedNews: News | undefined = allNews.find(item => item.id.toString() === id);

        if (!id) {
          console.error("Haber ID'si belirtilmemiş.");
          return null; // veya hata mesajı dönebilirsiniz
        }
        
        const selectedNews: News | undefined = allNews.find(item => item.id.toString() === id);

        // Eğer haber bulunursa, setNews ile durumu güncelleyin
        if (selectedNews) {
          setNews(selectedNews);
        } else {
          // Eğer haber bulunamazsa, haber yok veya hatalı bir id durumu ele alınabilir
          console.error(`Haber ID'si '${id}' ile eşleşen haber bulunamadı.`);
          
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  if (!news) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{news.title}</h1>
      <p>{news.description}</p>
    </div>
  );
}

export default NewsSearch;
