import React, { Component } from "react";
import "../css/listContainer.css";
import LoadingOverlay from "react-loading-overlay";
import ReactPaginate from "react-paginate";

export default class People extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      people: [],
      searchInput: "",
      loading: true
    };
  }

  //initial fetch for page 0
  componentDidMount = () => {
    this._isMounted = true;
    this.getPeople(0);
  };

  getPeople = async currentPage => {
    let selectedPage = currentPage === 0 ? 1 : currentPage + 1; // pagination 0 = page 1
    let _searchInput = this.state.searchInput;
    // endpoint changes depending on search input
    let endpointQuery =
      this.state.searchInput === ""
        ? `/getPeople?page=${selectedPage}`
        : `/peopleSearch?search=${_searchInput}&page=${selectedPage}`;
    let response = await fetch(endpointQuery);
    let reponseBody = await response.text();
    let body = JSON.parse(reponseBody);
    if (body.success && this._isMounted) {
      this.setState({
        people: JSON.parse(body.data),
        loading: false
      });
    }
  };

  searchPerson = async evt => {
    let _searchInput = evt.target.value;
    let response = await fetch(`/peopleSearch?search=${_searchInput}`);
    let reponseBody = await response.text();
    let body = JSON.parse(reponseBody);
    if (body.success && this._isMounted) {
      this.setState({
        searchInput: _searchInput,
        people: JSON.parse(body.data)
      });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <>
        {this.state.loading ? (
          <LoadingOverlay
            active={this.state.loading}
            spinner
            text="Loading your content..."
            styles={{
              wrapper: {
                width: "100%",
                height: "100%",
                overflow: this.state.loading ? "hidden" : "scroll"
              }
            }}
          ></LoadingOverlay>
        ) : (
          <>
            <div className="list-container">
              <div className="search-container">
                <input
                  className="search-input"
                  type="text"
                  onChange={this.searchPerson}
                  placeholder="Search...."
                />
              </div>
              <div className="list">
                {this.state.people.results.map(person => {
                  return <li className="list-elm">{person.name}</li>;
                })}
              </div>

              <ReactPaginate
                pageCount={Math.ceil(this.state.people.count / 10)}
                marginPagesDisplayed={Math.ceil(this.state.people.count / 10)}
                pageRangeDisplayed={Math.ceil(this.state.people.count / 10)}
                onPageChange={page => {
                  this.getPeople(page.selected);
                }}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                initialPage={0}
              />
            </div>
          </>
        )}
      </>
    );
  }
}
