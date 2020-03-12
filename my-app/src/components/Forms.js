import React from 'react';

class Forms extends React.Component {
    log(ev) {
        console.log(ev.target.value);
        console.log(ev.target.defaultValue)
    }
    render() {
        return (
            <div>
                <textarea defaultValue={'hello world'} onChange={this.log}>

                </textarea>
                <textarea onChange={this.log}>
                    
                </textarea>
                <select defaultValue="second">
                    <option value="first">First</option>
                    <option value="second">Second</option>
                </select>
                <select multiple={true} defaultValue={['second']}>
                    <option value="first">First</option>
                    <option value="second">Second</option>
                </select>
            </div>
        )
    }
}

export default Forms;