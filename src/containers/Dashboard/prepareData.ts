import dayjs from "dayjs";

export const prepareData = (
  originalGroups: Array<{
    id: string;
    name: string;
    group_exercises: Array<{ id: number; name: string }>;
  }>,
  originalItems: Array<{
    id: number;
    name: string;
    start_at: Date;
    end_at: Date;
    SubGroupId: number;
    event_exercise: {
      background_color: string;
      text_color: string;
    } | null;
  }>,
  expandedGroups: Array<string | number>
) => {
  const allGroups: {
    id: string | number;
    title: string;
    root?: boolean;
    expanded?: boolean;
  }[] = [];
  const items: {
    id: number;
    group: string | number;
    title: string;
    start_time: number;
    end_time: number;
    itemProps: { style: { background: any; borderColor: any } };
  }[] = [];

  originalGroups.forEach(group => {
    const expanded = expandedGroups.includes(`group-${group.id}`);

    allGroups.push({
      id: `group-${group.id}`,
      title: group.name,
      root: true,
      expanded
    });

    if (expanded) {
      group.group_exercises.forEach(
        (subgroup: { id: number; name: string }) => {
          allGroups.push({
            id: subgroup.id,
            title: subgroup.name
          });
        }
      );
    }
  });

  originalItems.forEach(event => {
    items.push({
      id: event.id,
      group: event.SubGroupId,
      title: event.name,
      start_time: dayjs(event.start_at).valueOf(),
      end_time: dayjs(event.end_at).valueOf(),
      itemProps: {
        style: {
          background: event.event_exercise?.background_color || "red",
          borderColor: event.event_exercise?.text_color || "white"
        }
      }
    });
  });

  return { groups: allGroups, items };
};
