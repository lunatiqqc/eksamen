import { useContext, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { imagesBaseUrl } from "../../lib/fetcher";
import { context } from "../Context";
import EmptyArrayChecker from "../EmptyArrayChecker";

export default function ComingSoon() {
    const location = useLocation();
    const { movies } = useContext(context);

    const firstFocusElement = useRef();
    useEffect(() => {
        firstFocusElement.current?.focus();

        document.title = "Movies coming soon";
        return () => {};
    }, []);

    if (movies === undefined) {
        return null;
    }

    return (
        <article className='my-8'>
            <h1
                tabIndex='0'
                ref={(el) => {
                    firstFocusElement.current = el;
                }}
                className='text-xl font-bold my-8'
            >
                Movies coming soon!
            </h1>
            <ul className='grid gap-12'>
                <EmptyArrayChecker message='No upcoming movies'>
                    {movies
                        .filter((movie) => {
                            return +new Date(movie.releaseDate) > +new Date();
                        })
                        ?.map((movie, i) => {
                            return (
                                <li key={i} className='grid gap-2'>
                                    <figure className='w-[160px] h-[240px]'>
                                        <img
                                            src={
                                                imagesBaseUrl +
                                                "/" +
                                                movie.image
                                            }
                                            alt={movie.title}
                                            className='object-cover'
                                        />
                                    </figure>
                                    <h1
                                        tabIndex='0'
                                        className='text-lg font-bold'
                                    >
                                        {movie.title}
                                    </h1>
                                    <time
                                        tabIndex='0'
                                        className='text-orange-500'
                                        dateTime={movie.releaseDate}
                                    >
                                        {movie.releaseDate}
                                    </time>
                                    <p tabIndex='0' className='line-clamp-2'>
                                        {movie.description}
                                    </p>
                                    <Link
                                        className='underline text-orange-500'
                                        to={"/movie/" + movie.id}
                                        state={{ prevPath: location.pathname }}
                                    >
                                        Read More
                                    </Link>
                                </li>
                            );
                        })}
                </EmptyArrayChecker>
            </ul>
        </article>
    );
}
