import React from 'react';
import {Calendar} from '@jay.wang/fundamental-react';
import { DocsTile, DocsText, Separator, Header, Description, Import, Properties } from '../documentation';


export const CalendarComponent = () => {

    const defaultCalendarCode = '<Calendar />';
    const calendarDisabledWeekendsBeforeDate = '<Calendar disableBeforeDate={new Date(2018,7,3,0,0,0,0)} disableWeekends={true}/>';
    const calendarDisabledWeekdaysBlockedDates = '<Calendar disableWeekday={["Monday", "Tuesday"]} blockedDates={[new Date(2018, 1, 1, 0,0, 0,0), new Date(2018, 3, 3, 0,0,0,0)]}/>';
    const calendarAllOptions = '<Calendar enableRangeSelection={true}/>';

    return (<div>
        <Header>Calendar</Header>
        <Description>Commonly used as the contents of a popover when composing “date-picker”, rarely used on its own as a standalone component.</Description>
        <Import module='Calendar' path='/fundamental-react/src/' />

        <Separator />

        <Properties type='Inputs' properties={[
                {name: 'disableWeekends', description: 'bool - Disable weekends'},
                {name: 'disableBeforeDate', description: 'date - Disables dates of a calendar that comes before a specific date'},
                {name: 'disableAfterDate', description: 'date - Disables dates of a calendar that comes after a specific date'},
                {name: 'disableWeekday', description: 'array of strings - Disables dates of a calendar that match a weekday'},
                {name: 'disablePastDates', description: 'bool - Disables dates that comes before today date'},
                {name: 'disableFutureDates', description: 'bool - Disables dates that comes after the today date'},
                {name: 'blockedDates', description: 'array of dates - Blocks dates that are between in the blocked dates'},
                {name: 'disabledDates', description: 'array of dates - Disables dates that are between in the disabled dates'},
                {name: 'enableRangeSelection', description: 'bool - Enable to select two dates'}
            ]} />

        <Separator />

        <h2>Default Calendar</h2>
        <DocsTile centered>
            <Calendar />
        </DocsTile>
        <DocsText>{defaultCalendarCode}</DocsText>

        <Separator />

        <h2>Calendar with disabled weekends and disabled before a date</h2>
        <DocsTile centered>
            {<Calendar disableBeforeDate={new Date(2018, 7, 3, 0, 0, 0, 0)} disableWeekends />}
        </DocsTile>
        <DocsText>{calendarDisabledWeekendsBeforeDate}</DocsText>

        <Separator />

        <h2>Calendar with disabled weekdays and blocked dates</h2>
        <DocsTile centered>
            {<Calendar disableWeekday={['Monday', 'Tuesday']} blockedDates={[new Date(2018, 1, 1, 0, 0, 0, 0), new Date(2018, 3, 3, 0, 0, 0, 0)]} />}
        </DocsTile>
        <DocsText>{calendarDisabledWeekdaysBlockedDates}</DocsText>

        <Separator />

        <h2>Calendar with range selection</h2>
        <DocsTile centered>
            {<Calendar enableRangeSelection />}
        </DocsTile>
        <DocsText>{calendarAllOptions}</DocsText>

        <Separator />
    </div>);

};
