ReactDOM.render(React.createElement(
    "h1",
    { id: "my-heading" },
    React.createElement(
        "span",
        null,
        React.createElement(
            "em",
            null,
            "Hello"
        ),
        " World"
    )
), document.getElementById('app'));