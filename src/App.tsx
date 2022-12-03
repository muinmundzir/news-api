import { useCallback, useEffect, useState } from "react";

import Content from "./components/Content";

interface ArticleInterface {
  author: "Anthony Franco";
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
}

interface NewsInterface {
  status: string;
  totalResults: number;
  articles: ArticleInterface[];
}

function App() {
  const [news, setNews] = useState<NewsInterface>();
  const [country, setCountry] = useState<string>("us");
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchNewsAPI = useCallback(() => {
    const API_KEY = import.meta.env.VITE_API_KEY
    const apiWithoutQuery = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`;
    const apiWithQuery = `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${API_KEY}`;

    const api = query ? apiWithQuery : apiWithoutQuery;
    setIsLoading(true);
    fetch(api).then(async (res) => {
      const data: NewsInterface = await res.json();
      setNews(data);
      setIsLoading(false);
    });
  }, [country, query]);

  useEffect(() => {
    fetchNewsAPI();
  }, [fetchNewsAPI]);

  const handleChangeCountry = (value: string) => {
    setCountry(value);
  };

  const handleChangeQuery = (value: string) => {
    setQuery(value);
  };

  return (
    <div>
      {news && (
        <Content
          changeQuery={handleChangeQuery}
          changeCountry={handleChangeCountry}
          data={news}
          isQuerying={query.length}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
