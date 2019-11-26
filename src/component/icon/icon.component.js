import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const IconComponent = (props) => {
    if (props.font == 'fontawesome') {
        return (
            <FontAwesomeIcon
                name={props.name}
                size={props.size ? props.size : 24}
                color={props.focused ? props.tintColor : "#222222"}
            />
        )
    }

    return (
        <AntIcon
            name={props.name}
            size={props.size ? props.size : 24}
            color={props.focused ? props.tintColor : "#222222"}
        />
    )
}

export default IconComponent;
