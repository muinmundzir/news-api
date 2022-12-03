import { Card, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";

import Filter from "../Filter";

const Content = ({
  data,
  changeCountry,
  changeQuery,
  isQuerying,
  isLoading,
}: any) => {
  const articles = data.articles.filter((datum: any) => datum.content !== null);

  return (
    <Card
      title="News"
      style={{ overflow: "hidden", backgroundColor: "#d5d5d5" }}
    >
      <Filter
        changeCountry={changeCountry}
        changeQuery={changeQuery}
        isQuerying={isQuerying}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 350px)",
          gap: "4rem",
        }}
      >
        {articles.length !== 0 ?
          articles.map((article: any) => {
            return (
              <Card
                loading={isLoading}
                style={{ width: 385, marginBottom: "1rem" }}
                cover={
                  <img
                    src={isLoading ? "" : article.urlToImage}
                    alt={isLoading ? "" : `${article.title} photo`}
                  />
                }
                type="inner"
                key={article.url}
                title={isLoading ? "" : article.title}
                extra={
                  <a href={article.url} target="true">
                    {isLoading ? "" : "More"}
                  </a>
                }
              >
                <Skeleton loading={isLoading} active>
                  <Meta description={article.description} />
                </Skeleton>
              </Card>
            );
          })
          :
          <Card>Sorry, we can't found the data:(</Card>
        }
      </div>
    </Card>
  );
};

export default Content;
