var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Excel = function (_React$Component) {
    _inherits(Excel, _React$Component);

    function Excel(props) {
        _classCallCheck(this, Excel);

        var _this = _possibleConstructorReturn(this, (Excel.__proto__ || Object.getPrototypeOf(Excel)).call(this, props));

        _this._sort = function (e) {
            var column = e.target.cellIndex;
            var data = _this.state.data.slice();
            console.log(data);
            data.sort(function (a, b) {
                return a[column] > b[column] ? 1 : -1;
            });
            console.log(data);
            _this.setState({
                data: data
            });
        };

        _this.state = {
            headers: headers,
            data: data
        };
        return _this;
    }

    _createClass(Excel, [{
        key: 'render',
        value: function render() {
            return React.createElement('table', null, React.createElement('thead', { onClick: this._sort }, React.createElement('tr', null, this.props.headers.map(function (title, idx) {
                return React.createElement('th', { key: idx }, title);
            }))), React.createElement('tbody', null, this.state.data.map(function (row, idx) {
                return React.createElement('tr', { key: idx }, row.map(function (cell, idx) {
                    return React.createElement('td', { key: idx }, cell);
                }));
            })));
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