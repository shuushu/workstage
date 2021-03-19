import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { SvgRange } from '../components/SvgRange';

export default {
  title: 'form/Range',
  component: SvgRange
} as Meta;

const Template: Story = (args) => <SvgRange {...args} />;

export const SVG_범위바 = Template.bind({});
SVG_범위바.parameters = {
  layout: 'fullscreen'
};
SVG_범위바.args = {
  scale: 1,
  textColor: '#03A9F4',
  background: '#03A9F4'
}
SVG_범위바.argTypes = {
  background: { control: 'color' },
  textColor: { control: 'color' },
  scale: {
    control: { type: 'range', min: 0, max: 10, step: 0.1 },
  },
}