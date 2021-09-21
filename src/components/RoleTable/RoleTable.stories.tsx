import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import RoleTable, { RoleTableProps } from "./RoleTable";
import dummyData from "./dummyData.json";

export default {
  title: "Components/RoleTable",
  component: RoleTable,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

// Create a master template for mapping args to render the RoleTable component
const Template: Story<RoleTableProps> = (args) => <RoleTable {...args} />;

export const Empty = Template.bind({});
Empty.args = {};

export const Dummy = Template.bind({});
Dummy.args = { data: dummyData };
