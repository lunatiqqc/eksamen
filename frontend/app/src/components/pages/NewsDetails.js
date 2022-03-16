import { Link, useLocation } from "react-router-dom";

export default function NewsDetails() {
    const location = useLocation();

    console.log(location);

    const { news } = location.state;

    console.log(news);

    return (
        <article className='my-8 grid gap-4'>
            <h1 className='text-xl font-bold text-orange-500'>{news.title}</h1>
            <time className='text-orange-500' dateTime={news.date}>
                {news.date}
            </time>

            <p className='max-w-prose'>{news.content}</p>

            <Link
                className='px-12 py-2 bg-slate-50 text-black w-fit'
                to='/news'
            >
                Back
            </Link>
        </article>
    );
}
