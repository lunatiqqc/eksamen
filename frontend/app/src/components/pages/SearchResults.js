import { useContext, useEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { imagesBaseUrl } from "../../lib/fetcher";
import filterMovies from "../../lib/filterMovies";
import { context } from "../Context";
import EmptyArrayChecker from "../EmptyArrayChecker";

export default function SearchResults() {
    const { searchValue } = useOutletContext();
    const { movies } = useContext(context);

    const firstFocusElement = useRef();

    useEffect(() => {
        document.title = "search results for: " + searchValue;
        return () => {};
    }, []);

    useEffect(() => {
        firstFocusElement.current?.focus();
    }, [movies]);

    return searchValue && movies ? (
        <article className='my-12'>
            <h1
                tabIndex='0'
                ref={firstFocusElement}
                className='text-xl font-bold my-8'
            >
                Search results <span>for: {searchValue}</span>
            </h1>
            <ul className='flex flex-wrap gap-8'>
                <EmptyArrayChecker message='No results'>
                    {movies
                        .filter((movie) => filterMovies(movie, searchValue))
                        .map((movie, i) => {
                            return (
                                <li
                                    key={i}
                                    className='flex flex-wrap gap-4 animate-fadeinslow max-w-[30ch]'
                                >
                                    <article>
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
                                        <div className=''>
                                            <h1
                                                tabIndex='0'
                                                className='text-xl font-bold pb-2'
                                            >
                                                {movie.title}
                                            </h1>
                                            <p
                                                tabIndex='0'
                                                className='line-clamp-2 max-w-prose'
                                            >
                                                {movie.description}
                                            </p>
                                        </div>

                                        <Link
                                            className='px-4 py-2 bg-slate-100 text-neutral-900 block my-4 w-fit rounded-sm'
                                            to={"/movie/" + movie.id}
                                        >
                                            Read more
                                        </Link>
                                    </article>
                                </li>
                            );
                        })}
                </EmptyArrayChecker>
            </ul>
        </article>
    ) : (
        <div tabIndex='0' className='p-4 text-xl'>
            Empty searchfield
        </div>
    );
}
