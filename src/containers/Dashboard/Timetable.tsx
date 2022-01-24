import React, { Component } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  TodayMarker
} from "react-calendar-timeline";
import InfoLabel from "./InfoLabel";
import helper from "./prepareData.js";
import "react-calendar-timeline/lib/Timeline.css";
import "./style.css";

dayjs.extend(duration);

const keys = {
  groupIdKey: "id",
  groupTitleKey: "name",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "name",
  itemDivTitleKey: "title",
  itemGroupKey: "event_exercise.group.id",
  itemTimeStartKey: "start_at",
  itemTimeEndKey: "end_at",
  groupLabelKey: "name"
};

interface TimetableProps {
  groups: any;
  items: any;
  resizable: boolean;
  movable: boolean;
  leftColHeader: string;
}

interface TimetableState {
  groups: any;
  items: any;
  defaultTimeStart: Date;
  defaultTimeEnd: Date;
  draggedItem: any;
  openGroups: { [index: string | number]: any };
}

export default class Timetable extends Component<
  TimetableProps,
  TimetableState
> {
  constructor(props: TimetableProps) {
    super(props);

    // const { groups, items } = helper.prepareData(props.groups, props.items);
    const defaultTimeStart = dayjs().startOf("day").add(-7, "day").toDate();
    const defaultTimeEnd = dayjs().startOf("day").add(7, "day").toDate();
    this.isWeekendDay = this.isWeekendDay.bind(this);
    this.isCurrentDay = this.isCurrentDay.bind(this);
    this.itemRenderer = this.itemRenderer.bind(this);
    this.intervalRenderer = this.intervalRenderer.bind(this);
    // convert every 2 groups out of 3 to nodes, leaving the first as the root
    // const newGroups = props.groups.map((group: { id: string }) => {
    //   const isRoot = (parseInt(group.id) - 1) % 3 === 0;
    //   const parent = isRoot
    //     ? null
    //     : Math.floor((parseInt(group.id) - 1) / 3) * 3 + 1;

    //   return Object.assign({}, group, {
    //     root: isRoot,
    //     parent: parent
    //   });
    // });

    this.state = {
      // groups: newGroups,
      groups: props.groups,
      items: props.items,
      defaultTimeStart,
      defaultTimeEnd,
      draggedItem: undefined,
      openGroups: {}
    };
  }

  itemRenderer = ({
    item,
    itemContext,
    getItemProps,
    getResizeProps
  }: {
    item: any;
    itemContext: any;
    getItemProps: any;
    getResizeProps: any;
  }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const backgroundColor = itemContext.selected
      ? itemContext.dragging
        ? "red"
        : item.selectedBgColor
      : item.bgColor;
    const borderColor = itemContext.resizing ? "red" : item.color;
    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            color: item.color,
            borderColor,
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 4,
            borderLeftWidth: itemContext.selected ? 3 : 1,
            borderRightWidth: itemContext.selected ? 3 : 1
          },
          onMouseDown: () => {
            console.log("on item click", item);
          }
        })}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: "hidden",
            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {itemContext.title}
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
      </div>
    );
  };

  toggleGroup = (id: number) => {
    const { openGroups } = this.state;
    this.setState({
      openGroups: {
        ...openGroups,
        [id]: !openGroups[id]
      }
    });
  };

  handleItemMove = (
    itemId: any,
    dragTime: number,
    newGroupOrder: string | number
  ) => {
    const { items, groups } = this.state;

    const group = groups[newGroupOrder];

    this.setState({
      items: items.map((item: { id: any; end: number; start: number }) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: dragTime,
              end: dragTime + (item.end - item.start),
              group: group.id
            })
          : item
      ),
      draggedItem: undefined
    });

    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  handleItemResize = (itemId: any, time: any, edge: string) => {
    const { items } = this.state;

    this.setState({
      items: items.map((item: { id: any; start: any; end: any }) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: edge === "left" ? time : item.start,
              end: edge === "left" ? item.end : time
            })
          : item
      ),
      draggedItem: undefined
    });

    console.log("Resized", itemId, time, edge);
  };

  handleItemDrag = ({
    itemId,
    time,
    newGroupOrder
  }: {
    itemId: number;
    time: Date;
    newGroupOrder: number;
  }) => {
    let item = this.state.draggedItem ? this.state.draggedItem.item : undefined;
    if (!item) {
      item = this.state.items.find((i: { id: any }) => i.id === itemId);
    }
    this.setState({
      draggedItem: { item: item, group: this.state.groups[newGroupOrder], time }
    });
  };

  isWeekendDay = (
    intervalContext: { interval: { startTime: { day: () => any } } },
    data: { isMonth: any }
  ) => {
    if (data.isMonth) {
      return false;
    }
    const day = intervalContext.interval.startTime.day();
    return day === 6 || day === 0; // Saturday or Sunday
  };

  isCurrentDay = (
    intervalContext: {
      interval: { startTime: { isSame: (arg0: any, arg1: string) => any } };
    },
    data: { isMonth: any; currentDate: any }
  ) => {
    return (
      !data.isMonth &&
      intervalContext.interval.startTime.isSame(data.currentDate, "day")
    );
  };

  intervalRenderer = ({
    intervalContext,
    getIntervalProps,
    data,
    isMonth
  }: {
    intervalContext: any;
    getIntervalProps: any;
    data: any;
    isMonth: boolean;
  }) => {
    return (
      <div
        {...getIntervalProps()}
        className={`rct-dateHeader ${
          data.isMonth ? "rct-dateHeader-primary" : ""
        }`}
        onClick={() => {
          return false;
        }}
      >
        <span
          style={{
            position: data.isMonth ? "sticky" : "static",
            marginRight: data.isMonth ? "auto" : "inherit",
            left: "0",
            padding: "0 1rem",
            fontWeight:
              this.isWeekendDay(intervalContext, data) ||
              this.isCurrentDay(intervalContext, data)
                ? "400"
                : "300",
            color: this.isCurrentDay(intervalContext, data) ? "#d32f2f" : "#000"
          }}
        >
          {intervalContext.intervalText}
        </span>
      </div>
    );
  };

  render() {
    const {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      openGroups
    } = this.state;

    // hide (filter) the groups that are closed, for the rest, patch their "title" and add some callbacks or padding
    // const newGroups = groups
    //   .filter(
    //     (g: { root: any; parent: string | number }) =>
    //       g.root || openGroups[g.parent]
    //   )
    //   .map((group: { root: any; id: string; title: {} | null | undefined }) => {
    //     return Object.assign({}, group, {
    //       title: group.root ? (
    //         <div
    //           onClick={() => this.toggleGroup(parseInt(group.id))}
    //           style={{ cursor: "pointer" }}
    //         >
    //           {openGroups[parseInt(group.id)] ? "[-]" : "[+]"} {group.title}
    //         </div>
    //       ) : (
    //         <div style={{ paddingLeft: 20 }}>{group.title}</div>
    //       )
    //     });
    //   });

    return (
      <>
        <Timeline
          // groups={newGroups}
          groups={groups}
          items={items}
          keys={keys}
          sidebarContent={<div>Above The Left</div>}
          sidebarWidth={150}
          // itemsSorted={true}
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={0.75}
          // showCursorLine
          canMove={this.props.movable}
          canResize={this.props.resizable}
          // canMove
          // canResize="right"
          // canSelect
          dragSnap={dayjs.duration(1, "days").milliseconds()}
          maxZoom={dayjs.duration(2, "months").milliseconds()}
          minZoom={dayjs.duration(3, "days").milliseconds()}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          itemRenderer={this.itemRenderer}
          onItemMove={this.handleItemMove}
          onItemResize={this.handleItemResize}
        >
          <TimelineMarkers>
            <TodayMarker date={dayjs().toDate()} />
            {/* <TodayMarker>
              {({ styles, date } : {styles: object; date: number;}) => (
                // date is value of current date. Use this to render special styles for the marker
                // or any other custom logic based on date:
                // e.g. styles = {...styles, backgroundColor: isDateInAfternoon(date) ? 'red' : 'limegreen'}
                <div style={backgroundColor: isDateInAfternoon(date) ? 'red' : 'limegreen'} />
              )}
            </TodayMarker> */}
          </TimelineMarkers>
          <TimelineHeaders className="sticky">
            <SidebarHeader>
              {({ getRootProps }) => {
                return (
                  <div {...getRootProps()}>{this.props.leftColHeader}</div>
                );
              }}
            </SidebarHeader>
            <DateHeader
              unit="month"
              labelFormat="MMMM"
              headerData={{ isMonth: true }}
              intervalRenderer={this.intervalRenderer}
            />
            <DateHeader
              unit="day"
              labelFormat="D"
              headerData={{ isMonth: false }}
              intervalRenderer={this.intervalRenderer}
            />
          </TimelineHeaders>
        </Timeline>
        {this.state.draggedItem && (
          <InfoLabel
            item={this.state.draggedItem.item}
            group={this.state.draggedItem.group}
            time={this.state.draggedItem.time}
          />
        )}
      </>
    );
  }
}
