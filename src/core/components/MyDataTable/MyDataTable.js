import React from "react";
import ReactTable from "react-table";
import selectTable from "./SelectTable";

import "./DataTable.css";

const CheckboxDataTable = selectTable(ReactTable, {});

class MyDataTable extends React.Component {
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
        selection.push(item._original._id);
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key => {
    return this.state.selection.includes(key);
  };

  render() {
    const { toggleSelection, toggleAll, isSelected } = this;
    const { data, columns, selectAll } = this.state;

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
          <button className="action">Action 1</button>
          <button className="action">Action 2</button>
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

export default MyDataTable;
