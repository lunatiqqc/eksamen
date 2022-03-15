import React from "react";

export default function EmptyArrayChecker({ children, message }) {
    console.log(children);

    return children.length > 0 ? (
        <>{children}</>
    ) : (
        <span className='text-xl p-4'>{message}</span>
    );
}
