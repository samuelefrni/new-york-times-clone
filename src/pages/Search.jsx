import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { TbFaceIdError } from "react-icons/tb";
import { cred } from "../credentials/credentials";
import ArticleCSS from "../CSSModule/Article.module.css";
import { Helmet } from "react-helmet";

const Search = ({ query }) => {
  const [searchArticles, setSearchArticles] = useState();

  const searchRequest = axios.create({
    baseURL: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${cred.API_SEARCH}`,
  });

  const searchQuery = useQuery({
    queryKey: ["SEARCH", query],
    queryFn: () =>
      query &&
      searchRequest
        .get()
        .then((response) => setSearchArticles(response.data.response.docs)),
  });

  if (searchQuery.isLoading)
    return (
      <>
        <ClipLoader
          size={50}
          color={"#727272"}
          speedMultiplier={0.5}
          cssOverride={{ display: "block", margin: "80px auto" }}
        />
      </>
    );

  if (searchQuery.isError)
    return (
      <>
        <section
          style={{
            textAlign: "center",
            padding: 10,
            fontSize: 50,
            fontFamily: "Times new Roman",
            fontWeight: 900,
          }}
        >
          <TbFaceIdError />
          <p>Too Many Requests</p>
        </section>
      </>
    );

  if (searchQuery.isSuccess && searchArticles < 1)
    return (
      <>
        <section
          style={{
            textAlign: "center",
            padding: 10,
            fontSize: 50,
            fontFamily: "Times new Roman",
            fontWeight: 900,
          }}
        >
          <TbFaceIdError />
          <p style={{ fontSize: 20 }}>I couldn't find anything</p>
        </section>
      </>
    );

  return (
    <div className={ArticleCSS.articleContainer}>
      <Helmet>
        <title>{`Results for: ${query}`}</title>
        <meta name="description" content={`News about: ${query}`} />
      </Helmet>
      {searchQuery.isSuccess &&
        searchArticles &&
        searchArticles.map((items) => {
          return (
            <article key={items.uri} className={ArticleCSS.article}>
              {items.abstract && items.lead_paragraph && (
                <a href={items.web_url} target="_blank">
                  <h3 className={ArticleCSS.h3}>{items.abstract}</h3>
                  <p className={ArticleCSS.firstP}>{items.lead_paragraph}</p>
                  <div className={ArticleCSS.containerInfo}>
                    <p className={ArticleCSS.secondP}>
                      {items.byline.original}
                    </p>
                    <p className={ArticleCSS.thirdP}>
                      {items.pub_date.slice(0, 10)}
                    </p>
                  </div>
                  <hr className={ArticleCSS.hr} />
                </a>
              )}
            </article>
          );
        })}
    </div>
  );
};

export default Search;
