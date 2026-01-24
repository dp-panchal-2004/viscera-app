// src/styles/globalStyles.ts
import { Theme } from '@/src/theme';
import { StyleSheet } from 'react-native';

export const createGlobalStyles = (theme: Theme) =>
    StyleSheet.create({
        formLabel: {
            color: theme.palette.text.primary,
            marginBottom: 8,
            ...theme.typography.body1,
        },

    });
