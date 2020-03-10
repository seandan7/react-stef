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
            <h1>Hello World</h1>
        )
    }
}
ReactDOM.render(
    React.createElement(App, {
        name: "test"
    }), document.getElementById('app')
)