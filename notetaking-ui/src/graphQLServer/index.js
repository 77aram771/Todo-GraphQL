import gql from "graphql-tag";

export const NOTES_QUERY = gql`
    {
        allNotes {
            title
            content
            _id
            date
        }
    }
`;

export const NOTE_QUERY = gql`
    query getNote($_id: ID!) {
        getNote(_id: $_id) {
            _id
            title
            content
            date
        }
    }
`;

export const UPDATE_NOTE = gql`
    mutation updateNote($_id: ID!, $title: String, $content: String) {
        updateNote(_id: $_id, input: { title: $title, content: $content }) {
            _id
            title
            content
        }
    }
`;

export const NEW_NOTE = gql`
    mutation createNote($title: String!, $content: String!) {
        createNote(input: { title: $title, content: $content }) {
            _id
            title
            content
            date
        }
    }
`;

export const DELETE_NOTE_QUERY = gql`
    mutation deleteNote($_id: ID!) {
        deleteNote(_id: $_id) {
            title
            content
            _id
            date
        }
    }
`;
