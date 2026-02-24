import { Text, type TextProps } from 'react-native';

import { FONT_DEFAULT } from '@/constants/fonts';

export function AppText({
  style,
  ...rest
}: TextProps) {
  return (
    <Text
      style={[{ fontFamily: FONT_DEFAULT }, style]}
      {...rest}
    />
  );
}
