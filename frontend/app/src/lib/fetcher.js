const imagesBaseUrl = "https://localhost:7091/";
const apiBaseUrl = "https://localhost:7091/api/";

async function post(endpoint, body) {
    const res = await fetch(apiBaseUrl + endpoint, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: body,
    });

    const json = await res.json();

    console.log(json);

    return json;
}

async function get(endpoint, id) {
    const res = await fetch(apiBaseUrl + endpoint + (id ? "/" + id : ""));

    console.log(res);

    const json = await res.json();

    console.log(json);

    return json;
}

async function del(endpoint, id) {
    const res = await fetch(apiBaseUrl + endpoint + "/" + id, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
    });

    return res.ok;
}

async function put(endpoint, id, body) {
    console.log(body);
    const res = await fetch(apiBaseUrl + endpoint + "/" + id, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: body,
    });

    console.log(res);

    return res.ok;
}

module.exports = {
    post: post,
    get: get,
    del: del,
    put: put,
    imagesBaseUrl: imagesBaseUrl,
};
