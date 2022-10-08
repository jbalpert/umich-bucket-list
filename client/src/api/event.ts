import axiosClient from ".";
import { IEventForm } from "../types";
const EVENT_URL = "/event";

const today = new Date().toISOString();

export const eventApi = {
    getCurrentEvents: () => axiosClient.get(`${EVENT_URL}?approval=true&startDate=${today}`),
    getEventById: (id: string) => axiosClient.get(`${EVENT_URL}/${id}`),
    createEvent: (event: IEventForm) => axiosClient.post(EVENT_URL, event),
    getEventsByUserId: (id: string) => axiosClient.get(`${EVENT_URL}/byuser/${id}`),
    rsvpEvent: (eventId: string, userId: string) => axiosClient.patch(`${EVENT_URL}/${eventId}/${userId}/rsvp`),
    unrsvpEvent: (eventId: string, userId: string) => axiosClient.patch(`${EVENT_URL}/${eventId}/${userId}/unrsvp`),

    // updateEvent: (id: string, event: IEvent) => axiosClient.patch(`${EVENT_URL}/${id}`, event),
    // deleteEvent: (id: string) => axiosClient.delete(`${EVENT_URL}/${id}`),
};