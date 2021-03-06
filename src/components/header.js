import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../store/review-actions';

function Header(props) {

  function selectCountry(e) {
    let country = e.target.value;
    console.log('country:', country);
    if (country !== 'Please select a country') {
      props.setCurrent(country);
    }
  }

  let countryOptions = [];

  Object.keys(props.countries).forEach((country, i) => {
    let percentage = Math.ceil((props.countries[country].length / props.allReviews.length) * 100);
    countryOptions.push(<option key={`country-${i}`} value={country}>{`${country} ${percentage}%`}</option>);
  })

  const styles = {
    largeText: {
      fontSize: 50
    },
    flex: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    container: {
      margin: '0 10px'
    }

  }
  

  return (
    <div style={styles.flex}>
      <div style={styles.container}>
        <h2>TOTAL NUMBER OF REVIEWS</h2>
        <h3 style={styles.largeText}>{props.currentReviews.length}</h3>
      </div>
      <div style={styles.container}>
        <h2>Country of Origin:</h2>
        <select name="countries" id="countries-list" onChange={selectCountry}>
          <option default value={null}>Please select a country</option>
          {countryOptions}
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentReviews: state.reviews.currentReviews,
    countries: state.reviews.countries,
    allReviews: state.reviews.allReviews
  }
}

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setCurrent: (data) => { dispatch( actions.setCurrentCountry(data) ) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);