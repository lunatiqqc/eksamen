import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "../../lib/fetcher";

export default function News() {
    const [news, setNews] = useState();

    useEffect(() => {
        get("News").then((json) => setNews(json));
        return () => {};
    }, []);

    return (
        <article>
            <h1>News</h1>
            <ul className='grid gap-4'>
                {news?.map((news) => {
                    return (
                        <li>
                            <h1>{news.title}</h1>
                            <time dateTime={news.date}>{news.date}</time>
                            <p className='line-clamp-2'>{news.content}</p>
                            <Link
                                className='underline'
                                to={"/newsdetails/"}
                                state={{ news: news }}
                            >
                                Read More
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}
