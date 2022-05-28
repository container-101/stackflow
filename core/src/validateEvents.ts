import { Event, PushedEvent } from "./events";
import { filterEvents } from "./filterEvents";
import { uniqBy } from "./uniqBy";

const isActivityIdDuplicated = (pushedEvents: PushedEvent[]) =>
  uniqBy(pushedEvents, (e) => e.activityId).length !== pushedEvents.length;

export function validateEvents(events: Event[]) {
  if (events.length === 0) {
    throw new Error("events parameter is empty");
  }

  const initEvents = filterEvents(events, "Initialized");
  const activityRegisteredEvents = filterEvents(events, "ActivityRegistered");
  const pushedEvents = filterEvents(events, "Pushed");

  if (initEvents.length > 1) {
    throw new Error("InitializedEvent can only exist once");
  }

  const registeredActivityNames = activityRegisteredEvents.map(
    (e) => e.activityName,
  );

  pushedEvents.forEach((e) => {
    if (!registeredActivityNames.includes(e.activityName)) {
      throw new Error("the corresponding activity does not exist");
    }
  });

  if (isActivityIdDuplicated(pushedEvents)) {
    throw new Error("activityId is duplicate");
  }
}
