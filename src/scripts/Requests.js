import {
    deleteRequest,
    getCompletions,
    getPlumbers,
    getRequests,
    saveCompletion,
} from "./dataAccess.js";

const convertRequestToListElem = (requestObj) => {
    const plumbers = getPlumbers();

    return `
    <li>
        ${requestObj.description}
        <select class="plumbers" id="plumbers">
            <option value="">Choose</option>
                ${plumbers
                    .map((plumber) => {
                        return `<option value="${requestObj.id}--${plumber.id}">${plumber.name}</option>`;
                    })
                    .join("")}
        </select>
        <button class="request__delete" id="request--${requestObj.id}">
            Delete
        </button>
    </li>
    `;
};

const checkIfPending = (request) => {
    const completions = getCompletions();
    for (const completion of completions) {
        if (request.id == completion.requestId) {
            // return false because the work order is NOT pending
            return false;
        }
    }
    // return true because the ticket is still pending
    return true;
};

export const Requests = () => {
    /* 
        filter out requests that are already in "completions"
        go through all the completions
        take any request that has a completionId out of requests
        and only show "pending" requests
    */
    const requests = getRequests();
    const pendingRequests = requests.filter(checkIfPending);

    let html = `
    <ul>
        ${pendingRequests
            .map((request) => convertRequestToListElem(request))
            .join("")}
    </ul>
    `;

    return html;
};

export const Completions = () => {};

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("click", (click) => {
    // this is the "delete" listener
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--");
        deleteRequest(parseInt(requestId));
    }
});

mainContainer.addEventListener("change", (event) => {
    // this is the plumber/completion listener
    if (event.target.id === "plumbers") {
        const [requestId, plumberId] = event.target.value.split("--");

        /*
            This object should have 3 properties
                1. requestId
                2. plumberId
                3. date_created
        */
        const completion = {
            requestId: parseInt(requestId),
            plumberId: parseInt(plumberId),
            date_created: Date.now(),
        };

        /*
            Invoke the function that performs the POST request
            to the `completions` resource for your API. Send the
            completion object as a parameter.
        */

        saveCompletion(completion);
    }
});
