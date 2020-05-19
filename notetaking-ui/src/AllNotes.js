import React, {useState} from "react";
import {useQuery, useMutation} from "@apollo/react-hooks";
import {DELETE_NOTE_QUERY, NEW_NOTE, NOTES_QUERY} from "./graphQLServer";
import {TodoItem} from './componets/TodoItem'
import {InputUi} from './componets/InputUI'
import {TextAreaUi} from "./componets/TextAreaUi";

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

    function handleValue(value) {
        setTitle(value)
    }

    function handleContent(value) {
        setContent(value)
    }

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
                    <InputUi title={title} handleValue={handleValue}/>

                    <TextAreaUi content={content} handleContent={handleContent}/>

                    <div className="control field">
                        <button className="button is-link">Submit</button>
                    </div>
                </form>
            </div>
            <div>
                <h1 className="page-title">All TODO</h1>
                <div className="columns is-multiline">
                    {data.allNotes.map(todo => {
                        return (
                            <TodoItem todos={todo} key={todo._id} deleteNote={deleteNote}/>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default AllNotes;
