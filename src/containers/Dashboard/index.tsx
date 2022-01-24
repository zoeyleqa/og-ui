import React, { useState, useEffect, useRef } from "react";
import Timetable from "./Timetable";
import { Preloader } from "../../components/Preloader";
import { RestfulProvider } from "restful-react";
import { useRouteEventsGet, useRouteExercisesGet } from "../../action/actions";

const TimelineDashboard = () => {
  const { data: eventData, loading: fetchEventLoading } = useRouteEventsGet({});
  const { data: exerciseData, loading: fetchGroupLoading } = useRouteExercisesGet({});

  // const [eventData, setEventData] = useState<any[] | null>(null);

  // useEffect(() => {
  //   if (!fetchEventLoading && !fetchGroupLoading) {
  //     setEventData(eventOriginalData);
  //   }
  // }, [fetchEventLoading, fetchGroupLoading]);

  return !fetchEventLoading && !fetchGroupLoading && eventData && exerciseData ? (
    <Timetable
      groupData={exerciseData}
      itemData={eventData}
      resizable={false}
      movable={false}
      leftColHeader="Group"
    />
  ) : (
    <Preloader />
  );
};

const Dashboard = ({ baseUrl }: { baseUrl: string }) => {
  return (
    <RestfulProvider base={baseUrl}>
      <TimelineDashboard />
    </RestfulProvider>
  );
};

export { Dashboard };
