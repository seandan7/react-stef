import React from 'react';

const Actions = props => {
    return (
        <div className="Actions">
            <span
                tabIndex="0"
                className="ActionsInfo"
                title="More Info"
                onClick={props.onAction.bind(null, 'info')}
            >
                &#8505;
        </span>
            <span
                tabIndex="0"
                className="ActionsEdit"
                title="Edit"
                onClick={props.onAction.bind(null, 'edit')}
            >
                &#10000;
        </span>
            <span
                tabIndex="0"
                className="ActionsDelete"
                title="Delete"
                onClick={props.onAction.bind(null, 'delete')}
            >
                X
        </span>
        </div>
    );
}

export default Actions;