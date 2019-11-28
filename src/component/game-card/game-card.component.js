import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
    Placeholder,
    PlaceholderLine,
    Fade,
} from "rn-placeholder";
import { widthPercentageToDP } from 'react-native-responsive-screen';

const IMAGE = 'https://preview.redd.it/h2iz05k9xsm11.jpg?width=960&crop=smart&auto=webp&s=b2ba90222ff111aab4a8b0effecdb1517c5c679c';

const GameCard = props => {
    if (props.loading) {
        return (
            <View style={styles.container} >
                <Placeholder
                    style={{ paddingRight: 20 }}
                    Animation={Fade}
                >
                    <PlaceholderLine style={styles.gameCardPlaceholder} />
                    <PlaceholderLine width={40} style={{ marginLeft: 12 }} />
                </Placeholder>
            </View>
        )
    }

    const game = props.game || {};
    return (
        <View style={styles.container} >
            <Image
                source={{ uri: game.thumbnail }}
                style={styles.gameCard}
            />
            <Text style={styles.text}>{game.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(35),
        alignItems: 'flex-start',
        marginRight: 20
    },
    gameCardPlaceholder: {
        height: 160,
        borderRadius: 5,
        resizeMode: 'cover',
        marginRight: 10,
        marginLeft: 10,
    },
    gameCard: {
        width: widthPercentageToDP(35),
        height: 160,
        borderRadius: 5,
        resizeMode: 'cover',
        marginRight: 10,
        marginLeft: 10,
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 15,
        marginTop: 5
    }
})

export default GameCard;
