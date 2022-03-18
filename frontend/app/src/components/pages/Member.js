import { useContext, useState } from "react";
import { createMember, login } from "../../lib/fetcher";
import { context } from "../Context";
import UserEditor from "../UserEditor";

export default function Member() {
    const { user, setToken } = useContext(context);

    const [form, setForm] = useState({});

    const [imagePreview, setImagePreview] = useState();

    const [responseMessage, setResponseMessage] = useState();

    async function imageToBase64(image) {
        image = await fetch(image).then((r) => r.blob());

        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.readAsDataURL(image);
        });
    }

    function handleChange(e) {
        setForm((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }

    function handleImageChange(e) {
        const file = e.target.files[0];

        const fakePath = URL.createObjectURL(file);

        setImagePreview(fakePath);
    }

    const inputs = [
        "name",
        "address",
        "image",
        "email",
        "username",
        "password",
        "phonenumber",
        "alias",
    ];

    async function handleSubmit(e) {
        e.preventDefault();
        const obj = inputs.reduce((prev, curr) => {
            prev[curr] = form[curr] || "";
            return prev;
        }, {});

        if (imagePreview) {
            const base64 = await imageToBase64(imagePreview);
            obj.image = base64.split(",")[1];
        }

        const success = await createMember("Members", JSON.stringify(obj));

        if (success == "409") {
            setResponseMessage(
                "Member already exists with the specified username or email"
            );

            return;
        }
        if (success) {
            setResponseMessage("Membership created");

            const token = await login(
                "login",
                JSON.stringify({
                    username: form.username,
                    password: form.password,
                })
            );

            setToken(token);

            setForm({});
        }
    }

    const inputToTypeMapper = {
        image: "file",
        email: "email",
    };

    const inputToAutocompleteMapper = {
        address: "address",
        email: "email",
        username: "username",
        phonenumber: "tel",
    };

    const inputToRequiredMapper = {
        username: "required",
        email: "required",
        password: "required",
    };

    return user === undefined ? (
        <article className='max-w-prose mx-auto my-16'>
            <h1 className='text-xl font-bold my-4 text-center'>
                Become a member
            </h1>
            <form
                onSubmit={handleSubmit}
                action=''
                className='flex flex-col gap-4'
            >
                {inputs.map((input, i) => {
                    return (
                        <div
                            key={i}
                            className={
                                "flex items-center gap-4 p-2" +
                                (input === "image" ? " bg-slate-600" : "")
                            }
                        >
                            {input === "image" ? (
                                <label htmlFor='image'>Profile picture</label>
                            ) : null}
                            <input
                                className=' p-2'
                                type={inputToTypeMapper[input] || "text"}
                                placeholder={input}
                                onChange={
                                    input === "image"
                                        ? handleImageChange
                                        : handleChange
                                }
                                name={input}
                                value={form[input] || ""}
                                autoComplete={inputToAutocompleteMapper[input]}
                                required={inputToRequiredMapper[input]}
                            />

                            {input === "image" && imagePreview ? (
                                <figure>
                                    <img src={imagePreview} alt='' />
                                </figure>
                            ) : null}
                        </div>
                    );
                })}

                <button className='w-fit my-2 mx-auto px-4 py-2'>
                    Create{" "}
                </button>

                {responseMessage ? (
                    <span className='w-fit my-2 mx-auto p-4 text-xl'>
                        {responseMessage}
                    </span>
                ) : null}
            </form>
        </article>
    ) : (
        <UserEditor user={user} />
    );
}
