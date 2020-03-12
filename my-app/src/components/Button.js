import './Button.css'
import React from 'react';
import classNames from 'classnames';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.classNames = classNames('Button', props.className);
        this.props = props;
    }
    render() {
        let ariaLabel = "TODO: Add aria label here" || this.props.ariaLabel;
        return (
            this.props.href 
            ?   <a aria-label={ariaLabel} {...this.props} className={this.classNames}></a>
            :   <button aria-label={ariaLabel} {...this.props} className={this.classNames}></button>
        )
    }
}

export default Button