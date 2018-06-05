import React from 'react';
import PropTypes from 'prop-types';
import autoBind from './../../utils';

const defaultState = { title: '', error: null };

export default class CountryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.country ? props.country : defaultState;
    // Function 
    autoBind.call(this, CountryForm);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.country !== this.props.country) {
      this.setState(this.props.country);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onComplete } = this.props;
    const result = onComplete(this.state);
    if (result instanceof Promise) {
      result
        .then(() => {
          this.setState(defaultState);
        })
        .catch((error) => {
          console.error('COUNTRY FORM ERROR: ', error); // eslint-disable-line
          this.setState({ error });
        });
    }
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ title: event.target.value });
  }

  render() {
    return (
      <form 
        onSubmit={this.handleSubmit}
        className="country-form"
      >
        <input 
          name="title"
          type="text"
          placeholder="Enter a Country name"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button type="submit">{this.props.buttonText}</button>
      </form>
    );
  }
}

CountryForm.propTypes = {
  onComplete: PropTypes.func,
  country: PropTypes.object,
  buttonText: PropTypes.string,
};
