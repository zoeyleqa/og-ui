import React, { useState, useEffect, useRef } from "react";
import { Timetable } from "./Timetable";
import { Preloader } from "../../components/Preloader";
import { RestfulProvider } from "restful-react";
import { useRouteEventsGet, useRouteGroupsGet } from "../../action/actions";

const TimelineDashboard = () => {
  const { data: events, loading: fetchEventLoading } = useRouteEventsGet({});
  const { data: groups, loading: fetchGroupLoading } = useRouteGroupsGet({});

  // const [eventData, setEventData] = useState<any[] | null>(null);

  // useEffect(() => {
  //   if (!fetchEventLoading && !fetchGroupLoading) {
  //     setEventData(eventOriginalData);
  //   }
  // }, [fetchEventLoading, fetchGroupLoading]);

  return !fetchEventLoading && !fetchGroupLoading && events && groups ? (
    <Timetable
      groupData={groups}
      itemData={events}
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
