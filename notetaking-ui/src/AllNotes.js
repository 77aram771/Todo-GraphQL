import React, {useState} from "react";
import {Link} from "react-router-dom";
import gql from "graphql-tag";
import {useQuery, useMutation} from "@apollo/react-hooks";
import {notify} from "react-notify-toast";

const NEW_NOTE = gql`
  mutation createNote($title: String!, $content: String!) {
    createNote(input: { title: $title, content: $content }) {
      _id
      title
      content
      date
    }
  }
`;
const NOTES_QUERY = gql`
  {
    allNotes {
      title
      content
      _id
      date
    }
  }
`;
const DELETE_NOTE_QUERY = gql`
  mutation deleteNote($_id: ID!) {
    deleteNote(_id: $_id) {
      title
      content
      _id
      date
    }
  }
`;


const AllNotes = () => {
    const {loading, error, data} = useQuery(NOTES_QUERY);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [createNote] = useMutation(NEW_NOTE, {
        update(
            cache,
            {
                data: {createNote}
            }
        ) {
            const {allNotes} = cache.readQuery({query: NOTES_QUERY});

            cache.writeQuery({
                query: NOTES_QUERY,
                data: {allNotes: allNotes.concat([createNote])}
            });
        }
    });
    const [deleteNote] = useMutation(DELETE_NOTE_QUERY, {
        update(
            cache,
            {
                data: {deleteNote}
            }
        ) {
            const {allNotes} = cache.readQuery({query: NOTES_QUERY});
            const newNotes = allNotes.filter(note => note._id !== deleteNote._id);

            cache.writeQuery({
                query: NOTES_QUERY,
                data: {allNotes: newNotes}
            });
        }
    });

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <div className="container m-t-20">
            <div className="m-b-40">
                <h1 className="page-title">New TODO</h1>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        createNote({
                            variables: {
                                title,
                                content,
                                date: Date.now()
                            }
                        });
                    }}
                >
                    <div className="field">
                        <label className="label">TODO Title</label>
                        <div className="control">
                            <input
                                className="input"
                                name="title"
                                type="text"
                                placeholder="Note Title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">TODO Content</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                name="content"
                                rows="10"
                                placeholder="TODO Content here..."
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <h1 className="page-title">All TODO</h1>
                <div className="columns is-multiline">
                    {data.allNotes.map(note => (
                        <div className="column is-one-third" key={note._id}>
                            <div className="card">
                                <header className="card-header">
                                    <p className="card-header-title">{note.title}</p>
                                </header>
                                <div className="card-content">
                                    <div className="content">
                                        {note.content}
                                        <br/>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <Link to={`note/${note._id}`} className="card-footer-item">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={e => {
                                            e.preventDefault();
                                            deleteNote({variables: {_id: note._id}});
                                            notify.show("Note was deleted successfully", "success");
                                        }}
                                        className="card-footer-item"
                                    >
                                        Delete
                                    </button>
                                </footer>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllNotes;
