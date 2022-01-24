import moment from "moment";

function getFirst(tasks) {
  const starts = tasks.map(t => t.start_time);
  starts.sort((a, b) => moment(a) - moment(b));

  return starts[0];
}

function getLast(tasks) {
  const ends = tasks.map(t => t.end_time);
  ends.sort((a, b) => moment(b) - moment(a));

  return ends[0];
}

export default function prepareData({
  originalGroups,
  originalItems
}: // stages,
// resources,
// workflows,
// expandedWorkflows,
// collapseTasks
{
  originalGroups: object[];
  originalItems: object[];
}) {
  const groups = [];
  const items = [];
  const tasks = [];

  workflows.forEach(w => {
    const expanded = expandedWorkflows.includes(`workflow-${w.id}`);

    groups.push({
      id: `workflow-${w.id}`,
      title: w.name,
      root: true,
      expanded
    });

    if (expanded) {
      w.resources.forEach(r => {
        const resource = resources.find(({ id }) => id === r.resource);

        groups.push({
          id: `resource-${resource.id}`,
          title: resource.name
        });
      });
    }
  });

  workflows.forEach(w => {
    w.resources.forEach(r => {
      r.tasks.forEach(t => {
        const stage = stages.find(s => s.id === t.stage);

        tasks.push({
          workflow: w.id,
          resource: r.resource,
          stage: stage.id,
          id: t.id,

          title: stage.name,
          start_time: moment(t.start),
          end_time: moment(t.end),
          itemProps: {
            style: {
              background: stage.color,
              borderColor: stage.color
            }
          }
        });
      });
    });
  });

  if (collapseTasks) {
    workflows.forEach(w => {
      stages.forEach(st => {
        const stageTasks = tasks
          .filter(t => t.workflow === w.id)
          .filter(t => t.stage === st.id);

        if (stageTasks.length) {
          const t = stageTasks[0];

          items.push({
            ...t,
            id: `workflow-${w.id}-stage-${t.stage}`,
            group: `workflow-${t.workflow}`,
            start_time: getFirst(stageTasks),
            end_time: getLast(stageTasks)
          });
        }
      });
    });

    resources.forEach(r => {
      stages.forEach(st => {
        const stageTasks = tasks
          .filter(t => t.resource === r.id)
          .filter(t => t.stage === st.id);

        if (stageTasks.length) {
          const t = stageTasks[0];

          items.push({
            ...t,
            id: `resource-${r.id}-stage-${t.stage}`,
            group: `resource-${t.resource}`,
            start_time: getFirst(stageTasks),
            end_time: getLast(stageTasks)
          });
        }
      });
    });
  } else {
    tasks.forEach(t => {
      items.push({
        ...t,
        id: `workflow-task-${t.id}`,
        group: `workflow-${t.workflow}`
      });

      items.push({
        ...t,
        id: `resource-task-${t.id}`,
        group: `resource-${t.resource}`
      });
    });
  }

  return { groups, items };
}
