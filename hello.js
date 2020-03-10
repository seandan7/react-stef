var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var TextAreaCounter = function (_React$Component) {
    _inherits(TextAreaCounter, _React$Component);

    function TextAreaCounter(props) {
        _classCallCheck(this, TextAreaCounter);

        var _this = _possibleConstructorReturn(this, (TextAreaCounter.__proto__ || Object.getPrototypeOf(TextAreaCounter)).call(this, props));

        _this.state = {
            charCount: null
        };
        _this.wordCount = _this.wordCount.bind(_this);
        return _this;
    }

    _createClass(TextAreaCounter, [{
        key: "wordCount",
        value: function wordCount(e) {
            var currentText = e.target.value;
            var characterCount = currentText.length;
            this.setState({
                charCount: characterCount
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement("textarea", { onChange: this.wordCount }),
                React.createElement(
                    "h3",
                    null,
                    this.state.charCount
                )
            );
        }
    }]);

    return TextAreaCounter;
}(React.Component);

ReactDOM.render(React.createElement(TextAreaCounter, {
    text: "Bobs"
}), document.getElementById('app'));