import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg viewBox="0 0 58 58" {...props}>
            <Path fill="#cc2e48" d="M29 55L0 19h58z" />
            <Path fill="#fc3952" d="M58 19H0L10 3h38z" />
            <Path fill="#f76363" d="M42.154 19L48 3H10l5.846 16z" />
            <Path fill="#f49a9a" d="M42 19L29 3 16 19z" />
            <Path fill="#cb465f" d="M15.846 19L29 55l13.154-36z" />
        </Svg>
    )
}

export default SvgComponent
