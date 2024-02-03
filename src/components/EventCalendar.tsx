import clsx from "clsx";
import {
  add,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getDate,
    getDay,
    isEqual,
    isToday,
    parse,
    startOfMonth,
    startOfToday,
  } from "date-fns";
  import { useMemo, useState } from "react";
  
  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  interface Event {
    date: Date;
    title: string;
  }
  
  interface EventCalendarProps {
    events: Event[];
  }
  
  const EventCalendar = ({ events }: EventCalendarProps) => {
    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today);
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date())
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
  
    const daysInMonth = eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    });
  
    const startingDayIndex = getDay(firstDayOfMonth);
  
    const eventsByDate = useMemo(() => {
      return events.reduce((acc: { [key: string]: Event[] }, event) => {
        const dateKey = format(event.date, "yyyy-MM-dd");
        if (!acc[dateKey]) {
          acc[dateKey] = []; 
        }
        acc[dateKey].push(event);
        return acc;
      }, {});
    }, [events]);

    const nextMonth = () => {
      let firstDayNextMonth = add(firstDayCurrentMonth, {months: 1})
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
  
    return (
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <button onClick={nextMonth}>Next</button>
          <h2 className="text-center">{format(firstDayCurrentMonth, "MMMM yyyy")}</h2>
        </div>
        <div className="grid grid-cols-7 col-start gap-2">
          {WEEKDAYS.map((day) => {
            return (
              <div key={day} className="font-bold text-center">
                {day}
              </div>
            );
          })}
          {Array.from({ length: startingDayIndex }).map((_, index) => {
            return (
              <div
                key={`empty-${index}`}
                className={clsx("border rounded-md p-2 text-center", {
                  colStartClasses : index === 0
                })}
              />
            );
          })}
          {daysInMonth.map((day, index) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const todaysEvents = eventsByDate[dateKey] || [];
            return (
              <div
                key={index}
                onClick={() => setSelectedDay(day)}
                className={clsx("border rounded-md p-2 text-center hover:bg-gray-200 cursor-pointer", {
                  "bg-slate-400": isToday(day),
                  "text-gray-900": isToday(day),
                  "bg-green-500" : isEqual(day, selectedDay)
                })}
              >
                {format(day, "d")}
                {todaysEvents.map((event) => {
                  return (
                    <div
                      key={event.title}
                      className="bg-green-500 rounded-md text-gray-900 mt-1"
                    >
                      {event.title}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  let colStartClasses = [
    "",
    "col-start-1",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ]
  
  export default EventCalendar;
