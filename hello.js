var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var headers = ["Book", "Author", "Language"];
var data = [["lotr", "Tolkien", "En"], ["Fish", "Smith", "Es"], ["Adventues of Joe", "Dean", "Es"]];

var Excel = function (_React$Component) {
    _inherits(Excel, _React$Component);

    function Excel() {
        _classCallCheck(this, Excel);

        return _possibleConstructorReturn(this, (Excel.__proto__ || Object.getPrototypeOf(Excel)).apply(this, arguments));
    }

    _createClass(Excel, [{
        key: "render",
        value: function render() {
            return React.createElement('table', null, React.createElement('thead', null, React.createElement('tr', null, this.props.headers.map(function (title, idx) {
                return React.createElement('th', {
                    key: idx + "-key"
                }, title);
            }))), React.createElement('tbody', null, this.props.initalData.map(function (row, idx) {
                return React.createElement('tr', {
                    key: idx + "-key"
                }, row.map(function (cell, idx) {
                    return React.createElement('td', {
                        key: idx + "-key"
                    }, cell);
                }));
            })));
        }
    }]);

    return Excel;
}(React.Component);

ReactDOM.render(React.createElement(Excel, {
    headers: headers,
    initalData: data
}), document.getElementById('app'));