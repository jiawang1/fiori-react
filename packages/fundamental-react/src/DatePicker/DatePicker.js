import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Calendar from '../Calendar/Calendar';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      selectedDate: '',
      arrSelectedDates: [],
      formattedDate: ''
    };

    this.updateDate = this.updateDate.bind(this);
    this.modifyDate = this.modifyDate.bind(this);
    this.sendUpdate = this.sendUpdate.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.click, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.click, false);
  }

  openCalendar = type => {
    if (type !== 'input' || this.state.hidden) {
      this.setState(state => ({
        hidden: !state.hidden
      }));
    }
  };

  click = e => {
    if (this.component.contains(e.target)) {
      return;
    }
    this.clickOutside();
  };

  clickOutside = () => {
    const regex = /[!$%^&*()_+|~=`{}[\]:'<>?,.a-zA-Z]/;
    if (this.props.enableRangeSelection) {
      // If the formattedDate contains a list of special characters symbols then it will be reset
      if (this.state.formattedDate.search(regex) !== -1 || this.state.formattedDate === '' || this.state.formattedDate.split('-').length < 2) {
        this.setState({
          formattedDate: '',
          arrSelectedDates: 'undefined',
          hidden: true
        });
      } else {
        // The range dates being split.
        const dateRange = this.state.formattedDate.split('-');
        const dateSeparatedFirstRange = dateRange[0].split('/');
        const dateSeparatedSecondRange = dateRange[1].split('/');

        const firstYearRange = parseInt(dateSeparatedFirstRange[2]);
        const firstDateRange = parseInt(dateSeparatedFirstRange[1]);
        const firstMonthRange = parseInt(dateSeparatedFirstRange[0]);

        const secondYearRange = parseInt(dateSeparatedSecondRange[2]);
        const secondDateRange = parseInt(dateSeparatedSecondRange[1]);
        const secondMonthRange = parseInt(dateSeparatedSecondRange[0]);

        if (
          (!Number.isNaN(firstYearRange) || firstDateRange != NaN || firstMonthRange != NaN) &&
          (secondYearRange != NaN || secondDateRange != NaN || secondMonthRange != NaN) &&
          (firstDateRange >= 1 && firstDateRange <= 31) &&
          (firstMonthRange > 1 && firstMonthRange <= 12) &&
          firstYearRange <= 3000 &&
          (secondDateRange >= 1 && secondDateRange <= 31) &&
          (secondMonthRange > 1 && secondMonthRange <= 12) &&
          secondYearRange <= 3000 &&
          dateRange[0].search(regex) === -1 &&
          dateRange[1].search(regex) === -1
        ) {
          const firstDate = new Date(firstYearRange, firstMonthRange - 1, firstDateRange);
          const secondDate = new Date(secondYearRange, secondMonthRange - 1, secondDateRange);
          // Swaps the order in case one date is bigger than the other
          if (firstDate.getTime() > secondDate.getTime()) {
            this.setState({
              selectedDate: '',
              arrSelectedDates: [secondDate, firstDate]
            });
          } else {
            this.setState({
              selectedDate: '',
              arrSelectedDates: [firstDate, secondDate]
            });
          }
        } else {
          this.setState({
            formattedDate: '',
            arrSelectedDates: 'undefined',
            selectedDate: ''
          });
        }
        this.setState({ hidden: true });
      }
    } else {
      if (this.state.formattedDate.search(regex) != -1) {
        this.setState({
          formattedDate: this.formatDate(this.state.selectedDate),
          selectedDate: 'undefined'
        });
      } else {
        const dateSeparated = this.state.formattedDate.split('/');
        const year = parseInt(dateSeparated[2]);
        const date = parseInt(dateSeparated[1]);
        const month = parseInt(dateSeparated[0]);

        if ((year != NaN || date != NaN || month != NaN) && (date >= 1 && date <= 31) && (month > 1 && month <= 12) && year <= 3000) {
          this.setState({
            selectedDate: new Date(year, month - 1, date)
          });
        } else {
          this.setState({
            formattedDate: '',
            selectedDate: 'undefined'
          });
        }
      }
      this.setState({ hidden: true });
    }
  };

  sendUpdate(e) {
    const regex = /[!$%^&*()_+|~=`{}\[\]:'<>?,.\a-zA-Z]/;
    if (e.key === 'Enter') {
      // Checks first if range is enabled
      if (this.props.enableRangeSelection) {
        // If the formattedDate contains a list of special characters symbols then it will be reset
        if (this.state.formattedDate.search(regex) != -1 || this.state.formattedDate == '' || this.state.formattedDate.split('-').length < 2) {
          this.setState({
            formattedDate: '',
            arrSelectedDates: 'undefined',
            hidden: false
          });
        } else {
          // Breaks the input into an array
          const dateRange = this.state.formattedDate.split('-');
          const dateSeparatedFirstRange = dateRange[0].split('/');
          const dateSeparatedSecondRange = dateRange[1].split('/');

          // First date
          const firstYearRange = parseInt(dateSeparatedFirstRange[2]);
          const firstDateRange = parseInt(dateSeparatedFirstRange[1]);
          const firstMonthRange = parseInt(dateSeparatedFirstRange[0]);

          // Second date
          const secondYearRange = parseInt(dateSeparatedSecondRange[2]);
          const secondDateRange = parseInt(dateSeparatedSecondRange[1]);
          const secondMonthRange = parseInt(dateSeparatedSecondRange[0]);

          // Checks if the input is actually numbers and follows the required form
          if (
            (firstYearRange != NaN || firstDateRange != NaN || firstMonthRange != NaN) &&
            (secondYearRange != NaN || secondDateRange != NaN || secondMonthRange != NaN) &&
            (firstDateRange >= 1 && firstDateRange <= 31) &&
            (firstMonthRange > 1 && firstMonthRange <= 12) &&
            firstYearRange <= 3000 &&
            (secondDateRange >= 1 && secondDateRange <= 31) &&
            (secondMonthRange > 1 && secondMonthRange <= 12) &&
            secondYearRange <= 3000
          ) {
            const firstDate = new Date(firstYearRange, firstMonthRange - 1, firstDateRange);
            const secondDate = new Date(secondYearRange, secondMonthRange - 1, secondDateRange);
            let arrSelected = [];
            // Swaps the order in case one date is bigger than the other
            firstDate.getTime() > secondDate.getTime() ? (arrSelected = [secondDate, firstDate]) : (arrSelected = [firstDate, secondDate]);

            this.setState({
              selectedDate: '',
              arrSelectedDates: arrSelected
            });
          } else {
            this.setState({
              formattedDate: '',
              selectedDate: 'undefined',
              arrSelectedDates: 'undefined'
            });
          }
        }
      } else if (this.state.formattedDate.search(regex) != -1) {
        this.setState({
          formattedDate: this.formatDate(this.state.selectedDate),
          selectedDate: 'undefined'
        });
      } else {
        const dateSeparated = this.state.formattedDate.split('/');
        const year = parseInt(dateSeparated[2]);
        const date = parseInt(dateSeparated[1]);
        const month = parseInt(dateSeparated[0]);

        if ((year != NaN || date != NaN || month != NaN) && (date >= 1 && date <= 31) && (month > 1 && month <= 12) && year <= 3000) {
          this.setState({
            selectedDate: new Date(year, month - 1, date)
          });
        } else {
          this.setState({
            selectedDate: 'undefined',
            formattedDate: ''
          });
        }
      }
    }
  }

  modifyDate(e) {
    this.setState({ formattedDate: e.target.value });
  }

  // This is being used only when the user presses enter or clicks outside of the component
  formatDate(date) {
    const regex = /[!$%^&*()_+|~=`{}\[\]:'<>?,.\a-zA-Z]/;
    let formatDate = '';
    if (this.props.enableRangeSelection) {
      if (date.length == 0) {
        return '';
      }

      const firstDateMonth = date[0].getMonth() + 1;
      const firstDateDay = date[0].getDate();
      const firstDateYear = date[0].getFullYear();

      const secondDateMonth = date[1].getMonth() + 1;
      const secondDateDay = date[1].getDate();
      const secondDateYear = date[1].getFullYear();

      if (firstDateYear >= 3000 || secondDateYear >= 3000) {
        return '';
      }
      formatDate = `${firstDateMonth}/${firstDateDay}/${firstDateYear}-${secondDateMonth}/${secondDateDay}/${secondDateYear}`;
    } else {
      // Checks if the type of date doesn't match those types and that it doesn't contain any special character symbols
      if (typeof date !== 'object' && date.toString().search(regex) !== 1) {
        return '';
      }
      const month = date[0].getMonth();
      const day = date[0].getDate();
      const year = date[0].getFullYear();

      formatDate = `${month}/${day}/${year}`;
    }
    return formatDate;
  }

  updateDate(date) {
    console.log('Inside updateDate function. The event is: ', date);

    if (this.props.enableRangeSelection) {
      if (date.length == 2) {
        const firstDateMonth = date[0].getMonth() + 1;
        const firstDateDay = date[0].getDate();
        const firstDateYear = date[0].getFullYear();

        const secondDateMonth = date[1].getMonth() + 1;
        const secondDateDay = date[1].getDate();
        const secondDateYear = date[1].getFullYear();

        const formatDate = `${firstDateMonth}/${firstDateDay}/${firstDateYear}-${secondDateMonth}/${secondDateDay}/${secondDateYear}`;
        this.setState({
          arrSelectedDates: date,
          formattedDate: formatDate
        });
      } else {
        const firstDateMonth = date[0].getMonth() + 1;
        const firstDateDay = date[0].getDate();
        const firstDateYear = date[0].getFullYear();

        const formatDate = `${firstDateMonth}/${firstDateDay}/${firstDateYear}`;

        this.setState({
          arrSelectedDates: date,
          formattedDate: formatDate
        });
      }
    } else {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();

      const formatDate = `${month}/${day}/${year}`;

      this.setState({
        selectedDate: date,
        formattedDate: formatDate
      });
    }
  }

  render() {
    const {
      enableRangeSelection,
      disableWeekends,
      disableBeforeDate,
      disableAfterDate,
      disableWeekday,
      disablePastDates,
      disableFutureDates,
      blockedDates,
      disabledDates,
      compact,
      className,
      ...props
    } = this.props;
    return (
      <div className={`fd-date-picker${className ? ` ${className}` : ''}`} {...props} ref={component => (this.component = component)}>
        <div className="fd-popover">
          <div className="fd-popover__control">
            <div className={`fd-input-group fd-input-group--after${this.props.compact ? ' fd-input-group--compact' : ''}`}>
              <input
                className={`fd-input${this.props.compact ? ' fd-input--compact' : ''}`}
                type="text"
                placeholder="mm/dd/yyyy"
                onClick={() => this.openCalendar('input')}
                value={this.state.formattedDate}
                onChange={this.modifyDate}
                onKeyPress={this.sendUpdate}
              />
              <span className="fd-input-group__addon fd-input-group__addon--after fd-input-group__addon--button">
                <button className="fd-popover__control fd-button--light sap-icon--calendar" onClick={() => this.openCalendar()} />
              </span>
            </div>
          </div>
          <div className="fd-popover__body fd-popover__body--right fd-popover__body--no-arrow" aria-hidden={this.state.hidden}>
            <Calendar
              onChange={this.updateDate}
              enableRangeSelection={enableRangeSelection}
              disableWeekends={disableWeekends}
              disableBeforeDate={disableBeforeDate}
              disableAfterDate={disableAfterDate}
              disableWeekday={disableWeekday}
              disablePastDates={disablePastDates}
              disableFutureDates={disableFutureDates}
              blockedDates={blockedDates}
              disabledDates={disabledDates}
              customDate={enableRangeSelection ? this.state.arrSelectedDates : this.state.selectedDate}
            />
          </div>
        </div>
      </div>
    );
  }
}

DatePicker.propTypes = {
  compact: PropTypes.bool,
  enableRangeSelection: PropTypes.bool
};
