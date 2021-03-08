import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Basic } from '../components/Reply';

export default {
  title: 'form/Reply',
  component: Basic
} as Meta;

const Template: Story = (args) => <Basic {...args} />;

export const 기본_댓글_폼 = Template.bind({});
기본_댓글_폼.args = {
  email: {
    required: '이메일은 필수 값입니다.',
    pattern: {
      value: /^\S+@\S+$/,
      message: '잘못된 이메일 형식'
    }
  },
  password: {
    required: '비밀번호는 필수 값입니다.',
    pattern: {
      value: /[A-Za-z]/,
      message: '비밀 번호 형식 다름'
    }
  }
};

