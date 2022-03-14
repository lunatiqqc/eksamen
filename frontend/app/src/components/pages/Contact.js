import React, { useEffect, useState } from "react";
import { get } from "../../lib/fetcher";

export default function Contact() {
    const [contacts, setContacts] = useState();
    useEffect(() => {
        get("Contacts").then((json) => setContacts(json));
        return () => {};
    }, []);

    return (
        <article className='my-12'>
            <h1 className='text-xl font-bold'>Contact</h1>

            <p>{contacts?.[0].content}</p>

            <article className='w-2/3 mx-auto my-8'>
                <h1 className='text-orange-500 text-2xl text-center my-4'>
                    Get in touch!
                </h1>
                <form action='' className='flex flex-col items-center gap-4'>
                    <input
                        type='text'
                        placeholder='Your Name'
                        autoComplete='name'
                        className='w-full'
                        required
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        autoComplete='email'
                        className='w-full'
                        required
                    />
                    <textarea
                        rows='10'
                        placeholder='Your Message...'
                        className='w-full'
                        required
                    ></textarea>

                    <button className='w-fit'>Send</button>
                </form>
            </article>
        </article>
    );
}
