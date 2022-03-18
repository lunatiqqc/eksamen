const imagesBaseUrl = "https://localhost:7091/";
const apiBaseUrl = "https://localhost:7091/api/";

async function post(endpoint, body, token) {
    const res = await fetch(apiBaseUrl + endpoint, {
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? "Bearer " + token : "",
        },
        method: "POST",
        body: body,
    });

    if (res.status == "409") {
        return "409";
    }

    if (res.ok === false) {
        return false;
    }

    const json = await res.json();

    return json;
}

async function createMember(endpoint, body) {
    const res = await fetch(apiBaseUrl + endpoint, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: body,
    });

    if (res.status == "409") {
        return "409";
    }

    return res.ok;
}

async function getUser(endpoint, token) {
    const res = await fetch(apiBaseUrl + endpoint, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        method: "POST",
    });

    if (res.ok === false) {
        return false;
    }

    const json = await res.json();

    return json;
}

async function login(endpoint, body) {
    const res = await fetch(apiBaseUrl + endpoint, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: body,
    });

    const token = await res.text();

    return token;
}

async function get(endpoint, id, auth) {
    const res = await fetch(apiBaseUrl + endpoint + (id ? "/" + id : ""), {
        headers: { Authorization: auth ? "Bearer " + auth : "" },
    });

    const json = await res.json();

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
    const res = await fetch(apiBaseUrl + endpoint + "/" + id, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: body,
    });

    return res.ok;
}

module.exports = {
    post: post,
    get: get,
    del: del,
    put: put,
    login: login,
    getUser: getUser,
    createMember: createMember,
    imagesBaseUrl: imagesBaseUrl,
};
