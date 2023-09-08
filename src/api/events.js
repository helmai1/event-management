import axios from "axios";

const eventURL = "http://localhost:8000/events"

const fetchEvents = axios.get(eventURL);

const postEvents = (data) => {
    axios.post(eventURL, data);
};

export default {
    fetchEvents,
    postEvents
};