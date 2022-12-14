import { Completions, Requests } from "./Requests.js";
import { ServiceForm } from "./ServiceForm.js";

export const SinkRepair = () => {
    return `
    <h1>Maude and Merle's Sink Repair</h1>
    <section class="serviceForm">
        ${ServiceForm()}
    </section>

    <section class="serviceRequests">
        <div id="serviceRequests__header">
            <h2>Service Requests</h2>
            <h3>Completed By</h3>
        </div>
        ${Requests()}
        ${Completions()}
    </section>
    `;
};
