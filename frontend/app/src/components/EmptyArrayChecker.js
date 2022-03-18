import React from "react";

export default function EmptyArrayChecker({ children, message }) {
    return children.length > 0 ? (
        <>{children}</>
    ) : (
        <span tabIndex='0' className='text-xl m-4 ml-0'>
            {message}
        </span>
    );
}
