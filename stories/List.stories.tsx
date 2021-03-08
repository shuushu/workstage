import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { FetchApi } from '../components/FetchApi';
import { ItemCard } from '../components/Items';
import { useFetch } from '../hooks/useFetch';

export default {
  title: 'List/fetch_api',
  component: FetchApi
} as Meta;

const Template: Story = (args) => {
  if (args.url.length > 0) {
    const [state, refetch] = useFetch(args.url);

    return (
      <FetchApi {...state} refetch={refetch}>
        <ItemCard data={state.data} refetch={refetch} />
      </FetchApi>
    )
  } else {
    // 테스트 버젼
    return <FetchApi {...args} />
  }
};

export const 데이터_패치 = Template.bind({});
데이터_패치.args = {
  loading: true,
  error: false,
  data: ['test', 'test2'],
  url: ''
};

