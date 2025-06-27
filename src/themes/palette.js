/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
    return {
        mode: theme?.customization?.navType,
        common: {
            black: theme.colors?.darkPaper
        },
        formHeader6: {
            main: theme.colors?.grey800
        },
        subtitle3: {
            main: theme.colors?.subtitle3
        },
        testColors: {
            main: theme.colors?.tempYellow,
            blueText: theme.colors?.blueText,
            lightBlueBackground: theme.colors?.lightBlueBackground
        },
        primary: {
            light: theme.colors?.primaryLight,
            main: theme.colors?.primaryMain,
            dark: theme.colors?.primaryDark,
            200: theme.colors?.primary200,
            800: theme.colors?.primary800
        },
        secondary: {
            light: theme.colors?.secondaryLight,
            main: theme.colors?.secondaryMain,
            dark: theme.colors?.secondaryDark,
            200: theme.colors?.secondary200,
            800: theme.colors?.secondary800
        },
        error: {
            light: theme.colors?.errorLight,
            main: theme.colors?.errorMain,
            dark: theme.colors?.errorDark
        },
        orange: {
            light: theme.colors?.orangeLight,
            main: theme.colors?.orangeMain,
            dark: theme.colors?.orangeDark
        },
        warning: {
            light: theme.colors?.warningLight,
            main: theme.colors?.warningMain,
            dark: theme.colors?.warningDark
        },
        success: {
            light: theme.colors?.successLight,
            200: theme.colors?.success200,
            main: theme.colors?.successMain,
            dark: theme.colors?.successDark
        },
        grey: {
            50: theme.colors?.grey50,
            100: theme.colors?.grey100,
            500: theme.darkTextSecondary,
            600: theme.heading,
            700: theme.darkTextPrimary,
            900: theme.textDark
        },
        dark: {
            light: theme.colors?.darkTextPrimary,
            main: theme.colors?.darkLevel1,
            dark: theme.colors?.darkLevel2,
            800: theme.colors?.darkBackground,
            900: theme.colors?.darkPaper
        },
        text: {
            primary: theme.darkTextPrimary,
            secondary: theme.darkTextSecondary,
            dark: theme.textDark,
            hint: theme.colors?.grey100
        },
        background: {
            paper: theme.paper,
            default: theme.backgroundDefault,
            primary: theme.backgroundPrimary
        },
        borderColor: {
            light: theme.colors?.lightGrey
        },
        buttonText: {
            dark: theme.colors?.blackText
        },
        buttonColor: {
            yellow: theme.colors?.tempYellow,
            blue: theme.colors?.blue
        },
        headerBackgroundColor: {
            lightBlue: theme.colors?.lightBlueBackground,
            lightGrey: theme.colors?.lightGrayBackground,
            darkGrey: theme.colors?.darkGrayBackground
        },
        formBackgroundColor: {
            lightBlue: theme.colors?.whiteBlue
        },
        listViewCard: {
            borderColor: theme.colors?.blueBorderColor
        }
    };
}
