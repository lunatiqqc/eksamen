import { Link, useLocation } from "react-router-dom";

export default function NewsDetails() {
    const location = useLocation();

    console.log(location);

    const { news } = location.state;

    console.log(news);

    return (
        <article>
            <h1>{news.title}</h1>
            <time dateTime={news.date}>{news.date}</time>

            <p>{news.description}</p>

            <Link to='/news'>Back</Link>
        </article>
    );
}
