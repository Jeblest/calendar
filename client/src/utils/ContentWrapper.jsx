import { UserProvider } from "../context/UserContext.jsx";
import { DateProvider } from "../context/DateContext.jsx";
import { GoalProvider } from "../context/GoalContext.jsx";
import { CalendarProvider } from "../context/CalendarContext.jsx";
import { NoteProvider } from "../context/NoteContext.jsx";

const ContentWrapper = ({ children }) => (
    <NoteProvider>
      <GoalProvider>
        <CalendarProvider>
          <DateProvider>
            <UserProvider>
              {children}
            </UserProvider>
          </DateProvider>
        </CalendarProvider>
      </GoalProvider>
    </NoteProvider>
  );

export default ContentWrapper;