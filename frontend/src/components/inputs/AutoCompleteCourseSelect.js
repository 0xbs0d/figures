import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import styles from 'base/sass/inputs/_autocomplete-course-select.scss';
import classNames from 'classnames/bind';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid'

let cx = classNames.bind(styles);

var coursesList = [
];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : coursesList.filter(course => course.courseName.toLowerCase().slice(0, inputLength) === inputValue );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>{suggestion.courseId} {suggestion.courseName}</div>
);

class AutoCompleteCourseSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: [],
      modalActive: false,
    };

    this.onChange = this.onChange.bind(this);
    this.modalTrigger = this.modalTrigger.bind(this);
  }

  modalTrigger = () => {
    this.setState({
      modalActive: !this.state.modalActive
    });
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsClearRequested = () => {

  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: this.props.inputPlaceholder,
      value,
      onChange: this.onChange,
    };

    coursesList = this.props.coursesList;

    return (
      <div className={styles['ac-course-selector']}>
        <button onClick={this.modalTrigger} className={cx({ 'selector-trigger-button': true, 'positive': !this.props.negativeStyleButton, 'negative': this.props.negativeStyleButton })}>{this.props.buttonText}</button>
        {this.state.modalActive && (
          <div className={styles['selector-modal']}>
            <Autosuggest
              suggestions = {suggestions}
              onSuggestionsFetchRequested = {this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested = {this.onSuggestionsClearRequested}
              getSuggestionValue = {getSuggestionValue}
              renderSuggestion = {renderSuggestion}
              inputProps = {inputProps}
              theme = {styles}
              alwaysRenderSuggestions
            />
            <button onClick={this.modalTrigger} className={styles['modal-dismiss']}><FontAwesomeIcon icon={faTimes}/></button>
          </div>
        )}
      </div>
    )
  }
}

AutoCompleteCourseSelect.defaultProps = {
  negativeStyleButton: false,
  buttonText: 'Select a course',
  inputPlaceholder: 'Select or start typing',
  coursesList: [
    {
      courseId: 'A101',
      courseName: 'This is the name of the course'
    },
    {
      courseId: 'A102',
      courseName: 'This is another name of the course'
    },
    {
      courseId: 'A103',
      courseName: 'My introduction to EdX Figures'
    }
  ]
}

AutoCompleteCourseSelect.propTypes = {
  negativeStyleButton: PropTypes.bool,
  buttonText: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  coursesList: PropTypes.array
};

export default AutoCompleteCourseSelect;
