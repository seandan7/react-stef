import React from 'react';
import classNames from 'classnames';

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: props.defaultValue,
            tmpRating: props.defaultValue
        }
    }
    getValue() {
        return this.state.rating;
    }
    setTemp(rating) { // on mouse over
        this.setState({ tmpRating: rating });
    }
    setRating(rating) { // on click
        this.setState({
            tmpRating: rating,
            rating: rating
        });
    }
    reset() { // on mouse out, go to real rating
        this.setTemp(this.state.rating);
    }
    // TODO: update this to new version
    componentWillReceiveProps(nextProps) { // react to outside changes
        this.setRating(nextProps.defaultValue)
    }

    render() {
        const stars = [];
        console.log(this.props.max);
        for (let i = 1; i < this.props.max; i++) {
            stars.push(
                <span
                    className={i <= this.state.tmpRating ? 'RatingOn' : null}
                    key={i}
                    onClick={!this.props.readonly && this.setRating.bind(this, i)}
                    onMouseOver={!this.props.readonly && this.setTemp.bind(this, i)}>
                    &#9734;
                </span>
            )
        }
        return (
            <div
                className={classNames({
                    'Rating': true,
                    'RatingReadOnly': this.props.readonly
                })}
                onMouseOut={this.reset.bind(this)}
            >
                {stars}
                {this.props.readonly || !this.props.id 
                    ? null
                    : <input type="hidden" id={this.props.id} value={this.state.rating} />
                }
            </div>
        )
    }
}

    export default Rating;