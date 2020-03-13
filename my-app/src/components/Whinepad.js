import React from 'react';
import Excel from './Excel';
import Forms from './Forms';
import Dialog from './Dialog';
import Button from './Button';
import classNames from 'classnames';

class Whinepad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.initialData,
            addnew: false
        };
        this._preSearchData = null;
    }

    _addNewDialog() {
        this.setState({
            addnew: true
        });
    }
    _addNew(action) {
        if (action === 'dismiss') {
            this.setState({
                addnew: false
            });
            return;
        }
        let data = Array.from(this.state.data);
        data.unshift(this.refs.form.getData());
        this.setState({
            addnew: false,
            data: data
        });
        this._commitToStorage(data);
    }
    _onExcelDataChange(data) {
        this.setState({
            data: data
        });
        this._commitToStorage(data);
    }
    _commitToStorage(data) {
        localStorage.setItem('data', JSON.stringify(data));
    }
    _startSearching() {
        this._preSearchData = this.state.data;
    }
    _doneSearching() {
        this.setState({
            data: this._preSearchData
        });
    }
    _search(e) {
        const needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({
                data: this._preSearchData
            });
            return;
        }
        const fields = this.props.schema.map(item => item.id);
        const searchdata = this._preSearchData.filter(row => {
            for (let f = 0; f < fields.length; f++) {
                if (row[fields[f]].toString().toLowerCase().indexOf(needle) > -1) {
                    return true;
                }
            }
            return false;
        });
        this.setState({
            data: searchdata
        })
    }
    _onExcelDataChange(data) {
        this.setState({
            data: data
        })
    }
    render() {
        return (
            <div className="Whinepad">
                <div className="WhinepadToolbarAdd">
                    <Button
                        onClick={this._addNewDialog.bind(this)}>
                        + add
                    </Button>
                </div>
                <div className="whinepadToolbarSearch">
                    <input
                        placeholder="Search..."
                        onChange={this._search.bind(this)}
                        onFocus={this._startSearching.bind(this)}
                        onBlur={this._doneSearching.bind(this)} />
                </div>
                <div className="WhinepadDatagrid">
                    <Excel
                        schema={this.props.schema}
                        initialData={this.state.data}
                        onDataChange={this._onExcelDataChange.bind(this)}
                    />
                </div>
                {this.state.addnew
                    ? <Dialog
                        modal={true}
                        header="Add new item"
                        confirmLabel="Add"
                        onAction={this._addNew.bind(this)}>
                        <Forms ref="form" fields={this.props.schema} />
                    </Dialog>
                    : null
                }
            </div>
        )
    }
}

export default Whinepad;