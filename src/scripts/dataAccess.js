const applicationState = {
    requests: [],
};

const API = "http://localhost:8088";

const mainContainer = document.querySelector("#container");

export const deleteCompletion = (id) => {
    return fetch(`${API}/completions/${id}`, { method: "DELETE" }).then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" }).then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then((response) => response.json())
        .then((data) => {
            applicationState.completions = data;
        });
};

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then((response) => response.json())
        .then((data) => {
            applicationState.plumbers = data;
        });
};

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then((response) => response.json())
        .then((serviceRequests) => {
            // Store the external state in application state
            applicationState.requests = serviceRequests;
        });
};

export const getCompletions = () => {
    return applicationState.completions.map((completion) => ({
        ...completion,
    }));
};

export const getPlumbers = () => {
    return applicationState.plumbers.map((plumber) => ({ ...plumber }));
};

export const getRequests = () => {
    return applicationState.requests.map((req) => ({ ...req }));
};

export const saveCompletion = (completionRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(completionRequest),
    };

    return fetch(`${API}/completions`, fetchOptions)
        .then((response) => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
        });
};

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userServiceRequest),
    };

    return fetch(`${API}/requests`, fetchOptions)
        .then((response) => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
        });
};
