import React, { Component } from "react";
import { connect } from "react-redux";
import { DataTable } from "../../../core/components";
import "./Products.css";

import * as actions from "../actions";
import * as selectors from "../selectors";

class Products extends Component {
  columns = [
    {
      Header: "Name",
      accessor: "name", // String-based value accessors!
      resizable: false
    },
    {
      id: "price",
      Header: "Price",
      accessor: d => d.price,
      resizable: false
    }
  ];

  actionButtons = [
    {
      label: "action 1",
      handleOnClick: selection => {
        const index = selection[0];
        alert("hola action 1" + selection[0]);
      }
    },
    {
      label: "action 2",
      handleOnClick: selection => {
        const index = selection[0];
        alert("hola action 1" + selection[0]);
      }
    },
    {
      label: "action 3",
      handleOnClick: selection => {
        const index = selection[0];
        alert("hola action 1" + selection[0]);
      }
    }
  ];

  componentDidMount() {
    const { products, getProducts } = this.props;

    !products.length && getProducts();
  }

  render() {
    const { products, loading } = this.props;
    console.log(products);
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="ProductsContainer">
        <DataTable
          data={products}
          columns={this.columns}
          actions={this.actionButtons}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: selectors.getProducts(state),
  loading: selectors.getLoading(state)
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(actions.getProducts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
