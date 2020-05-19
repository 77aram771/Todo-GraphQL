import React from 'react'

export const InputUi = ({title, handleValue}) => (
    <div className="field">
        <label className="label">TODO Title</label>
        <div className="control">
            <input
                className="input"
                name="title"
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={e => handleValue(e.target.value)}
            />
        </div>
    </div>
)
