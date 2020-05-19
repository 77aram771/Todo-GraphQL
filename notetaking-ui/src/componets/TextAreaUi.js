import React from 'react';

export const TextAreaUi = ({content, handleContent}) => (
    <div className="field">
        <label className="label">TODO Content</label>
        <div className="control">
            <textarea
                className="textarea"
                name="content"
                rows="10"
                placeholder="TODO Content here..."
                value={content}
                onChange={e => handleContent(e.target.value)}
            />
        </div>
    </div>
)
