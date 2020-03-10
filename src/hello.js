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

class App extends React.Component {
    render() {
        return(
            <h1>Hello {this.props.name}</h1>
        )
    }
}
App.defaultProps = {
    name: "Test"
}
ReactDOM.render(
    <App />,
    document.getElementById('app')
)