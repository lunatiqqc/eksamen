import React from "react";
import { Link } from "react-router-dom";
import EmptyArrayChecker from "./EmptyArrayChecker";

export default function ListArticle({
    title,
    list,
    itemBaseLink,
    itemsBaseLink,
    emptyArrayMessage,
    linkState,
}) {
    return (
        <article>
            <div className='flex justify-between'>
                <h1 tabIndex='0' className='text-lg font-bold'>
                    {title}
                </h1>
                {list.length > 0 ? (
                    <Link className='text-orange-500' to={itemsBaseLink}>
                        See All
                    </Link>
                ) : null}
            </div>
            <ul>
                <EmptyArrayChecker message={emptyArrayMessage}>
                    {list.map((item, i) => {
                        if (i > 3) {
                            return null;
                        }
                        return (
                            <li tabIndex='0' key={i} className='my-4'>
                                <article>
                                    <time
                                        className='text-sm'
                                        dateTime={item.releaseDate || item.date}
                                    >
                                        {item.releaseDate || item.date}
                                    </time>
                                    <h1 className='text-orange-500 line-clamp-1'>
                                        {item.title}
                                    </h1>
                                    <p className='line-clamp-2'>
                                        {item.description || item.content}
                                    </p>
                                    <Link
                                        to={itemBaseLink + "/" + item.id}
                                        state={linkState}
                                        className='underline text-orange-500'
                                    >
                                        Read More
                                    </Link>
                                </article>
                            </li>
                        );
                    })}
                </EmptyArrayChecker>
            </ul>
        </article>
    );
}
