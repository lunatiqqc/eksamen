import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { get } from "../../lib/fetcher";
import { context } from "../Context";

export default function NewsDetails() {
    const location = useLocation();

    const { prevPath } = location.state;

    const { news } = useContext(context);

    const [newsDetails, setNewsDetails] = useState();

    const { id } = useParams();

    const firstFocusElement = useRef();

    useEffect(() => {
        if (news) {
            const newsItem = news.find((news) => {
                return news.id === parseInt(id);
            });
            setNewsDetails(newsItem);

            document.title = newsItem.title;
            firstFocusElement.current?.focus();
        }

        return () => {};
    }, [news]);

    if (newsDetails === undefined) {
        return null;
    }

    return (
        <article className='my-8 grid gap-4'>
            <h1
                tabIndex='0'
                ref={(el) => {
                    firstFocusElement.current = el;
                }}
                className='text-2xl font-bold text-orange-500'
            >
                {newsDetails.title}
            </h1>
            <time
                tabIndex='0'
                className='text-orange-500'
                dateTime={newsDetails.date}
            >
                {newsDetails.date}
            </time>

            <p tabIndex='0' className='max-w-prose'>
                {newsDetails.content}
            </p>

            <Link
                className='px-12 py-2 bg-slate-50 text-black w-fit'
                to={prevPath}
            >
                Back
            </Link>
        </article>
    );
}
