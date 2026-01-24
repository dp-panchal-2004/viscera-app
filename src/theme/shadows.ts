import { Platform } from 'react-native';

export const shadows = {
    none: {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    normal: {
        ...Platform.select({
            ios: {
                shadowColor: '#00000008',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.08,
                shadowRadius: 26,
            },
            android: {
                elevation: 1,
            }
        })
    },
    x: {
        ...Platform.select({
            ios: {
                shadowColor: '#00000005',
                shadowOffset: { width: 4, height: 0 },
                shadowOpacity: 0.05,
                shadowRadius: 20,
            },
            android: {
                elevation: 1,
            }
        })
    },
    y: {
        ...Platform.select({
            ios: {
                shadowColor: '#00000005',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 20,
            },
            android: {
                elevation: 2,
            }
        })
    },
    big: {
        ...Platform.select({
            ios: {
                shadowColor: '#00000029',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.29,
                shadowRadius: 40,
            },
            android: {
                elevation: 8,
            }
        })
    }
};
