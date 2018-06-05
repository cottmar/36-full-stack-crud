
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CountryForm from './../country-form/country-form';
import * as countryActions from '../../actions/country-actions';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.countriesFetch();
  }

  render() {
    const { 
      countries,
      countriesFetch, // eslint-disable-line
      countryCreate,
      countryDelete,
    } = this.props;
    return (
      <div className="dashboard">
        <h2>Countries and Places App</h2>
        <CountryForm  
          onComplete={countryCreate}
          buttonText="Create Country"
          />
        {
          countries.map((country) => {
            return (
            <div key={country._id}>
              <p>{country.title}</p>
              <button onClick={() => countryDelete(country)}>X</button>
            </div>
          );
        })
      }
    </div>
    );
  }
}

Dashboard.propTypes = {
  countriesFetch: PropTypes.func,
  countryCreate: PropTypes.func,
  countryDelete: PropTypes.func,
  countries: PropTypes.array,
};

const mapStatesToProps = (state) => {
  return {
    countries: state.countries,
  };
};

const mapDispatchToProps = dispatch => ({
  countriesFetch: () => dispatch(countryActions.countriesFetchRequest()),
  countryCreate: country => dispatch(countryActions.countryCreateRequest(country)),
  countryDelete: country => dispatch(countryActions.countryDeleteRequest(country)),
});

export default connect(mapStatesToProps, mapDispatchToProps)(Dashboard);
