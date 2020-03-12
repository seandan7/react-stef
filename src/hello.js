class Excel extends React.Component {

    constructor(props) {
        super(props);
        this._preSearchData = null
        this.state = {
            headers: this.props.headers,
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null, // row: index, cell: index
            search: false
        };
    }
    _save = (e) => {
        e.preventDefault();
        var input = e.target.firstChild;
        // clone data so you dont directly manipulate state
        var data = this.state.data.slice();
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        this.setState({
            edit: null,
            data: data
        })
    }
    _search = (e)=> {
        console.log("Searching");
        var needle = e.target.value.toLowerCase();
        if (!needle) { // search string is deleted
            this.setState({
                // revert
                data: this._preSearchData
            });
            return;
        }
        var idx = e.target.dataset.idx; // which col to search
        var searchdata = this._preSearchData.filter(function(row) {
            // true only if has the string -- TODO update indexOf to es6
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        }); 
        this.setState({
            data: searchdata
        });
    }
    _showEditor = (e) => {
        this.setState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex
            }
        });
    }
    _sort = (e) => {
        var column = e.target.cellIndex;
        var data = this.state.data.slice();
        var descending = this.state.sortby === column && !this.state.descending;
        data.sort(function (a, b) {
            return descending
                ? (a[column] < b[column] ? 1 : -1)
                : (a[column] > b[column] ? 1 : -1)
        });
        this.setState({
            data: data,
            sortby: column,
            descending: descending
        });
    }
    _toggleSearch = () => {
        if (this.state.search) {
            this.setState({
                data: this._preSearchData,
                search: false
            });
            this._preSearchData = null;
        } else {
            this._preSearchData = this.state.data;
            this.setState({
                search: true
            })
        }
    }
    render() {
        return (
            React.createElement('div', null,
                this._renderToolbar(),
                this._renderTable()
            )
        )
    }
    _renderSearch() {
        if (!this.state.search) {
            return null;
        }
        return (

            React.createElement('tr', {
                onChange: this._search
            },
                this.props.headers.map(function (_ignore, idx) {
                    return React.createElement('td', {
                        key: idx
                    }, 
                    React.createElement('input', {
                        type: 'text',
                        'data-idx': idx
                    }))
                })
            )
        )
    }
    _renderToolbar() {
        var searchString = this.state.search ? 'close': 'search'
        return (
            React.createElement('button', {
                onClick: this._toggleSearch,
                className: 'toolbar'
            }, searchString)
        )
    }
    _renderTable() {

        return (
            React.createElement('table', null,
                React.createElement('thead', { onClick: this._sort },
                    React.createElement('tr', null,
                        this.props.headers.map((title, idx) => {
                            if (this.state.sortby === idx) {
                                title += this.state.descending ? '\u2191' : '\u2193'
                            }
                            return React.createElement('th', { key: idx }, title);
                        })
                    )
                ),
                React.createElement('tbody', {
                    onDoubleClick: this._showEditor
                },
                this._renderSearch(),
                    this.state.data.map(function (row, rowidx) {
                        return (
                            React.createElement('tr', { key: rowidx },
                                row.map(function (cell, idx) {
                                    var content = cell;
                                    //  turn 'content' into an input if the idx and rowidx match the edited, otherwise, just text
                                    var edit = this.state.edit;
                                    if (edit && edit.row === rowidx && edit.cell == idx) {
                                        content = React.createElement('form', {
                                            onSubmit: this._save
                                        },
                                            React.createElement('input', {
                                                type: 'text',
                                                defaultValue: content
                                            }))
                                    }
                                    return React.createElement('td', {
                                        key: idx,
                                        'data-row': rowidx
                                    }, content);
                                }, this)
                            )
                        );
                    }, this)
                )
            )
        )
    }
};

var headers = [
    "Book", "Author", "Language", "Published", "Sales"
];

var data = [
    ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954-1955", "150 million"],
    ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million"],
    ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 million"],
    ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"],
    ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791", "100 million"],
    ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"],
    ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"],
];

ReactDOM.render(
    React.createElement(Excel, {
        headers: headers,
        initialData: data,
    }),
    document.getElementById("app")
);