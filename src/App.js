import React, { Component } from "react";
import Loader from "./Loader/Loader";
import Table from "./Table/Table";
import DeteilRowView from "./DeteilRowView/DeteilRowView";
import ModeSelector from "./ModeSelector/ModeSelector";
import _ from "lodash";
import ReactPaginate from "react-paginate";

class App extends Component {
  state = {
    isLoading: false,
    data: [],
    sort: "asc",
    sortField: "id",
    row: null,
    isModeSelected: false,
  };
  async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort),
    });
  }
  onSort = (sortField) => {
    const cloneData = this.state.data.concat();
    const sort = this.state.sort === "asc" ? "desc" : "asc";
    const data = _.orderBy(cloneData, sortField, sort);

    this.setState({ data, sort, sortField });
  };
  onRowSelect = (row) => {
    this.setState({ row });
  };
  modeSElectHandler = (url) => {
    this.setState({
      isModeSelected: true,
      isLoading: true,
    });
    this.fetchData(url);
  };
  pageChangeHandler = (page) => {
    console.log(page);
  };

  render() {
    const pageSize = 50;
    if (!this.state.isModeSelected) {
      return (
        <div className="container">
          <ModeSelector onSelect={this.modeSElectHandler} />
        </div>
      );
    }
    return (
      <div className="container">
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <Table
            data={this.state.data}
            onSort={this.onSort}
            sort={this.state.sort}
            sortField={this.state.sortField}
            onRowSelect={this.onRowSelect}
          />
        )}
        {this.state.row ? <DeteilRowView person={this.state.row} /> : null}
        {this.state.data.length > pageSize ? (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={20}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.pageChangeHandler}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
          />
        ) : null}
      </div>
    );
  }
}

export default App;
