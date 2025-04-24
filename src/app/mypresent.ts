import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const MyPreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{rose.50}',
                    100: '{rose.100}',
                    200: '{rose.200}',
                    300: '{rose.300}',
                    400: '{rose.400}',
                    500: '{rose.500}',
                    600: '{rose.600}',
                    700: '{rose.700}',
                    800: '{rose.800}',
                    900: '{rose.900}',
                    950: '{rose.950}'
                }
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '{indigo.50}',
                    100: '{indigo.100}',
                    200: '{indigo.200}',
                    300: '{indigo.300}',
                    400: '{indigo.400}',
                    500: '{indigo.500}',
                    600: '{indigo.600}',
                    700: '{indigo.700}',
                    800: '{indigo.800}',
                    900: '{indigo.900}',
                    950: '{indigo.950}'
                }
            }
        }
    }
});
