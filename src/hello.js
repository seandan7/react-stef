// ReactDOM.render(

//     React.createElement(
//         'h1',
//         {
//             className: 'class-1',
//             style: {
//                 color: 'red'
//             }
//         },
//         "Hello World"
//     ),
//     document.getElementById('app')
// )

class TextAreaCounter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            charCount: null
        }
        this.wordCount = this.wordCount.bind(this);
    }
    wordCount(e) {
        var currentText = e.target.value;
        var characterCount = currentText.length;
        this.setState({
            charCount: characterCount
        });
    }
    render() {
        return (
            <div>
                <textarea  onChange={this.wordCount}>
                </textarea>
                <h3>{this.state.charCount}</h3>
            </div>
        )
    }
}

ReactDOM.render(
    React.createElement(TextAreaCounter, {
        text: "Bobs",
    }),
    document.getElementById('app')
)