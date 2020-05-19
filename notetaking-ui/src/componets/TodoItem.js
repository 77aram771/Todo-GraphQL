import React from 'react';
import {Link} from "react-router-dom";
import {notify} from "react-notify-toast";

export const TodoItem = ({todos, deleteNote}) => {
    return (
        <div className="column is-one-third test" >
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">{todos.title}</p>
                </header>
                <div className="card-content">
                    <div className="content">
                        {todos.content}
                        <br/>
                    </div>
                </div>
                <footer className="card-footer">
                    <Link to={`note/${todos._id}`} className="card-footer-item">
                        Edit
                    </Link>
                    <button
                        onClick={e => {
                            e.preventDefault();
                            deleteNote({variables: {_id: todos._id}});
                            notify.show("Note was deleted successfully", "success");
                        }}
                        className="card-footer-item"
                    >
                        Delete
                    </button>
                </footer>
            </div>
        </div>
        )

}
