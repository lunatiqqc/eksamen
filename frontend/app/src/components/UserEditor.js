import React, { useContext, useEffect, useRef, useState } from "react";

import { AiFillEdit, AiFillSave } from "react-icons/ai";
import { MdCancelPresentation } from "react-icons/md";
import { getUser, imagesBaseUrl, put } from "../lib/fetcher";
import { context } from "./Context";

export default function UserEditor({ user }) {
    const entries = Object.entries(user);

    const { setUser } = useContext(context);

    const [editingAt, setEditingAt] = useState();

    const [imagePreview, setImagePreview] = useState();

    const editableRefs = useRef({});

    useEffect(() => {
        if (editingAt && editingAt !== "image") {
            editableRefs.current[editingAt].focus();
        }
    }, [editingAt]);

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

    async function handleSaveChanges() {
        const obj = Object.keys(user).reduce((prev, curr) => {
            if (curr === "id" || curr === "image") {
                return prev;
            }
            prev[curr] = editableRefs.current[curr].innerText;
            return prev;
        }, {});

        if (editableRefs.current["image"].src.replace(imagesBaseUrl, "")) {
            const base64 = await imageToBase64(
                editableRefs.current["image"].src
            );
            obj.image = base64.split(",")[1];
        } else {
            obj.image = "";
        }

        obj.id = user.id;

        const success = await put("Members", obj.id, JSON.stringify(obj));

        if (success) {
            window.location.reload();
        }
    }

    function handleImageChange(e) {
        const file = e.target.files[0];

        const fakePath = URL.createObjectURL(file);

        setImagePreview(fakePath);
    }

    return (
        <article className='my-2'>
            <h1 className='text-xl font-bold my-8'>
                {"Hello " + (user.alias || "anonymous")}
            </h1>
            <table>
                <tbody className='flex flex-col gap-4'>
                    {entries.map(([key, val], i) => {
                        const editing = key === editingAt;
                        if (key === "id") {
                            return null;
                        }
                        return (
                            <tr className='flex items-center gap-4' key={i}>
                                <th>{key}</th>
                                <td className='flex items-center gap-2'>
                                    <div
                                        ref={(el) => {
                                            if (key === "image") {
                                                return;
                                            }
                                            editableRefs.current[key] = el;
                                        }}
                                        contentEditable={editing}
                                        suppressContentEditableWarning={editing}
                                    >
                                        {key === "image" ? (
                                            <figure className='min-w-[100px] relative'>
                                                <img
                                                    className='max-w-[200px] object-cover aspect-square'
                                                    src={
                                                        imagePreview ||
                                                        imagesBaseUrl + val
                                                    }
                                                    alt=''
                                                    ref={(el) => {
                                                        editableRefs.current[
                                                            key
                                                        ] = el;
                                                    }}
                                                />
                                                {editing ? (
                                                    <input
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                        className='absolute inset-0 w-full'
                                                        type='file'
                                                    />
                                                ) : null}
                                            </figure>
                                        ) : (
                                            val
                                        )}
                                    </div>
                                    {editing ? null : (
                                        <button
                                            onClick={() => {
                                                if (editing) {
                                                    setEditingAt();
                                                    return;
                                                }
                                                setEditingAt(key);
                                            }}
                                        >
                                            <AiFillEdit size='20' />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button
                onClick={handleSaveChanges}
                className='flex items-center text-xl p-2 rounded-lg my-4'
            >
                Save changes
                <AiFillSave size='36' />
            </button>
        </article>
    );
}
