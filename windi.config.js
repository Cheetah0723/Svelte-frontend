import { defineConfig } from 'windicss/helpers';
import plugin from 'windicss/plugin';

export default defineConfig({
	darkMode: 'class', // or 'media'
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#2563EB',
					'primary-focus': '#4506cb',
					'primary-content': '#ffffff',
					secondary: '#f000b8',
					'secondary-focus': '#bd0091',
					'secondary-content': '#ffffff',
					accent: '#37cdbe',
					'accent-focus': '#2aa79b',
					'accent-content': '#ffffff',
					neutral: '#3d4451',
					'neutral-focus': '#1E40AF',
					'neutral-content': '#ffffff',
					'base-100': '#ffffff',
					'base-200': '#f9fafb',
					'base-300': '#d1d5db',
					'base-content': '#1f2937',
					info: '#2094f3',
					success: '#009485',
					warning: '#ff9900',
					error: '#ff5724'
				}
			}
		]
	},
	theme: {
		extend: {
			backdropBrightness: ['hover', 'focus']
			// fontFamily: {
			// 	sans: ['Graphik', 'sans-serif'],
			// 	serif: ['Merriweather', 'serif']
			// },
		}
	},
	plugins: [
		plugin(({ addUtilities }) => {
			const newUtilities = {
				'.skew-10deg': {
					transform: 'skewY(-10deg)'
				},
				'.skew-15deg': {
					transform: 'skewY(-15deg)'
				}
			};
			addUtilities(newUtilities);
		}),
		plugin(({ addDynamic, variants }) => {
			addDynamic(
				'skew',
				({ Utility, Style }) => {
					return Utility.handler
						.handleStatic(Style('skew'))
						.handleNumber(0, 360, 'int', (number) => `skewY(-${number}deg)`)
						.createProperty('transform');
				},
				variants('skew')
			);
		}),
		require('daisyui'),
		require('windicss/plugin/filters'),
		require('windicss/plugin/forms'),
		require('windicss/plugin/aspect-ratio'),
		require('windicss/plugin/line-clamp'),
		require('windicss/plugin/typography')({
			modifiers: ['DEFAULT', 'sm', 'lg', 'red']
		})
	]
});
