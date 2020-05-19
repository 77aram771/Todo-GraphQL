import React, {useState} from "react";
import {useQuery, useMutation} from "@apollo/react-hooks";
import {notify} from "react-notify-toast";
import {InputUi} from "./componets/InputUI";
import {TextAreaUi} from "./componets/TextAreaUi";
import {NOTE_QUERY, UPDATE_NOTE} from "./graphQLServer";

const EditNote = ({match}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const {loading, error, data} = useQuery(NOTE_QUERY, {
        variables: {
            _id: match.params.id
        }
    });
    const [updateNote] = useMutation(UPDATE_NOTE);

    function handleValue(value) {
        setTitle(value)
    }

    function handleContent(value) {
        setContent(value)
    }

    if (loading) return <div>Fetching note</div>;
    if (error) return <div>Error fetching note</div>;

    const note = data;

    return (
        <div className="container m-t-20">
            <h1 className="page-title">Edit TODO</h1>

            <div className="newnote-page m-t-20">
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        updateNote({
                            variables: {
                                _id: note.getNote._id,
                                title: title ? title : note.getNote.title,
                                content: content ? content : note.getNote.content
                            }
                        });
                        notify.show("Note was edited successfully", "success");
                    }}
                >
                    <InputUi title={title} handleValue={handleValue}/>

                    <TextAreaUi content={content} handleContent={handleContent}/>

                    <div className="control field">
                        <button className="button is-link">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNote;
