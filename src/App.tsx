import { addDays, subDays } from "date-fns"
import EventCalendar from "./components/EventCalendar"
function App() {
  return (
    <>
     <div className="">
      <EventCalendar 
       events={[
        { date: addDays(new Date(), 6), title: "Post video" },
        { date: addDays(new Date(), 1), title: "Edit video" },
        { date: addDays(new Date(), 3), title: "Code" },
      ]}
    />
     </div>
    </>
  )
}

export default App
