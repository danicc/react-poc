import React from "react";
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";

import "./DataTable.css";

const CheckboxDataTable = checkboxHOC(ReactTable);

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      columns: props.columns,
      selection: [],
      selectAll: false
    };
  }

  toggleSelection = (key, shift, row) => {
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  };

  toggleAll = () => {
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(item._original.myId);
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key => {
    return this.state.selection.includes(key);
  };

  render() {
    const { toggleSelection, toggleAll, isSelected } = this;
    const { data, columns, selectAll, selection } = this.state;
    const { actions = [] } = this.props;

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
      keyField: "myId"
    };

    return (
      <div className="container">
        <div className="header">
          <label htmlFor="selected">
            <input id="selected" type="checkbox" />
            Items selected
          </label>
          {actions.length &&
            actions.map((item, i) => {
              return (
                <button
                  key={i}
                  className="action"
                  onClick={() => item.handleOnClick(selection)}
                  disabled={!selection.length}
                >
                  {item.label}
                </button>
              );
            })}
        </div>
        <CheckboxDataTable
          ref={r => (this.checkboxTable = r)}
          data={data}
          columns={columns}
          className="-striped -highlight"
          {...checkboxProps}
        />
      </div>
    );
  }
}

export default DataTable;
