var headers = [
    "Book", "Author", "Language"
];
var data = [
    ["lotr", "Tolkien", "En"],
    ["Fish", "Smith", "Es"],
    ["Adventues of Joe", "Dean", "Es"]
]


class Excel extends React.Component {

    render() {
        return (
            React.createElement('table', null,
                React.createElement('thead', null,
                    React.createElement('tr', null,
                        this.props.headers.map(function (title, idx) {
                            return React.createElement('th', {
                                key: `${idx}-key`
                            }, title)
                        })
                    )
                ),
                React.createElement('tbody', null,
                    this.props.initalData.map(function (row, idx) {
                        return (
                            React.createElement('tr', {
                                key: `${idx}-key`
                            }, row.map(function (cell, idx) {
                                return React.createElement('td', {
                                    key: `${idx}-key`
                                }, cell)
                            }))
                        );
                    })
                ),
            )
        )
    }
}

ReactDOM.render(
    React.createElement(Excel, {
        headers: headers,
        initalData: data
    }),
    document.getElementById('app')
)