import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withKnobs, object } from '@storybook/addon-knobs';
import { Parliament } from '../components/graph/Parliament ';


export default {
  title: 'graph/Parliament',
  component: Parliament,  
  args: {
    InnerSize: 10,
    rows: 0,
  },
  decorators: [ withKnobs ]
} as Meta;

const Template: Story = (arg) => {
  const ii = object('items', {
      0: ['민주당', 122, '#1e4d9b', '가'],
      1: ['국민의힘', 140, '#EB001F', '나'],
      2: ['국민의당', 30, '#64A12D', '다'],
      3: ['정의당', 10, '#FFED00', '라'],
      4: ['무당층', 34, '#cccccc', '마']
  });

  const data = Object.entries(ii).map(k => k[1]);
  return <Parliament {...arg} data={data}  />
};

export const 의석수 = Template.bind({});
의석수.parameters = {
  layout: 'fullscreen'
};
의석수.argTypes = {
  rows: {
    control: { type: 'range', min: 0, max: 10, step: 1 },
  },
  InnerSize: {
    control: { type: 'range', min: 0, max: 100, step: 10 },
  },
}
