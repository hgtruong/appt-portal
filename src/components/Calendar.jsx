import React from "react";
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Message } from "semantic-ui-react";
const localizer = momentLocalizer(moment);

const style = {
  margin: '5%'
}

const RBCalendar = function(props) {

  const eventStyleGetter = function (event, start,end, isSelected){
    var style = {
        backgroundColor: event.doctor.calendarColor,
        color: event.doctor.calendarColor === "YELLOW" ? 'red' : 'white',
    };
    return {
        style: style
    };
  }

  return (
    <div>
      <div className="calendar-container" style={style}>
        <Calendar
          localizer={localizer}
          events={props.parentAppointments}
          defaultView="month"
          views={["month"]}
          selectable={true}
          onDoubleClickEvent={props.doubleClickHandler}
          onSelectSlot={props.handleSlotClick}
          eventPropGetter={eventStyleGetter.bind(this)}
          />
      </div>
      <div className="info-guide">
        <Message info>
          <p>* Double click on open date slot to schedule an appointment</p>
          <p>* Double click on existing appointment to view or cancel </p>
        </Message>
      </div>
    </div>
  )
}

export { RBCalendar }
