import { useEffect, useState } from "react";
import { get, post } from "../../lib/fetcher";

export default function Contact() {
    const [contacts, setContacts] = useState();
    const [form, setForm] = useState({});

    const [formResponseMessage, setFormResponseMessage] = useState();
    useEffect(() => {
        get("Contacts").then((json) => setContacts(json));
        return () => {};
    }, []);

    function handleChange(e) {
        setForm((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const success = post(
            "Messages",
            JSON.stringify({ content: form.message, email: form.email })
        );

        if (success) {
            setFormResponseMessage("Thank you for your message");

            setForm({});
        } else {
            setFormResponseMessage("An unexpected error occurred");
        }
    }

    return (
        <article className='my-12'>
            <h1 className='text-xl font-bold'>Contact</h1>

            <p>{contacts?.[0].content}</p>

            <article className='max-w-prose mx-auto my-8'>
                <h1 className='text-orange-500 text-2xl text-center my-4'>
                    Get in touch!
                </h1>
                <form
                    onSubmit={handleSubmit}
                    action=''
                    className='flex flex-col items-center gap-4'
                >
                    <input
                        onChange={handleChange}
                        type='text'
                        placeholder='Your Name'
                        name='name'
                        autoComplete='name'
                        className='w-full'
                        value={form.name || ""}
                        required
                    />
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Email'
                        autoComplete='email'
                        className='w-full'
                        value={form.email || ""}
                        required
                    />
                    <textarea
                        onChange={handleChange}
                        name='message'
                        rows='10'
                        placeholder='Your Message...'
                        className='w-full'
                        required
                        value={form.message || ""}
                    ></textarea>

                    <button className='w-fit px-4 py-2'>Send</button>
                    {formResponseMessage ? (
                        <div>{formResponseMessage}</div>
                    ) : null}
                </form>
            </article>
        </article>
    );
}
