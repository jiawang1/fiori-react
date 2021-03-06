import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todayDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0),
      currentDateDisplayed: new Date(),
      arrSelectedDates: [],
      selectedDate: new Date(0, 0, 0),
      showMonths: false,
      showYears: false,
      currentYear: new Date(),
      dateClick: false
    };

    this.generateNavigation = this.generateNavigation.bind(this);
    this.generateWeekdays = this.generateWeekdays.bind(this);
    this.generateDays = this.generateDays.bind(this);
    this.retrieveStartOfWeek = this.retrieveStartOfWeek.bind(this);
    this.addDays = this.addDays.bind(this);
    this.returnFirstDayMonth = this.returnFirstDayMonth.bind(this);
    this.returnLastDayMonth = this.returnLastDayMonth.bind(this);
    this.retrieveEndOfWeek = this.retrieveEndOfWeek.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.isDateBetween = this.isDateBetween.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.disableWeekday = this.disableWeekday.bind(this);
    this.disableBeforeDate = this.disableBeforeDate.bind(this);
    this.disableAfterDate = this.disableAfterDate.bind(this);
    this.disableBeforeTodayDate = this.disableBeforeTodayDate.bind(this);
    this.disableAfterTodayDate = this.disableAfterTodayDate.bind(this);
    this.selectRangeSelection = this.selectRangeSelection.bind(this);
    this.showMonths = this.showMonths.bind(this);
    this.generateMonths = this.generateMonths.bind(this);
    this.generateYears = this.generateYears.bind(this);
    this.showYears = this.showYears.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.displayIsDayOtherMonth = this.displayIsDayOtherMonth.bind(this);
    this.displayIsSelected = this.displayIsSelected.bind(this);
    this.displaySelectedRangeFirst = this.displaySelectedRangeFirst.bind(this);
    this.displaySelectedRangeLast = this.displaySelectedRangeLast.bind(this);
    this.displayBetweenRange = this.displayBetweenRange.bind(this);
    this.displayDisabled = this.displayDisabled.bind(this);
    this.returnDateSelected = this.returnDateSelected.bind(this);
  }

  // Updates the states when the props of the parent component are changed.
  static getDerivedStateFromProps(updatedPropsParent, previousStates) {
    if (updatedPropsParent.customDate === undefined) {
      return null;
    }

    // If range is enabled and the date from the parent component does not match the array dates of the states then states are updated
    if (updatedPropsParent.enableRangeSelection !== undefined) {
      if (updatedPropsParent.customDate !== previousStates.arrSelectedDates) {
        // This checks if the date from date picker is undefined
        if (updatedPropsParent.customDate === 'undefined') {
          // DateClick allows to update the date from the date picker if it is undefined
          if (previousStates.dateClick) {
            return { dateClick: false };
          }
          return { currentDateDisplayed: new Date(), arrSelectedDates: [], selectedDate: new Date(0, 0, 0) };
        }
        // updates the calendar if the date from date picker is correct
        return { arrSelectedDates: updatedPropsParent.customDate, selectedDate: new Date(0, 0, 0) };
      }
    } else if (updatedPropsParent.customDate !== previousStates.currentDateDisplayed) {
      if (updatedPropsParent.customDate === undefined || updatedPropsParent.customDate === '') {
        return null;
      }
      if (updatedPropsParent.customDate === 'undefined') {
        if (previousStates.selectedDate.getFullYear() !== 1899 && previousStates.dateClick) {
          return { dateClick: false };
        }
        // If date was not clicked then the date is reset
        if (!previousStates.dateClick) {
          return { currentDateDisplayed: new Date(), selectedDate: new Date(0, 0, 0) };
        }
      } else {
        // Updates the calendar if the date from date picker is correct
        return { currentDateDisplayed: updatedPropsParent.customDate, selectedDate: updatedPropsParent.customDate, dateClick: false };
      }
    }
    return { dateClick: false };
  }

  showMonths() {
    this.setState({
      showMonths: !this.state.showMonths,
      showYears: false,
      dateClick: true
    });
  }

  displayBetweenRange(day) {
    return this.props.enableRangeSelection && this.isDateBetween(day, this.state.arrSelectedDates, this.props.enableRangeSelection) ? 'is-selected-range' : '';
  }

  displaySelectedRangeLast(day) {
    return this.props.enableRangeSelection && (this.state.arrSelectedDates[1] !== undefined && this.state.arrSelectedDates[1].getTime() === day.getTime())
      ? ' is-selected-range-last'
      : '';
  }

  displayIsDayOtherMonth(day) {
    return day.getMonth() === this.state.currentDateDisplayed.getMonth() ? '' : '--other-month';
  }

  displayIsSelected(day) {
    return (this.isSelected(day) ||
      (this.props.enableRangeSelection &&
        ((this.state.arrSelectedDates[0] !== undefined ? this.state.arrSelectedDates[0].getTime() === day.getTime() : false) ||
          (this.state.arrSelectedDates[1] !== undefined ? this.state.arrSelectedDates[1].getTime() === day.getTime() : false)))) &&
      !(this.props.disableWeekends && (day.getDay() === 0 || day.getDay() === 6)) &&
      !this.disableBeforeDate(day, this.props.disableBeforeDate) &&
      !this.isDateBetween(day, this.props.blockedDates) &&
      !this.disableWeekday(day, this.props.disableWeekday) &&
      !(this.props.disablePastDates && this.disableBeforeTodayDate(day)) &&
      !(this.props.disableFutureDates && this.disableAfterTodayDate(day)) &&
      !this.isDateBetween(day, this.props.disabledDates)
      ? 'is-selected'
      : '';
  }

  displaySelectedRangeFirst(day) {
    return this.props.enableRangeSelection && this.state.arrSelectedDates[0] !== undefined && this.state.arrSelectedDates[0].getTime() === day.getTime()
      ? ' is-selected-range-first '
      : '';
  }

  displayDisabled(day) {
    return (this.props.disableWeekends && (day.getDay() === 0 || day.getDay() === 6)) ||
      (this.props.disablePastDates && this.disableBeforeTodayDate(day)) ||
      (this.props.disableFutureDates && this.disableAfterTodayDate(day)) ||
      this.disableWeekday(day, this.props.disableWeekday) ||
      this.disableBeforeDate(day, this.props.disableBeforeDate) ||
      this.disableAfterDate(day, this.props.disableAfterDate) ||
      this.isDateBetween(day, this.props.disabledDates)
      ? ' is-disabled'
      : '';
  }

  showYears() {
    this.setState({
      showMonths: false,
      showYears: !this.state.showYears,
      dateClick: true
    });
  }

  showNextYears() {
    const copyDate = this.state.currentYear;
    copyDate.setFullYear(copyDate.getFullYear() + 12);
    this.setState({ currentYear: copyDate });
  }

  changeMonth(month) {
    const date = this.state.currentDateDisplayed;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    date.setMonth(months.indexOf(month));

    // updates month state
    if (!this.props.enableRangeSelection) {
      this.setState(
        {
          currentDateDisplayed: date,
          selectedDate: date,
          dateClick: true
        },
        function() {
          this.returnDateSelected(date);
        }
      );
    } else {
      this.setState({
        currentDateDisplayed: date,
        dateClick: true
      });
    }
  }

  changeYear(year) {
    const date = this.state.currentDateDisplayed;
    date.setFullYear(year);
    if (!this.props.enableRangeSelection) {
      this.setState(
        {
          currentDateDisplayed: date,
          selectedDate: date,
          dateClick: true
        },
        function() {
          this.returnDateSelected(date);
        }
      );
    } else {
      this.setState({
        currentDateDisplayed: date,
        dateClick: true
      });
    }
  }

  generateMonths() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const listOfMonths = months.map(element => {
      let shortenedNameMonth = '';
      if (element.length > 3) {
        shortenedNameMonth = `${element.substring(0, 3)}.`;
      } else {
        shortenedNameMonth = element.substring(0, 3);
      }

      return (
        <li
          className={`fd-calendar__item${months[this.state.currentDateDisplayed.getMonth()] === element ? ' is-selected' : ''}${
            months[this.state.todayDate.getMonth()] === element ? ' fd-calendar__item--current' : ''
          }`}
          key={element}
          name={element}
          onClick={() => this.changeMonth(element)}
        >
          {shortenedNameMonth}
        </li>
      );
    });

    return (
      <div className="fd-calendar__months">
        <ul className="fd-calendar__list">{listOfMonths}</ul>
      </div>
    );
  }

  generateYears() {
    let year = this.state.currentYear.getFullYear();
    const years = [year];
    for (let iterations = 1; iterations < 12; iterations++) {
      year += 1;
      years.push(year);
    }
    const listOfYears = years.map(element => (
      <li
        className={`fd-calendar__item${this.state.currentDateDisplayed.getFullYear() === element ? ' is-selected' : ''}${
          this.state.todayDate.getFullYear() === element ? ' fd-calendar__item--current' : ''
        }`}
        key={element}
        name={element}
        onClick={() => this.changeYear(element)}
      >
        {element}
      </li>
    ));
    return (
      <div className="fd-calendar__months">
        <ul className="fd-calendar__list">{listOfYears}</ul>
      </div>
    );
  }

  next() {
    if (this.state.showYears) {
      const copyDate = this.state.currentYear;
      copyDate.setFullYear(copyDate.getFullYear() + 12);
      this.setState({ currentYear: copyDate, dateClick: true });
    } else {
      const copyDate = this.state.currentDateDisplayed;
      const selectedDate = new Date(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth(), this.state.selectedDate.getDate(), 0, 0, 0, 0);
      copyDate.setMonth(copyDate.getMonth() + 1);
      this.setState({
        currentDateDisplayed: copyDate,
        selectedDate,
        dateClick: true
      });
    }
  }

  previous() {
    if (this.state.showYears) {
      const copyDate = this.state.currentYear;
      copyDate.setFullYear(copyDate.getFullYear() - 12);
      this.setState({ currentYear: copyDate, dateClick: true });
    } else {
      const copyDate = this.state.currentDateDisplayed;
      const selectedDate = new Date(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth(), this.state.selectedDate.getDate(), 0, 0, 0, 0);
      copyDate.setMonth(copyDate.getMonth() - 1);

      this.setState({
        currentDateDisplayed: copyDate,
        selectedDate,
        dateClick: true
      });
    }
  }

  dateClick = (day, isRangeEnabled) => {
    let selectedDates = [];
    if (isRangeEnabled !== undefined && isRangeEnabled) {
      selectedDates = this.state.arrSelectedDates;
      if (selectedDates.length === 2) {
        selectedDates = [];
        selectedDates.push(day);
      } else if (selectedDates[0] !== undefined && day.getTime() <= selectedDates[0].getTime()) {
        const newArr = [];
        newArr.push(day);
        newArr.push(selectedDates[0]);
        selectedDates = newArr;
      } else {
        selectedDates.push(day);
      }
    }

    this.setState(
      {
        selectedDate: day,
        arrSelectedDates: selectedDates,
        dateClick: true
      },
      function() {
        if (isRangeEnabled) {
          this.returnDateSelected(selectedDates);
        } else {
          this.returnDateSelected(day);
        }
      }
    );
  };

  retrieveStartOfWeek(date) {
    const day = date.getDay();
    const difference = date.getDate() - day + (day === 0 ? -6 : 0);
    return new Date(date.setDate(difference));
  }

  returnFirstDayMonth(date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay;
  }

  returnLastDayMonth(date) {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay;
  }

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  retrieveEndOfWeek(date) {
    const difference = date.getDate() + 6 - date.getDay();
    const newDate = new Date(date.getFullYear(), date.getMonth(), difference);
    return newDate;
  }

  isDateBetween(date, blockedDates, isRangeEnabled) {
    if (blockedDates === undefined || blockedDates[0] === undefined || blockedDates[1] === undefined) {
      return false;
    }

    if (isRangeEnabled !== undefined || isRangeEnabled) {
      if (blockedDates[0].getTime() > blockedDates[1].getTime()) {
        return blockedDates[1].getTime() < date.getTime() && blockedDates[0].getTime() > date.getTime();
      }
    }
    return blockedDates[0].getTime() < date.getTime() && blockedDates[1].getTime() > date.getTime();
  }

  isSelected(date) {
    return (
      this.state.selectedDate.getDate() === date.getDate() && this.state.selectedDate.getMonth() === date.getMonth() && this.state.selectedDate.getFullYear() === date.getFullYear()
    );
  }

  disableWeekday(date, weekDays) {
    const daysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (weekDays === undefined) {
      return false;
    }

    if (weekDays.indexOf(daysName[date.getDay()] > 0)) {
      return true;
    }
    return false;
  }

  disableBeforeDate(date, beforeDate) {
    if (beforeDate === undefined) {
      return false;
    }
    return date.getTime() < beforeDate.getTime();
  }

  disableAfterDate(date, afterDate) {
    if (afterDate === undefined) {
      return false;
    }
    return date.getTime() > afterDate.getTime();
  }

  disableBeforeTodayDate(date) {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    return date.getTime() < todayDate.getTime();
  }

  disableAfterTodayDate(date) {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    return date.getTime() > todayDate.getTime();
  }

  selectRangeSelection(date) {
    let selectedDates = this.state.arrSelectedDates;
    if (selectedDates.length === 2) {
      selectedDates = [];
    }
    selectedDates.push(date);

    this.setState({
      arrSelectedDates: selectedDates
    });

    return this.state.arrSelectedDates;
  }

  returnDateSelected(dates) {
    if (this.props.onChange !== undefined) {
      if (this.props.enableRangeSelection === true) {
        this.props.onChange(dates);
      } else {
        this.props.onChange(dates);
      }
    }
  }

  generateNavigation() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <header className="fd-calendar__header">
        <div className="fd-calendar__navigation">
          <div className="fd-calendar__action">
            <button className="fd-button--standard fd-button--light fd-button--compact sap-icon--slim-arrow-left" onClick={this.previous} />
          </div>
          <div className="fd-calendar__action">
            <button className="fd-button--light fd-button--compact" onClick={this.showMonths}>
              <span>{months[this.state.currentDateDisplayed.getMonth()]}</span>
            </button>
          </div>
          <div className="fd-calendar__action">
            <button className="fd-button--light fd-button--compact" onClick={this.showYears}>
              <span>{this.state.currentDateDisplayed.getFullYear()}</span>
            </button>
          </div>

          <div className="fd-calendar__action" onClick={this.next}>
            <button className="fd-button--standard fd-button--light fd-button--compact sap-icon--slim-arrow-right" />
          </div>
        </div>
      </header>
    );
  }

  generateWeekdays() {
    const weekDays = [];
    const daysName = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    for (let index = 0; index < 7; index++) {
      weekDays.push(
        <th className="fd-calendar__column-header" key={index}>
          <span className="fd-calendar__day-of-week">{daysName[index]}</span>
        </th>
      );
    }
    return <tr className="fd-calendar__row">{weekDays}</tr>;
  }

  generateDays() {
    // props that allows the developer to pass their preferences
    const blockedDates = this.props.blockedDates;
    const enableRangeSelection = this.props.enableRangeSelection;

    const firstDayMonth = this.returnFirstDayMonth(this.state.currentDateDisplayed);
    const endDayMonth = this.returnLastDayMonth(firstDayMonth);
    const firstDayWeekMonth = this.retrieveStartOfWeek(firstDayMonth);
    const lastDateEndMonth = this.retrieveEndOfWeek(endDayMonth);
    const rows = [];
    let days = [];
    let day = firstDayWeekMonth;
    let dateFormatted = '';

    // iterate until reach the end of the month
    while (day <= lastDateEndMonth) {
      // 7 days in a week
      for (let iterations = 0; iterations < 7; iterations++) {
        dateFormatted = day.getDate();
        const copyDate = day;
        days.push(
          <td
            className={`fd-calendar__item fd-calendar__item${this.displayIsDayOtherMonth(day)} ${
              this.state.todayDate.getTime() === copyDate.getTime() ? 'fd-calendar__item--current' : ''
            } ${this.displayIsSelected(day)} ${this.displaySelectedRangeFirst(day)}${this.displaySelectedRangeLast(day)}${this.displayBetweenRange(day)} ${this.displayDisabled(
              day
            )} ${this.isDateBetween(day, blockedDates) ? 'is-blocked' : ''}`}
            role="gridcell"
            onClick={() => this.dateClick(copyDate, enableRangeSelection)}
            key={copyDate}
          >
            <span className="fd-calendar__text">{dateFormatted}</span>
          </td>
        );

        day = this.addDays(day, 1);
      }

      rows.push(
        <tr className="fd-calendar__row" key={day}>
          {days}
        </tr>
      );

      days = [];
    }
    return <tbody className="fd-calendar__group">{rows}</tbody>;
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
      customDate,
      className,
      ...props
    } = this.props;
    return (
      <div className={`fd-calendar${className ? ` ${className}` : ''}`} {...props}>
        {this.generateNavigation()}
        <div className="fd-calendar__content">
          {this.state.showMonths ? (
            this.generateMonths()
          ) : this.state.showYears ? (
            this.generateYears()
          ) : (
            <div className="fd-calendar__dates">
              <table className="fd-calendar__table">
                <thead className="fd-calendar__group">{this.generateWeekdays()}</thead>
                {this.generateDays()}
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  blockedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  disableAfterDate: PropTypes.instanceOf(Date),
  disableBeforeDate: PropTypes.instanceOf(Date),
  disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  disableFutureDates: PropTypes.bool,
  disablePastDates: PropTypes.bool,
  disableWeekday: PropTypes.arrayOf(PropTypes.string),
  disableWeekends: PropTypes.bool
};
