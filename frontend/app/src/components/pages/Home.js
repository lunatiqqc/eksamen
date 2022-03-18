import { useContext, useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { context } from "../Context";
import MovieList from "../MovieList";

export default function Home() {
    const { searchValue, setSearchValue, filter } = useOutletContext();

    const { movies, comments } = useContext(context);

    useEffect(() => {
        document.title = "Movie hunter";

        return () => {};
    }, []);

    const firstFocusElement = useRef();

    useEffect(() => {
        firstFocusElement.current?.focus();
        return () => {};
    }, [filter]);

    const filterToHeadingMapper = {
        "Show All": "All Movies",
        "Latest Movies": "Latest Movies",
        "Most Commented": "Most Commented Movies",
    };

    return (
        <>
            {movies ? (
                <article className='my-12'>
                    <h1
                        ref={firstFocusElement}
                        className='text-2xl font-bold my-4'
                        tabIndex='0'
                    >
                        {filterToHeadingMapper[filter] || "Movies"}
                    </h1>

                    {searchValue ? (
                        <div className='flex items-center'>
                            <h2
                                tabIndex='0'
                                className='my-4 flex gap-4 text-base'
                            >
                                {"Based on search: " + searchValue}
                            </h2>

                            <button
                                tabIndex='0'
                                className='mx-4 px-4 py-0'
                                onClick={() => {
                                    setSearchValue("");
                                }}
                            >
                                Clear search
                            </button>
                        </div>
                    ) : null}

                    <MovieList
                        movies={movies}
                        searchValue={searchValue}
                        filter={filter}
                        amountToShow={
                            filter === undefined && comments?.length > 0
                                ? 8
                                : undefined
                        }
                    />
                </article>
            ) : null}
            {filter === undefined && movies && comments?.length > 0 ? (
                <article className='my-12'>
                    <h1 tabIndex='0' className='text-2xl font-bold my-4'>
                        Most Commented
                    </h1>

                    {searchValue ? (
                        <div className='flex items-center'>
                            <h2
                                tabIndex='0'
                                className='my-4 flex gap-4 text-base'
                            >
                                {"Based on search: " + searchValue}
                            </h2>

                            <button
                                tabIndex='0'
                                className='mx-4 px-4 py-0'
                                onClick={() => {
                                    setSearchValue("");
                                }}
                            >
                                Clear search
                            </button>
                        </div>
                    ) : null}

                    <MovieList
                        movies={movies}
                        searchValue={searchValue}
                        filter='Most Commented'
                        amountToShow={8}
                    />
                </article>
            ) : null}
        </>
    );
}
