import { colors } from './colors';

export const getPalette = () => ({
    type: 'light',

    primary: {
        main: colors.primaryMain,
        light1: colors.primaryLight1,
        light2: colors.primaryLight2,
        light3: colors.primaryLight3,
        light4: colors.primaryLight4,
        light5: colors.primaryLight5,
    },

    secondary: {
        main: colors.secondaryMain,
        light1: colors.secondaryLight1,
        light2: colors.secondaryLight2,
        light3: colors.secondaryLight3,
        light4: colors.secondaryLight4,
    },

    action: {
        purpleDark: colors.actionPurpleDark,
        purpleLight: colors.actionPurpleLight,
        green: colors.actionGreen,
        red: colors.actionRed,
    },

    actionLight: {
        purple1: colors.actionLightPurple1,
        purple2: colors.actionLightPurple2,
        green: colors.actionLightGreen,
        red: colors.actionLightRed,
    },

    gery: {
        black: colors.black,
        darkGray: colors.darkGray,
        mediumGray: colors.mediumGray,
        lightGray: colors.lightGray,
        extraLightGray: colors.extraLightGray,
        white: colors.white,
    },

    text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
    },

    background: {
        default: colors.backgroundDefault,
    },
});

export const palette = getPalette();
