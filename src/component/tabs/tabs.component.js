import React from 'react';
import ScrollTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { PRIMARY_COLOR, ON_PRIMARY, GREY_3 } from '../../constant/color.constant';

const TAB_BAR_DEFAULT_STYLES = {
    tabBarPosition: 'top',
    prerenderingSiblingsNumber: 0,
    tabBarUnderlineStyle: {
        backgroundColor: PRIMARY_COLOR
    },
    tabBarBackgroundColor: ON_PRIMARY,
    tabBarActiveTextColor: PRIMARY_COLOR,
    tabBarInactiveTextColor: '#fff',
    tabBarTextStyle: {
        color: GREY_3,
        fontSize: 16
    },
    style: {
        borderWidth: 0,
    },
    backgroundColor: ON_PRIMARY,
    renderTabBar: () => <ScrollableTabBar />,
};

const Tabs = props => {
    return (
        <ScrollTabView
            {...TAB_BAR_DEFAULT_STYLES}
            initialPage={props.initialPage || 0}
        >
            {props.children}
        </ScrollTabView>
    )
}

export default Tabs;
