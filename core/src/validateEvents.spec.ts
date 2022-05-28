import { event } from "./event";
import { validateEvents } from "./validateEvents";

const initializedEvent = ({
  transitionDuration,
}: {
  transitionDuration: number;
}) => event("Initialized", { transitionDuration });

const registeredEvent = ({ activityName }: { activityName: string }) =>
  event("ActivityRegistered", {
    activityName,
  });

test("validateEvents - 만약에 events 파라미터가 비어있는 경우 throw 합니다", () => {
  expect(() => {
    validateEvents([]);
  }).toThrow();
});

test("validateEvents - InitializedEvent가 중복된 경우 throw 합니다", () => {
  expect(() => {
    validateEvents([
      initializedEvent({
        transitionDuration: 300,
      }),
      initializedEvent({
        transitionDuration: 300,
      }),
    ]);
  }).toThrow();
});

test("validateEvents - 빈 배열을 전달하는 경우 throw 합니다", () => {
  expect(() => {
    validateEvents([]);
  }).toThrow();
});

test("validateEvents - 푸시했는데 해당 액티비티가 없는 경우 throw 합니다", () => {
  expect(() => {
    validateEvents([
      initializedEvent({
        transitionDuration: 300,
      }),
      registeredEvent({
        activityName: "home",
      }),
      event("Pushed", {
        activityId: "a1",
        activityName: "sample",
      }),
    ]);
  }).toThrow();
});
