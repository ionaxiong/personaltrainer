import React, { useEffect, useState } from "react";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import './calendar.css';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#FFFFFF',
    padding: 40,
  },
}));

const CalendarComponents = () => {
    const [eventsInCalendar, setEventsInCalendar] = useState([]);
    const classes = useStyles();

    const fetchEvents = () => {
      fetch(`https://customerrest.herokuapp.com/gettrainings`)
      .then((response) => response.json())
      .then((data) => {
        const eventWithCustomerDetails = data.map((x) => {
          if (x.customer == null) {
            return {
              id: x.id.toString(),
              activity: x.activity,
              date: moment(x.date).utc(),
              duration: x.duration,
              customer: "",
            } 
          } else {
            return {
              id: x.id.toString(),
              activity: x.activity,
              date: moment(x.date).utc(),
              duration: x.duration,
              customer: x.customer.firstname + " " + x.customer.lastname,
            }
          }
        });
        setEventsInCalendar(eventWithCustomerDetails);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
      fetchEvents();
  }, []);

    return (
      <>
          <Paper className={classes.root}>
                <FullCalendar 
                  plugins={[timeGridPlugin, dayGridPlugin,listPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={{
                    left: "prev,next,today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                  }}
                  events={
                    eventsInCalendar.map((e) => {
                      return {
                        title: e.activity + " / " + e.customer,
                        start: moment(e.date).toDate(),
                        end: moment(e.date).add(moment.duration(e.duration, "minutes")).toDate(),
                      }
                    })
                  }
                  selectable={true}
                  timeZone="local"
                  locale="eng"
                  slotMinTime="00:00:00"
                  slotMaxTime="24:00:00"
                  height={"auto"}
                  eventColor={"#5664d2"}
                />
          </Paper>
      </>
    );
  }

  export default CalendarComponents;
