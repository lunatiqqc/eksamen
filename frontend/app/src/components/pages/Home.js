import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { context } from "../Context";
import MovieList from "../MovieList";

export default function Home() {
    const { searchValue, setSearchValue, filter } = useOutletContext();

    const { movies, comments } = useContext(context);

    console.log(movies);

    const [mostCommentedMovies, setMostCommentedMovies] = useState([]);

    useEffect(() => {
        document.title = "Movie hunter";

        return () => {};
    }, []);

    const filterToHeadingMapper = {
        "Show All": "All Movies",
        "Latest Movies": "Latest Movies",
        "Most Commented": "Most Commented Movies",
    };

    return (
        <>
            {movies ? (
                <article className='my-12'>
                    <h1 className='text-2xl font-bold my-4' tabIndex='0'>
                        {filterToHeadingMapper[filter] || "Movies"}
                        <br />
                        {searchValue ? (
                            <span className='my-4 flex gap-4 text-base'>
                                {"Based on search: " + searchValue}
                                <button
                                    className='mx-4 px-4 py-0'
                                    onClick={() => {
                                        setSearchValue("");
                                    }}
                                >
                                    Clear search
                                </button>
                            </span>
                        ) : null}
                    </h1>

                    <MovieList
                        movies={movies}
                        filter={filter}
                        amountToShow={
                            filter === undefined && comments ? 8 : undefined
                        }
                    />
                </article>
            ) : null}
            {filter === undefined && movies && comments ? (
                <article className='my-12'>
                    <h1 className='text-2xl font-bold my-4'>Most Commented</h1>

                    <MovieList
                        movies={movies}
                        filter='Most Commented'
                        amountToShow={8}
                    />
                </article>
            ) : null}
        </>
    );
}
