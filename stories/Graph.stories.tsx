import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { GlobalGeo } from '../components/graph/GlobalGeo';

export default {
  title: 'graph/geo',
  component: GlobalGeo,
  args: {
    height: 600,
    strokeColor: "#333",
    backgroundColor: "#95bad2"
  }
} as Meta;

const Template: Story = (arg) => {
  return <GlobalGeo {...arg} />
};

export const 지구본 = Template.bind({});
지구본.parameters = {
  layout: 'fullscreen'
};
지구본.argTypes = {
  strokeColor: { control: 'color' },
  backgroundColor: { control: 'color' },
  height: {
    control: { type: 'range', min: 400, max: 1200, step: 50 },
  },
}