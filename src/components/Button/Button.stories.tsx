import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { Button, ButtonProps } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" }
  }
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<ButtonProps> = args => <Button {...args} />;

// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = { label: "Primary 😃", size: "lg" };

export const Secondary = Template.bind({});
Secondary.args = { ...Primary.args, label: "Secondary 😇"};

export const Success = Template.bind({});
Success.args = { size: "lg", label: "Success 😇"};

export const Empty = Template.bind({});
Empty.args = {};
