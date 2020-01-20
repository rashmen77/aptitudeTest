import React, { Component } from "react";
import LoadingOverlay from "react-loading-overlay";
import ReactPaginate from "react-paginate";

export default class Planets extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      loading: true
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.getPlanets(0);
  };

  getPlanets = async currentPage => {
    let selectedPage = currentPage === 0 ? 1 : currentPage + 1;
    let endpointQuery = `/getPlanets?page=${selectedPage}`;
    let response = await fetch(endpointQuery);
    let reponseBody = await response.text();
    let body = JSON.parse(reponseBody);
    if (body.success && this._isMounted) {
      this.setState({
        planets: JSON.parse(body.data),
        loading: false
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
              <div className="list">
                {this.state.planets.results.map(planet => {
                  return <li className="list-elm">{planet.name}</li>;
                })}
              </div>
              <div>
                <ReactPaginate
                  pageCount={Math.ceil(this.state.planets.count / 10)}
                  marginPagesDisplayed={Math.ceil(
                    this.state.planets.count / 10
                  )}
                  pageRangeDisplayed={Math.ceil(this.state.planets.count / 10)}
                  onPageChange={page => {
                    this.getPlanets(page.selected);
                  }}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                  initialPage={0}
                />
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
