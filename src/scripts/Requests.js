import { getRequests } from "./dataAccess.js";

const convertRequestToListElem = (requestObj) => {
  return `
    <li>
      ${requestObj.description}  
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
