import { useEffect, useRef, useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillSave } from "react-icons/ai";
import { FcUpload } from "react-icons/fc";
import { IoAddCircle } from "react-icons/io5";
import { MdCancelPresentation } from "react-icons/md";
import { del, get, post, put } from "../../lib/fetcher";

export default function Dashboard({
    swagger,
    imageBaseUrl,
    endpointToImageEndpointMapper,
}) {
    const [endpointsData, setEndpointsData] = useState();
    const [editingAt, setEditingAt] = useState();
    const [addingAt, setAddingAt] = useState();
    const [confirmDeleteAt, setConfirmDeleteAt] = useState();
    const [ImagePreviewSrc, setImagePreviewSrc] = useState();
    const editableRefs = useRef();
    const confirmDeleteRef = useRef();
    const tableRefs = useRef();
    const navRef = useRef();

    const endpoints = Object.keys(swagger.paths);

    const endpointsFiltered = endpoints
        .map((endpoint) => endpoint.replace("/api/", "").replace())
        .filter((endpoint) => !endpoint.includes("{"));

    useEffect(() => {
        for (let i = 0; i < endpointsFiltered.length; i++) {
            const endpoint = endpointsFiltered[i];

            get(endpoint).then((json) =>
                setEndpointsData((prev) => ({ ...prev, [endpoint]: json }))
            );
        }

        return () => {};
    }, []);

    useEffect(() => {
        if (addingAt) {
            const refsEl = Object.values(editableRefs.current).filter((el) => {
                return el !== null && el !== undefined;
            });

            console.log(refsEl);

            for (let i = 0; i < refsEl.length; i++) {
                const element = refsEl[i];

                if (i === 1) {
                    element?.focus();
                }
            }
        }
        return () => {};
    }, [addingAt]);

    function handleEdit(endpoint, id) {
        setImagePreviewSrc();

        setEditingAt({ endpoint: endpoint, id: id });
    }

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

    async function handlePut(keys, properties, endpoint, id) {
        const obj = keys.reduce((prev, curr) => {
            const value = editableRefs.current[curr].innerText;
            let apiDataType = properties[curr].type;

            if (apiDataType === "integer") {
                const isInteger = Number.isInteger(parseInt(value));

                if (isInteger) {
                    prev[curr] = value;

                    return prev;
                } else {
                    window.alert(
                        "Redigering fejlede " +
                            curr +
                            ": " +
                            value +
                            " skal være af type: " +
                            "helt tal"
                    );

                    return new Error();
                }
            }

            prev[curr] = value;

            return prev;
        }, {});

        if (obj instanceof Error) {
            return;
        }

        console.log(obj);

        let image;

        if (ImagePreviewSrc) {
            image = await imageToBase64(ImagePreviewSrc);
        } else {
            const imageSrc = editableRefs.current["image"].src;

            image = await imageToBase64(imageSrc);
        }

        obj.image = image.split(",")[1];

        const success = await put(endpoint, obj.id, JSON.stringify(obj));

        if (success) {
            setEditingAt();
            if (ImagePreviewSrc) {
                setEndpointsData((prev) => {
                    const copy = [...prev[endpoint]];
                    const index = prev[endpoint].findIndex((item) => {
                        return item.id === id;
                    });

                    copy[index].image = ImagePreviewSrc;

                    return { ...prev, [endpoint]: copy };
                });
            }
        }
    }

    function handleCancelEdit(endpoint, id) {
        for (const key in editableRefs.current) {
            if (editableRefs.current[key] && key !== "image") {
                editableRefs.current[key].innerText = endpointsData[
                    endpoint
                ].find((data) => {
                    return data.id === id;
                })[key];
            }
        }
        setEditingAt();
        setImagePreviewSrc();
    }

    function handleCancelAdd(endpoint) {
        setEndpointsData((prev) => {
            return { ...prev, [endpoint]: prev[endpoint].slice(0, -1) };
        });
        setAddingAt();
        setImagePreviewSrc();
    }

    async function handleDelete(endpoint, id) {
        const success = await del(endpoint, id);

        if (success) {
            setConfirmDeleteAt();
            setEndpointsData((prev) => {
                return {
                    ...prev,
                    [endpoint]: prev[endpoint].filter((item) => {
                        return item.id !== id;
                    }),
                };
            });
        }
    }

    function handleAdd(endpoint, keys, properties) {
        setEditingAt();
        const emptyDataObj = keys.reduce((prev, curr) => {
            if (properties[curr]?.type === "integer") {
                prev[curr] = 0;
                return prev;
            }
            prev[curr] = "";
            return prev;
        }, {});
        setEndpointsData((prev) => {
            return { ...prev, [endpoint]: [...prev[endpoint], emptyDataObj] };
        });
        setAddingAt(endpoint);
    }

    async function handlePost(endpoint, keys, properties) {
        const obj = keys.reduce((prev, curr) => {
            const value = editableRefs.current[curr].innerText;
            let apiDataType = properties[curr].type;

            if (apiDataType === "integer") {
                const isInteger = Number.isInteger(parseInt(value));

                if (isInteger) {
                    prev[curr] = value;

                    return prev;
                } else {
                    window.alert(
                        "Redigering fejlede " +
                            curr +
                            ": " +
                            value +
                            " skal være af type: " +
                            "helt tal"
                    );

                    return new Error();
                }
            }

            prev[curr] = value;

            return prev;
        }, {});

        if (obj instanceof Error) {
            return;
        }

        if (ImagePreviewSrc) {
            const image = await imageToBase64(ImagePreviewSrc);

            obj.image = image.split(",")[1];
        } else {
            obj.image = null;
        }

        const newData = await post(endpoint, JSON.stringify(obj));

        setEndpointsData((prev) => {
            const lastIndex = prev[endpoint].length - 1;
            return {
                ...prev,
                [endpoint]: [...prev[endpoint].slice(0, -1), newData],
            };
        });

        setAddingAt();
    }

    function handleImageChange(e) {
        const src = URL.createObjectURL(e.target.files[0]);

        setImagePreviewSrc(src);
    }

    function TableFunctionsHeader(props) {
        if (props.adding === true)
            return (
                <>
                    <th className='bg-slate-400 border-2'>Fortryd</th>
                    <th className='bg-slate-400 border-2'>Upload</th>
                </>
            );
        if (props.editing === true)
            return (
                <>
                    <th className='bg-slate-400 border-2'>Annullér</th>
                    <th className='bg-slate-400 border-2'>Gem</th>
                </>
            );
        return (
            <>
                <th className='bg-slate-400 border-2'>Redigér</th>
                <th className='bg-slate-400 border-2'>Slet</th>
            </>
        );
    }

    function TableFunctionsData(props) {
        const showConfirmDelete =
            confirmDeleteAt?.endpoint === props.endpoint &&
            confirmDeleteAt?.id === props.id;
        if (addingAt) {
            if (!props.isLastItem) {
                return (
                    <>
                        <td></td>
                        <td></td>
                    </>
                );
            }

            if (addingAt === props.endpoint)
                return (
                    <>
                        <td>
                            <MdCancelPresentation
                                onClick={(e) => {
                                    handleCancelAdd(props.endpoint);
                                }}
                                size='36'
                            />
                        </td>
                        <td>
                            <FcUpload
                                size='36'
                                onClick={(e) => {
                                    handlePost(
                                        props.endpoint,
                                        props.keys,
                                        props.properties
                                    );
                                }}
                            />
                        </td>
                    </>
                );

            return (
                <>
                    <td></td>
                    <td></td>
                </>
            );
        }
        if (props.editing === true)
            return (
                <>
                    <td>
                        <MdCancelPresentation
                            size='36'
                            onClick={(e) => {
                                handleCancelEdit(props.endpoint, props.id);
                            }}
                        />
                    </td>
                    <td>
                        <AiFillSave
                            onClick={(e) => {
                                handlePut(
                                    props.keys,
                                    props.properties,
                                    props.endpoint,
                                    props.id
                                );
                            }}
                            size='36'
                        />
                    </td>
                </>
            );
        return (
            <>
                <td>
                    <AiFillEdit
                        size='36'
                        onClick={(e) => {
                            handleEdit(props.endpoint, props.id);
                        }}
                    />
                </td>
                <td className='relative'>
                    {showConfirmDelete ? (
                        <article
                            ref={(el) => {
                                confirmDeleteRef.current = el;
                            }}
                            className='absolute right-0 top-0 h-full z-10 bg-white flex items-center gap-4 focus-visible:bg-red-900'
                        >
                            <h1 className='text-xl text-center whitespace-nowrap'>
                                Bekræft sletning
                            </h1>
                            <div className='flex justify-between'>
                                <button
                                    className='border-2 px-4'
                                    onClick={() => {
                                        handleDelete(props.endpoint, props.id);
                                    }}
                                >
                                    Ja
                                </button>{" "}
                                <button
                                    onClick={() => {
                                        setConfirmDeleteAt();
                                    }}
                                    className='border-2 px-4'
                                >
                                    Nej
                                </button>
                            </div>
                        </article>
                    ) : (
                        <AiFillDelete
                            size='36'
                            onClick={() => {
                                setConfirmDeleteAt({
                                    endpoint: props.endpoint,
                                    id: props.id,
                                });
                            }}
                        />
                    )}
                </td>
            </>
        );
    }

    return (
        <div className='flex'>
            <header className='sticky inset-0 h-fit w-fit bg-white mr-4'>
                <nav ref={navRef}>
                    <ul>
                        {endpointsFiltered.map((endpoint, i) => {
                            return (
                                <li
                                    key={i}
                                    className='border-2 bg-slate-50 active:bg-red-50'
                                >
                                    <button
                                        className='w-full h-full text-left p-4'
                                        onClick={() => {
                                            const el =
                                                tableRefs.current[endpoint];
                                            const elTop =
                                                el.getBoundingClientRect().top;

                                            const offset =
                                                window.pageYOffset + elTop;

                                            window.scrollTo({ top: offset });
                                        }}
                                    >
                                        {endpoint}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <button
                    onClick={(e) => {
                        if (navRef.current.style.display === "none") {
                            navRef.current.style.display = "block";

                            e.target.innerText = "Skjul";
                            return;
                        }
                        navRef.current.style.display = "none";

                        e.target.innerText = "Vis navigation";
                    }}
                >
                    Skjul
                </button>
            </header>
            <main className='w-full '>
                {endpointsFiltered.map((endpoint, i) => {
                    const schema = endpoint.split("/");

                    const properties =
                        swagger.components.schemas[
                            schema[schema.length - 1].slice(0, -1)
                        ].properties;

                    const keys = Object.keys(properties);

                    const editingAtEndpoint = editingAt?.endpoint === endpoint;
                    const addingAtEndpoint = addingAt === endpoint;
                    return (
                        <article
                            ref={(el) => {
                                tableRefs.current = {
                                    ...tableRefs.current,
                                    [endpoint]: el,
                                };
                            }}
                            className='my-16'
                        >
                            <div className='flex gap-4'>
                                <h1 className='text-2xl'>{endpoint}</h1>

                                <button
                                    className='flex items-center'
                                    onClick={() => {
                                        handleAdd(endpoint, keys, properties);
                                    }}
                                >
                                    Tilføj ny
                                    <IoAddCircle size='36' />
                                </button>
                            </div>
                            <table className='text-xs'>
                                <thead>
                                    <tr>
                                        {keys.map((key) => (
                                            <th className='text-left p-4 pl-0 border-2 bg-slate-100'>
                                                {key}
                                            </th>
                                        ))}
                                        {
                                            <TableFunctionsHeader
                                                editing={editingAtEndpoint}
                                                adding={addingAtEndpoint}
                                            />
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {endpointsData?.[endpoint]?.map(
                                        (data, i) => {
                                            const editing =
                                                editingAt?.endpoint ===
                                                    endpoint &&
                                                editingAt?.id === data.id;
                                            const dataObjAsArray =
                                                Object.entries(data);
                                            const isLastItem =
                                                i ===
                                                endpointsData[endpoint].length -
                                                    1;

                                            return (
                                                <tr className=' even:bg-slate-100'>
                                                    {dataObjAsArray.map(
                                                        ([key, value]) => {
                                                            const contentEditable =
                                                                key !== "id" &&
                                                                (editing ||
                                                                    (isLastItem &&
                                                                        addingAtEndpoint ===
                                                                            true));

                                                            //const dataType =
                                                            //    properties[key]
                                                            //        .type;
                                                            //
                                                            return (
                                                                <td
                                                                    className='p-4 pl-0 max-w-[40ch] break-normal overflow-hidden text-ellipsis'
                                                                    ref={(
                                                                        el
                                                                    ) => {
                                                                        if (
                                                                            editing ||
                                                                            addingAtEndpoint
                                                                        ) {
                                                                            editableRefs.current =
                                                                                {
                                                                                    ...editableRefs.current,
                                                                                    [key]:
                                                                                        key ===
                                                                                        "image"
                                                                                            ? el?.querySelector(
                                                                                                  "img"
                                                                                              )
                                                                                            : el,
                                                                                };
                                                                        }
                                                                    }}
                                                                    contentEditable={
                                                                        contentEditable
                                                                    }
                                                                    suppressContentEditableWarning={
                                                                        contentEditable
                                                                    }
                                                                >
                                                                    {key ===
                                                                    "image" ? (
                                                                        <figure className='w-48 h-48 relative flex items-center justify-center'>
                                                                            <img
                                                                                src={
                                                                                    value?.includes(
                                                                                        "blob:"
                                                                                    )
                                                                                        ? value
                                                                                        : editing ||
                                                                                          (addingAtEndpoint &&
                                                                                              isLastItem)
                                                                                        ? ImagePreviewSrc
                                                                                            ? ImagePreviewSrc
                                                                                            : imageBaseUrl +
                                                                                              endpointToImageEndpointMapper[
                                                                                                  endpoint
                                                                                              ] +
                                                                                              "/" +
                                                                                              value
                                                                                        : imageBaseUrl +
                                                                                          endpointToImageEndpointMapper[
                                                                                              endpoint
                                                                                          ] +
                                                                                          "/" +
                                                                                          value
                                                                                }
                                                                                alt=''
                                                                                className={
                                                                                    "object-contain my-auto w-full h-full"
                                                                                }
                                                                            />

                                                                            {editing ||
                                                                            (addingAtEndpoint &&
                                                                                isLastItem) ? (
                                                                                <input
                                                                                    type='file'
                                                                                    className='absolute inset-0 bg-white bg-opacity-70 h-fit'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        handleImageChange(
                                                                                            e,
                                                                                            endpoint,
                                                                                            data.id
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            ) : null}
                                                                        </figure>
                                                                    ) : (
                                                                        value
                                                                    )}
                                                                </td>
                                                            );
                                                        }
                                                    )}
                                                    {
                                                        <TableFunctionsData
                                                            keys={keys}
                                                            properties={
                                                                properties
                                                            }
                                                            editing={editing}
                                                            adding={
                                                                addingAtEndpoint
                                                            }
                                                            endpoint={endpoint}
                                                            isLastItem={
                                                                isLastItem
                                                            }
                                                            id={data.id}
                                                            className='w-4 h-4'
                                                        />
                                                    }
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </article>
                    );
                })}
            </main>
        </div>
    );
}
