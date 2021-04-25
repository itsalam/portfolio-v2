import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import Navbar from '.';

export default {
    title: 'Navbar',
    component: Navbar
}

const Template : Story<ComponentProps<typeof Navbar>> = (args) => <Navbar/>;

export const FirstStory = Template.bind({});

FirstStory.args = {};