import React, { useState } from 'react'
import axios from "axios"
import { useQuery } from "react-query"
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { TbFaceIdError } from "react-icons/tb";
import { cred } from "../credentials/credentials"
import ArticleCSS from "../CSSModule/Article.module.css"

const Section = () => {
    const { sectionName } = useParams();
    const [query, setQuery] = useState(sectionName);
    const [sectionArticle, setSectionArticle] = useState();

    if (query !== sectionName) {
        setQuery(sectionName);
    }

    const searchArticlesRequest = axios.create({
        baseURL: `https://api.nytimes.com/svc/topstories/v2/${query}.json?api-key=${cred.API_TOP_STORIES}`
    })

    const searchArticlesQuery = useQuery({
        queryKey: ["SECTION", query],
        queryFn: () => searchArticlesRequest.get().then(response => setSectionArticle(response.data.results)),
    })

    if (searchArticlesQuery.isLoading) return <>
        <ClipLoader
            size={50}
            color={"#727272"}
            speedMultiplier={0.5}
            cssOverride={{ display: "block", margin: "80px auto" }}
        />
    </>

    if (searchArticlesQuery.isError) return <>
        <section style={{ textAlign: "center", padding: 10, fontSize: 50, fontFamily: "Times new Roman", fontWeight: 900 }}>
            <TbFaceIdError />
            <p>Too Many Requests</p>
        </section>
    </>

    return <div className={ArticleCSS.articleContainer}>
        {
            searchArticlesQuery.isSuccess && sectionArticle &&
            sectionArticle.map((items, index) => {
                return (
                    <article key={items.url} className={`${ArticleCSS.article} ${index % 4 === 0 ? ArticleCSS.fullWidth : null}`}>
                        {
                            items.abstract &&
                            <a href={items.url} target="_blank">
                                <h3 className={ArticleCSS.h3}>{items.title}</h3>
                                <p className={ArticleCSS.firstP}>{items.abstract}</p>
                                <img className={ArticleCSS.img} src={items.multimedia && items.multimedia[0].url} alt="" />
                                <div className={ArticleCSS.containerInfo}>
                                    <p className={ArticleCSS.secondP}>{items.byline}</p>
                                    <p className={ArticleCSS.thirdP}>{items.published_date.slice(0, 10)}</p>
                                </div>
                                <hr className={ArticleCSS.hr} />
                            </a>
                        }
                    </article >
                )
            })
        }
    </div>
}

export default Section
