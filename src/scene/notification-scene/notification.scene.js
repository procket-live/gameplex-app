import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import NotificationIcon from '../../assets/svg/notification';
import { PRIMARY_COLOR, ON_PRIMARY, GREY_BG, TEXT_COLOR, GREY_1, RED } from '../../constant/color.constant';
import PrivateApi from '../../api/private.api';
import {
    Placeholder,
    PlaceholderLine,
    Fade,
} from "rn-placeholder";

function NotificationScene() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        fetchData();
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData(() => setRefreshing(false));
    }, [refreshing]);

    async function fetchData(callback = () => { }) {
        setLoading(true)
        const result = await PrivateApi.GetNotifications();
        setLoading(false);
        callback();
        if (result.success) {
            setNotifications(result.response);
        }
    }

    if (loading) {
        return (
            <FlatList
                style={{ backgroundColor: GREY_BG }}
                data={[1, 2, 3]}
                renderItem={ShinyCard}
            />
        )
    }

    if (!notifications.length) {
        return <EmptyScene />;
    }

    return (
        <FlatList
            pull
            style={{ backgroundColor: GREY_BG }}
            data={notifications}
            renderItem={NotificationCard}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
    )
}

function EmptyScene() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: GREY_BG }}>
            <NotificationIcon height={200} width={100} />
            <Text style={{ fontSize: 16, color: PRIMARY_COLOR, fontWeight: '500' }} >No Notification</Text>
        </View>
    )
}

function ShinyCard() {
    return (
        <Placeholder
            Animation={Fade}
        >
            <View style={{ flex: 1, padding: 10, margin: 5, borderRadius: 4, elevation: 1, backgroundColor: ON_PRIMARY, flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <PlaceholderLine style={{ width: 25, height: 25 }} />
                </View>
                <View style={{ flex: 5 }} >
                    <PlaceholderLine style={{ width: 200, height: 5 }} />
                    <PlaceholderLine style={{ width: 150, height: 5 }} />
                </View>
            </View>
        </Placeholder>
    )
}

function NotificationCard({ item, key }) {
    const newNotification = false;

    return (
        <View key={key} style={{ flex: 1, padding: 10, margin: 5, borderRadius: 4, elevation: 1, backgroundColor: ON_PRIMARY, flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <NotificationIcon height={25} width={25} />
            </View>
            <View style={{ flex: 5 }} >
                <Text style={{ fontSize: 16, color: TEXT_COLOR, fontWeight: '500' }} >
                    {item.title}
                </Text>
                <Text style={{ fontSize: 13, color: GREY_1, fontWeight: '500' }} >
                    {item.message}
                </Text>
            </View>
            {
                newNotification ?
                    <View style={{ flex: .2, alignItems: 'center', justifyContent: 'center' }} >
                        <View style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: RED }} />
                    </View> : null
            }
        </View>
    )
}

export default NotificationScene;
