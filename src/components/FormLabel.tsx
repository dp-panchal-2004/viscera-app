// FormLabel.tsx
import React from 'react';
import { Text, TextProps } from 'react-native';

interface FormLabelProps extends TextProps {
    children: React.ReactNode;
    className?: string; // allow extra tailwind classes
}

const FormLabel: React.FC<FormLabelProps> = ({ children, className = '', ...rest }) => {
    return (
        <Text
            className={`text-text-primary font-semibold text-body2 mb-2 ${className}`}
            {...rest}>
            {children}
        </Text>
    );
};

export default FormLabel;
