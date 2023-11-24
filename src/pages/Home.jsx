import React, { useState } from "react"
import { cred } from "../credentials/credentials"
import axios from "axios"
import { useQuery } from "react-query"
import ArticleCSS from "../CSSModule/Article.module.css"

const Home = () => {
    const query = "home";
    const [topStories, setTopStories] = useState();

    const serachTopStoriesRequest = axios.create({
        baseURL: `https://api.nytimes.com/svc/topstories/v2/${query}.json?api-key=${cred.API_TOP_STORIES}`
    })

    const searchTopStoriesQuery = useQuery({
        queryKey: ["HOME"],
        queryFn: () => serachTopStoriesRequest.get().then(response => setTopStories(response.data.results)),
    })

    return <>
        {
            searchTopStoriesQuery.isSuccess && topStories &&
            topStories.map((items) => {
                return (
                    <article key={items.url} className={ArticleCSS.article}>
                        <a href={items.url} target="_blank">
                            <h3 className={ArticleCSS.h3}>{items.title}</h3>
                            <p className={ArticleCSS.firstP}>{items.abstract}</p>
                            <img className={ArticleCSS.img} src={items.multimedia && items.multimedia[0].url} alt="" />
                            <p className={ArticleCSS.secondHomeP}>{items.byline}</p>
                            <hr className={ArticleCSS.hr} />
                        </a>
                    </article>
                )
            })
        }
    </>
}

export default Home