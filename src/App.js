import React, { Component } from "react";
import Loader from "./Loader/Loader";
import Table from "./Table/Table";
import DeteilRowView from "./DeteilRowView/DeteilRowView";
import ModeSelector from "./ModeSelector/ModeSelector";
import TableSearch from "./TableSearch/TableSearch";
import AddRow from "./AddRow/AddRow";
import _ from "lodash";
import ReactPaginate from "react-paginate";

class App extends Component {
  state = {
    isLoading: false,
    data: [],
    sort: "asc",
    search: "",
    sortField: "id",
    row: null,
    isModeSelected: false,
    currentPage: 0,
    activeInput: false,
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  };
  async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    });
  }
  onSort = sortField => {
    const cloneData = this.state.data.concat();
    const sort = this.state.sort === "asc" ? "desc" : "asc";
    const data = _.orderBy(cloneData, sortField, sort);

    this.setState({ data, sort, sortField });
  };
  modeSElectHandler = url => {
    this.setState({
      isModeSelected: true,
      isLoading: true
    });
    this.fetchData(url);
  };
  onRowSelect = row => {
    this.setState({ row });
  };
  pageChangeHandler = ({ selected }) =>
    this.setState({ currentPage: selected });

  searchHandler = search => {
    this.setState({ search, currentPage: 0 });
  };

  getFilteredData() {
    const { data, search } = this.state;

    if (!search) {
      return data;
    }

    let result = data.filter(item => {
      return (
        item["firstName"].toLowerCase().includes(search.toLowerCase()) ||
        item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
        item["email"].toLowerCase().includes(search.toLowerCase())
      );
    });
    if (!result.length) {
      result = this.state.data;
    }
    return result;
  }

  activateInputRow = event => {
    event.preventDefault();
    this.setState({ activeInput: true });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    let data = [...this.state.data];

    data.push({
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone
    });

    this.setState({
      data,
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    });
  };

  handleInputChange = event => {
    let input = event.target;
    let name = event.target.name;
    let value = input.value;

    this.setState({
      [name]: value
    });
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

    const filteredData = this.getFilteredData();
    const pageCount = Math.ceil(filteredData.length / pageSize);
    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage];

    return (
      <div className="container">
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <TableSearch onSearch={this.searchHandler} />
            <Table
              data={displayData}
              onSort={this.onSort}
              sort={this.state.sort}
              sortField={this.state.sortField}
              onRowSelect={this.onRowSelect}
            />
            <AddRow
              activeInput={this.state.activeInput}
              activateInputRow={this.activateInputRow}
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
              newId={this.state.id}
              newFirstName={this.state.firstName}
              newLastName={this.state.lastName}
              newEmail={this.state.email}
              newPhone={this.state.phone}
            />
          </React.Fragment>
        )}
        {this.state.row ? <DeteilRowView person={this.state.row} /> : null}
        {this.state.data.length > pageSize ? (
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
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
            forcePage={this.state.currentPage}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
