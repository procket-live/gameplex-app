import React from 'react';
import { connect } from 'react-redux';
import { Text, FlatList, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import {
    Placeholder,
    PlaceholderLine,
    Shine,
    Fade,
    PlaceholderMedia
} from "rn-placeholder";
import { useQuery } from '@apollo/react-hooks';

import { TEXT_COLOR, GREY_2, GREY_3 } from '../../constant/color.constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { AccessNestedObject } from '../../utils/common.util';
import TitleComponent from '../title-component/title.component';
import { GetPlayground } from '../../graphql/graphql.query';
import { navigate } from '../../service/navigation.service';

const BattleSliderComponent = ({ battle = {} }) => {
    const { data, loading } = useQuery(GetPlayground);

    if (loading) {
        return (
            <>
                <TitleComponent title="Games" />
                <View style={{ marginLeft: widthPercentageToDP(5), width: widthPercentageToDP(90), height: widthPercentageToDP(40), flexDirection: 'row' }} >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <ShinyCard />
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <ShinyCard />
                    </View>
                </View>
                <View style={{ marginTop: 20, marginLeft: widthPercentageToDP(5), width: widthPercentageToDP(90), height: widthPercentageToDP(40), flexDirection: 'row' }} >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <ShinyCard />
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <ShinyCard />
                    </View>
                </View>
            </>
        )
    }

    function ShinyCard() {
        return (
            <Placeholder Animation={Fade} >
                <PlaceholderLine style={[styles.image]} />
            </Placeholder>
        )
    }

    function RenderCard({ item: playground = {}, key }) {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigate("Battle", {
                        id: playground.id,
                        title: playground.game.name,
                        icon: playground.game.thumbnail
                    })
                }}
                key={key}
            >
                <Image style={styles.image} source={{ uri: AccessNestedObject(playground, 'game.thumbnail') }} />
                <Text style={{ color: TEXT_COLOR, fontSize: 16, fontWeight: 'bold', marginLeft: 10 }} >
                    {AccessNestedObject(playground, 'game.name')}
                </Text>
            </TouchableOpacity >
        )
    }

    return (
        <>
            <TitleComponent title="Games" />
            <FlatList
                contentContainerStyle={styles.contentContainer}
                data={data?.getPlayground}
                showsHorizontalScrollIndicator={false}
                renderItem={RenderCard}
            />
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: widthPercentageToDP(40),
        height: widthPercentageToDP(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        resizeMode: 'cover',
        padding: widthPercentageToDP(2.5),
        margin: widthPercentageToDP(2.5),
    },
    contentContainer: {
        marginLeft: widthPercentageToDP(5),
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
});

const mapStateToProps = state => ({
    battle: state.battle
})

export default connect(mapStateToProps)(BattleSliderComponent);
