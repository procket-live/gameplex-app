import React from 'react';
import { connect } from 'react-redux';
import { Text, FlatList, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import {
    Placeholder,
    PlaceholderLine,
    Shine
} from "rn-placeholder";
import { TEXT_COLOR } from '../../constant/color.constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { navigate } from '../../service/navigation.service';
import { AccessNestedObject } from '../../utils/common.util';
import TitleComponent from '../title-component/title.component';
import { } from 'native-base';

const BattleSliderComponent = ({ battle = {} }) => {
    const { list, loading } = battle;

    function RenderCard({ item: battleItem = {}, key }) {

        if (loading) {
            return (
                <Placeholder
                    Animation={Shine}
                >
                    <View>
                        <PlaceholderLine color={'red'} width={widthPercentageToDP(40)} height={200} />
                        <PlaceholderLine width={30} style={{ margin: 3 }} />
                    </View>
                </Placeholder>

            )
        }

        return (
            <TouchableOpacity
                onPress={() => {
                    if (battleItem.battle_type == "match") {
                        navigate('Battle', { battle: battleItem });
                    }

                    if (battleItem.battle_type == "fantasy") {
                        navigate('Fantasy', { battle: battleItem })
                    }
                }}
                key={key}
            >
                <Image style={styles.image} source={{ uri: AccessNestedObject(battleItem, 'game.thumbnail') }} />
                <Text style={{ color: TEXT_COLOR, fontSize: 16, fontWeight: 'bold', marginLeft: 10 }} >
                    {AccessNestedObject(battleItem, 'game.name')}
                </Text>
            </TouchableOpacity >
        )
    }

    return (
        <>
            <TitleComponent title="Games" />
            <FlatList
                contentContainerStyle={{ marginLeft: widthPercentageToDP(5), alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row' }}
                data={list}
                showsHorizontalScrollIndicator={false}
                renderItem={RenderCard}
            />
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: widthPercentageToDP(40),
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        resizeMode: 'cover',
        padding: widthPercentageToDP(2.5),
        margin: widthPercentageToDP(2.5),
    }
});

const mapStateToProps = state => ({
    battle: state.battle
})

export default connect(mapStateToProps)(BattleSliderComponent);
