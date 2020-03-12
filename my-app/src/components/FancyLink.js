import React from 'react';

class FancyLink extends React.Component {
    
    render() {
        var {size, ...attribs} = this.props;

        switch(size) {
            case 'small':
                attribs.style.background = "black";
                break;
        
            case 'medium': 
            attribs.style.background = "blue";
                break;

            case 'large':
                attribs.style.background = "red";
                break;
            default:
                
        }

        return <a {...attribs}>{this.props.children}</a>
    }
}

export default FancyLink;