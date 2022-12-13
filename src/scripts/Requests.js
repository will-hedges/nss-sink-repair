import { deleteRequest, getPlumbers, getRequests } from "./dataAccess.js";

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

export const Requests = () => {
    const requests = getRequests();

    let html = `
    <ul>
        ${requests.map((request) => convertRequestToListElem(request)).join("")}
    </ul>
    `;

    return html;
};

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("click", (click) => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--");
        deleteRequest(parseInt(requestId));
    }
});
