import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { get } from "../../lib/fetcher";
import { context } from "../Context";

export default function News() {
    const location = useLocation();
    const { news } = useContext(context);

    const firstFocusElement = useRef();
    useEffect(() => {
        firstFocusElement.current.focus();

        document.title = "News";
        return () => {};
    }, []);

    return (
        <article className='my-8'>
            <h1
                tabIndex='0'
                ref={(el) => {
                    firstFocusElement.current = el;
                }}
                className='text-xl font-bold my-8'
            >
                News
            </h1>
            <ul className='grid gap-12'>
                {news?.map((news, i) => {
                    return (
                        <li key={i} className='grid gap-2'>
                            <h1 tabIndex='0' className='text-lg font-bold'>
                                {news.title}
                            </h1>
                            <time
                                tabIndex='0'
                                className='text-orange-500'
                                dateTime={news.date}
                            >
                                {news.date}
                            </time>
                            <p tabIndex='0' className='line-clamp-2'>
                                {news.content}
                            </p>
                            <Link
                                className='underline text-orange-500'
                                to={"/news/" + news.id}
                                state={{ prevPath: location.pathname }}
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
