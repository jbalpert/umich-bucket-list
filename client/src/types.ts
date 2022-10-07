import React from "react";

export interface IRsvp {
    _id?: string;
    created?: Date;
    userid: string;
}

export interface IEvent {
    _id: string;
    title: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    image_url: string;
    rsvps: IRsvp[];
    approval: boolean;
    creator: string;
    joined: boolean;
    created_at?: Date;
}

export interface IEventForm {
    title: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    image_url: string;
    creator: string;
    rsvps: string[];
}

export interface IUserCredentials {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    at_hash: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
    iat: number;
    exp: number;
}

export interface ILoginResponse {
    data: Data;
    status: number;
    statusText: string;
    config: Config;
    request: Request;
}

export interface Data {
    userFromDB: IUser;
    isNewUser: boolean;
}
export interface IUser {
    _id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    google_id: string;
    profile_picture: string;
    is_public: boolean;
    createdAt: string;
    phone?: string;
    events: Array<string>;
    __v: number;
}

export interface IUserBubble {
    _id: string;
    username: string;
    profile_picture: string;
    is_public: boolean;
}

export interface Config {
    transitional: Transitional;
    transformRequest?: (null)[] | null;
    transformResponse?: (null)[] | null;
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: Env;
    baseURL: string;
    withCredentials: boolean;
    method: string;
    url: string;
    data: string;
}
export interface Transitional {
    silentJSONParsing: boolean;
    forcedJSONParsing: boolean;
    clarifyTimeoutError: boolean;
}
export interface Env {
    FormData?: null;
}

export interface Request {
}

export interface IError {
    header: string;
    message: string;
}

export interface IGlobalState {
    // User
    isFirstLogin: boolean;
    setIsFirstLogin: React.Dispatch<React.SetStateAction<boolean>>;

    // Loading State
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

    // Events
    events: IEvent[];
    setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>;

    // ******* Modal State ******* //

    // Error Handling Modal
    isErrorOpen: boolean;
    setIsErrorOpen: React.Dispatch<React.SetStateAction<boolean>>;
    error: IError | null;
    setError: React.Dispatch<React.SetStateAction<IError | null>>;

    // Settings Modal
    isSettingsOpen: boolean;
    setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;

    // Event Modal
    isEventOpen: boolean;
    setIsEventOpen: React.Dispatch<React.SetStateAction<boolean>>;
    eventModalId: number;
    setEventModalId: React.Dispatch<React.SetStateAction<number>>;

    // Event Form Modal
    isEventFormOpen: boolean;
    setIsEventFormOpen: React.Dispatch<React.SetStateAction<boolean>>;

    rsvpHandler: (event_id: string) => Promise<void>;
    unrsvpHandler: (event_id: string) => Promise<void>;

    googleLogin: () => void;



}

export type IUserContext = [IUser | null, React.Dispatch<React.SetStateAction<IUser | null>>];