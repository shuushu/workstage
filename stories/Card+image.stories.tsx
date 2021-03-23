import React, { useEffect } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withKnobs, object } from '@storybook/addon-knobs';
import { StrategyCard } from '../components/StrategyCard'
import CardImage from '../components/Card+image'

export default {
  title: 'List/카드'  
} as Meta;

const Template: Story = (args) => {
    const data = object('items', {
        0: {
            path: 'https://picsum.photos/id/237/200/300',
            width: 300,
            height: 200
        },
        1: {
            path: 'https://picsum.photos/id/27/200/300',
            width: 300,
            height: 200
        },
        2: {
            path: 'https://picsum.photos/id/217/200/300',
            width: 300,
            height: 200
        },
        3: {
            path: 'https://picsum.photos/id/117/200/300',
            width: 300,
            height: 200
        },
        4: {
            path: 'https://picsum.photos/id/157/200/300',
            width: 300,
            height: 200
        }
    });
    return (
        <StrategyCard {...args} data={data} />
    )
};
const CardTemplate: Story = (args) => <CardImage {...args} />


export const 카드_이미지 = CardTemplate.bind({
    component: CardImage
});
카드_이미지.args = {
    path: 'https://picsum.photos/id/237/200/300',
    width: 300,
    height: 200
};

export const 카드_이미지_드래그 = Template.bind({
    component: StrategyCard,
    decorators: [ withKnobs ]
});
카드_이미지_드래그.args = {    
};
카드_이미지_드래그.parameters = {
  layout: 'fullscreen'
};
