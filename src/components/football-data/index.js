import React, { Component } from "react";
import "./index.css";
const classNames = require("classnames");

export default class FootballMatchesData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      infos: null,
    };
  }

  onClick = (year) => (e) => {
    // Code written in next line is to take care of adding active class to selected year for css purpose.
    this.setState({
      selectedYear: year,
    });

    fetch(
      `https://jsonmock.hackerrank.com/api/football_competitions?year=${year}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          infos: data,
        })
      );
  };

  render() {
    var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    return (
      <div className='layout-row'>
        <div className='section-title'>Select Year</div>
        <ul className='sidebar' data-testid='year-list'>
          {years.map((year, i) => {
            return (
              <li
                className={classNames({
                  "sidebar-item": true,
                  active: this.state.selectedYear === year,
                })}
                onClick={this.onClick(year)}
                key={year}
              >
                <a>{year}</a>
              </li>
            );
          })}
        </ul>

        <section className='content'>
          <section>
            <div className='total-matches' data-testid='total-matches'>
              {/* {this.state.infos && "Total matches: "}{" "} */}
              {this.state.infos && this.state.infos.total !== 0 && (
                <p>Total matches: {this.state.infos.total}</p>
              )}
            </div>

            <ul className='mr-20 matches styled' data-testid='match-list'>
              {this.state.infos &&
                this.state.infos.total != 0 &&
                this.state.infos.data.map((match) => {
                  return (
                    <li className='slide-up-fade-in' key={match.winner}>
                      Match {match.name} won by {match.winner}
                    </li>
                  );
                })}
            </ul>
          </section>

          <div data-testid='no-result' className='slide-up-fade-in no-result'>
            {this.state.infos && this.state.infos.total == 0 && (
              <h3>No Result Found</h3>
            )}
          </div>
        </section>
      </div>
    );
  }
}
