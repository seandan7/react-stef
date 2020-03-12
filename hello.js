var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Excel = function (_React$Component) {
    _inherits(Excel, _React$Component);

    function Excel(props) {
        _classCallCheck(this, Excel);

        var _this = _possibleConstructorReturn(this, (Excel.__proto__ || Object.getPrototypeOf(Excel)).call(this, props));

        _this._save = function (e) {
            e.preventDefault();
            var input = e.target.firstChild;
            // clone data so you dont directly manipulate state
            var data = _this.state.data.slice();
            data[_this.state.edit.row][_this.state.edit.cell] = input.value;
            _this.setState({
                edit: null,
                data: data
            });
        };

        _this._search = function (e) {
            console.log("Searching");
            var needle = e.target.value.toLowerCase();
            if (!needle) {
                // search string is deleted
                _this.setState({
                    // revert
                    data: _this._preSearchData
                });
                return;
            }
            var idx = e.target.dataset.idx; // which col to search
            var searchdata = _this._preSearchData.filter(function (row) {
                // true only if has the string -- TODO update indexOf to es6
                return row[idx].toString().toLowerCase().indexOf(needle) > -1;
            });
            _this.setState({
                data: searchdata
            });
        };

        _this._showEditor = function (e) {
            _this.setState({
                edit: {
                    row: parseInt(e.target.dataset.row, 10),
                    cell: e.target.cellIndex
                }
            });
        };

        _this._sort = function (e) {
            var column = e.target.cellIndex;
            var data = _this.state.data.slice();
            var descending = _this.state.sortby === column && !_this.state.descending;
            data.sort(function (a, b) {
                return descending ? a[column] < b[column] ? 1 : -1 : a[column] > b[column] ? 1 : -1;
            });
            _this.setState({
                data: data,
                sortby: column,
                descending: descending
            });
        };

        _this._toggleSearch = function () {
            if (_this.state.search) {
                _this.setState({
                    data: _this._preSearchData,
                    search: false
                });
                _this._preSearchData = null;
            } else {
                _this._preSearchData = _this.state.data;
                _this.setState({
                    search: true
                });
            }
        };

        _this._preSearchData = null;
        _this.state = {
            headers: _this.props.headers,
            data: _this.props.initialData,
            sortby: null,
            descending: false,
            edit: null, // row: index, cell: index
            search: false
        };
        return _this;
    }

    _createClass(Excel, [{
        key: 'render',
        value: function render() {
            return React.createElement('div', null, this._renderToolbar(), this._renderTable());
        }
    }, {
        key: '_renderSearch',
        value: function _renderSearch() {
            if (!this.state.search) {
                return null;
            }
            return React.createElement('tr', {
                onChange: this._search
            }, this.props.headers.map(function (_ignore, idx) {
                return React.createElement('td', {
                    key: idx
                }, React.createElement('input', {
                    type: 'text',
                    'data-idx': idx
                }));
            }));
        }
    }, {
        key: '_renderToolbar',
        value: function _renderToolbar() {
            var searchString = this.state.search ? 'close' : 'search';
            return React.createElement('button', {
                onClick: this._toggleSearch,
                className: 'toolbar'
            }, searchString);
        }
    }, {
        key: '_renderTable',
        value: function _renderTable() {
            var _this2 = this;

            return React.createElement('table', null, React.createElement('thead', { onClick: this._sort }, React.createElement('tr', null, this.props.headers.map(function (title, idx) {
                if (_this2.state.sortby === idx) {
                    title += _this2.state.descending ? '\u2191' : '\u2193';
                }
                return React.createElement('th', { key: idx }, title);
            }))), React.createElement('tbody', {
                onDoubleClick: this._showEditor
            }, this._renderSearch(), this.state.data.map(function (row, rowidx) {
                return React.createElement('tr', { key: rowidx }, row.map(function (cell, idx) {
                    var content = cell;
                    //  turn 'content' into an input if the idx and rowidx match the edited, otherwise, just text
                    var edit = this.state.edit;
                    if (edit && edit.row === rowidx && edit.cell == idx) {
                        content = React.createElement('form', {
                            onSubmit: this._save
                        }, React.createElement('input', {
                            type: 'text',
                            defaultValue: content
                        }));
                    }
                    return React.createElement('td', {
                        key: idx,
                        'data-row': rowidx
                    }, content);
                }, this));
            }, this)));
        }
    }]);

    return Excel;
}(React.Component);

;

var headers = ["Book", "Author", "Language", "Published", "Sales"];

var data = [["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954-1955", "150 million"], ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million"], ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 million"], ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"], ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791", "100 million"], ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"], ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"]];

ReactDOM.render(React.createElement(Excel, {
    headers: headers,
    initialData: data
}), document.getElementById("app"));