import React from 'react';
import Rating from './Rating';
import FormInput from './FormInput';
import Forms from './Forms';
import Dialog from './Dialog';
import Actions from './Actions';
import classNames from 'classnames';

class Excel extends React.Component {

    constructor(props) {
        super(props);
        this._preSearchData = null;
        this.state = {
            headers: this.props.headers,
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null, // row: index, cell: index
            dialog: null
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.initialData
        });
    }
    _actionClick(rowidx, action) {
        this.setState({
            dialog: {
                type: action,
                idx: rowidx
            }
        })
    }
    _closeDialog() {
        this.setState({
            dialog: null
        });
    }
    _deleteConfirmationClick(action) {
        if (action === 'dismiss') {
            this._closeDialog();
            return;
        }
        let data = Array.from(this.state.data);
        data.splice(this.state.dialog.idx, 1);
        this.setState({
            dialog: null,
            data: data
        });
        this._fireDataChange(data);
    }
    _fireDataChange(data) {
        this.props.onDataChange(data);
    }

    _save = (e) => {
        e.preventDefault();
        const value = this.refs.input.getValue();

        let data = Array.from(this.state.data); // copy data
        data[this.state.edit.row][this.state.edit.key] = value;
        this.setState({
            edit: null,
            data: data
        });
        this._fireDataChange(data);
    }
    _saveDataDialog(action) {
        if (action === 'dismiss') {
            this._closeDialog();
            return;
        }
        let data = Array.from(this.state.data);
        data[this.state.dialog.idx] = this.refs.form.geData();
        this.setState({
            dialog: null,
            data: data
        });
        this._fireDataChange(data);
    }
    _search = (e) => {
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
        var searchdata = this._preSearchData.filter(function (row) {
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
                ket: e.target.dataset.key
            }
        });
    }
    _sort = (key) => {
        let data = Array.from(this.state.data);
        var descending = this.state.sortby === key && !this.state.descending;
        data.sort(function (a, b) {
            return descending
                ? (a[key] < b[key] ? 1 : -1)
                : (a[key] > b[key] ? 1 : -1)
        });
        this.setState({
            data: data,
            sortby: key,
            descending: descending
        });
        this._fireDataChange(data);
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
            <div className="Excel">
                {this._renderTable()}
                {this._renderDialog()}
            </div>
        );
    }
    _renderDialog() {
        if (!this.state.dialog) {
            return null;
        }
        switch (this.state.dialog.type) {
            case 'delete':
                return this._renderDeleteDialog();
            case 'info':
                return this._renderFormDialog(true);
            case 'edit':
                return this._renderFormDialog();
            default:
                throw Error(`Unexpected dialog type ${this.state.dialog.type}`)
        }
    }
    _renderDeleteDialog() {
        const first = this.state.data[this.state.dialog.idx];
        const nameguess = first[Object.keys(first)[0]];
        return (
            <Dialog
                modal={true}
                header="Confirm deletion"
                confirmLabel="Delete"
                onAction={this._deleteConfirmationClick.bind(this)}>
                {`Are you sure you want to delete ${nameguess}`}
            </Dialog>
        )
    }
    _renderFormDialog(readonly) {
        return (
            <Dialog
                modal={true}
                header={readonly ? 'Item Info' : 'Edit Item'}
                confirmLabel={readonly ? 'ok' : 'Save'}
                hasCancel={!readonly}
                onAction={this._saveDataDialog.bind(this)}>
                <Forms
                    ref="form"
                    fields={this.props.schema}
                    initialData={this.state.data[this.state.dialog.idx]}
                    readonly={readonly} />
            </Dialog>
        );
    }
    _renderToolbar() {
        return (
            <div className="toolbar">
                <button onClick={this._toggleSearch}>Search</button>
                <a onClick={this._download.bind(this, 'json')}
                    href="data.json">Export JSON</a>
                <a onClick={this._download.bind(this, 'csv')}
                    href="data.csv">Export CSV</a>
            </div>
        );
    }

    _renderSearch() {
        if (!this.state.search) {
            return null;
        }
        return (
            <tr onChange={this._search}>
                {this.props.headers.map(function (_ignore, idx) {
                    return <td key={idx}><input type="text" data-idx={idx} /></td>;
                })}
            </tr>
        );
    }

    _renderTable() {
        return (
            <table>
                <thead>
                    <tr>
                        {this.props.schema.map(item => {
                            if (!item.show) {
                                return null;
                            }
                            let title = item.label;
                            if (this.state.sortby === item.id) {
                                title += this.state.descending ? '\u2191' : '\u2193';
                            }
                            return (
                                <th
                                    className={`schema-${item.id}`}
                                    key={item.id}
                                    onClick={this._sort.bind(this, item.id)}>
                                    {title}
                                </th>
                            )
                        }, this)}
                        <th className="ExcelNotSortable">Actions</th>
                    </tr>
                </thead>
                <tbody onDoubleClick={this._showEditor.bind(this)}>
                    {this.state.data.map((row, rowidx) => {
                        return (
                            <tr key={rowidx}>
                                {Object.keys(row).map((cell, idx) => {
                                    const schema = this.props.schema[idx];
                                    if (!schema || !schema.show) {
                                        return null;
                                    }
                                    const isRating = schema.type === 'rating';
                                    const edit = this.state.edit;
                                    let content = row[cell];
                                    if (!isRating && edit && edit.row === rowidx && edit.key === schema.id) {
                                        content = (
                                            <form onSubmit={this._save.bind(this)}>
                                                <FormInput ref="input" {...schema} defaultValue={content} />
                                            </form>
                                        );
                                    } else if (isRating) {
                                        content = <Rating readonly={true} defaultValue={Number(content)} />;
                                    }
                                    return (
                                        <td
                                            className={classNames({
                                                [`schema-${schema.id}`] : true,
                                                'ExcelEditable': !isRating,
                                                'ExcelDataLeft': schema.align === 'left',
                                                'ExcelDataRight': schema.align === 'right',
                                                'ExcelDataCenter': schema.align !== 'left' && schema.align !== 'right'
                                            })}
                                            key={idx}
                                            data-row={rowidx}
                                            data-key={schema.id}>
                                                {content}
                                        </td>
                                    );
                                }, this)}
                                <td className="ExcelDataCenter">
                                    <Actions onAction={this._actionClick.bind(this, rowidx)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    };
}

export default Excel;