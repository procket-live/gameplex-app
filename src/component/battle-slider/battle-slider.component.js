import React from 'react';
import { connect } from 'react-redux';
import { Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ON_PRIMARY } from '../../constant/color.constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { navigate } from '../../service/navigation.service';
import { AccessNestedObject } from '../../utils/common.util';

const BattleSliderComponent = ({ battle = {} }) => {
    const { list } = battle;

    function RenderTextCircle({ item: battleItem = {}, key }) {

        return (
            <TouchableOpacity
                style={{ height: 130, width: widthPercentageToDP(95), marginBottom: 10 }}
                onPress={() => {
                    navigate('Battle', { battle: battleItem });
                }}
                key={key}
            >
                <Image style={styles.image} source={{ uri: AccessNestedObject(battleItem, 'game.wallpaper') }} />
                <Text style={{ color: ON_PRIMARY, fontSize: 30, position: 'absolute', bottom: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.4)', paddingRight: 10, paddingLeft: 10, borderBottomRightRadius: 10 }} >
                    {AccessNestedObject(battleItem, 'game.name')}
                </Text>
            </TouchableOpacity >
        )
    }

    return (
        <>
            <FlatList
                contentContainerStyle={{ alignItems: 'center' }}
                horizontal={false}
                data={list}
                showsHorizontalScrollIndicator={false}
                renderItem={RenderTextCircle}
            />
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: widthPercentageToDP(95),
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        resizeMode: 'cover'
    }
});

const mapStateToProps = state => ({
    battle: state.battle
})

export default connect(mapStateToProps)(BattleSliderComponent);
