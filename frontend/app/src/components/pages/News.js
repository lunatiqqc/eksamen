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
        <article className='my-8'>
            <h1 className='text-xl font-bold my-8'>News</h1>
            <ul className='grid gap-12'>
                {news?.map((news) => {
                    return (
                        <li className='grid gap-2'>
                            <h1 className='text-lg font-bold'>{news.title}</h1>
                            <time
                                className='text-orange-500'
                                dateTime={news.date}
                            >
                                {news.date}
                            </time>
                            <p className='line-clamp-2'>{news.content}</p>
                            <Link
                                className='underline text-orange-500'
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
