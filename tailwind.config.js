// const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './index.html',
    './src/**/*.vue',
    './src/**/*.js'
  ],
  theme: {
	  extend: {
		  screens: {
			  'hd': '1920px',
			  'uhd': '2560px'
		  },
		//   variants: {
		// 	  opacity: ['group-hover']
		//   }
	  }
  }
}