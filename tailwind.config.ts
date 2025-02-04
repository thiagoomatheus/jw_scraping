import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	},
  	keyframes: {
  		accordionOpen: {
  			from: {
  				height: '0px'
  			},
  			to: {
  				height: 'var(--radix-accordion-content-height)'
  			}
  		},
  		accordionClose: {
  			from: {
  				height: 'var(--radix-accordion-content-height)'
  			},
  			to: {
  				height: '0px'
  			}
  		},
		hide: {
			from: { opacity: "1" },
			to: { opacity: "0" },
		},
		slideDownAndFade: {
			from: { opacity: "0", transform: "translateY(-6px)" },
			to: { opacity: "1", transform: "translateY(0)" },
		},
		slideLeftAndFade: {
			from: { opacity: "0", transform: "translateX(6px)" },
			to: { opacity: "1", transform: "translateX(0)" },
		},
		slideUpAndFade: {
			from: { opacity: "0", transform: "translateY(6px)" },
			to: { opacity: "1", transform: "translateY(0)" },
		},
			slideRightAndFade: {
			from: { opacity: "0", transform: "translateX(-6px)" },
			to: { opacity: "1", transform: "translateX(0)" },
		},
  
  	},
  	animation: {
  		accordionOpen: 'accordionOpen 150ms cubic-bezier(0.87, 0, 0.13, 1)',
  		accordionClose: 'accordionClose 150ms cubic-bezier(0.87, 0, 0.13, 1)',
		hide: "hide 150ms cubic-bezier(0.16, 1, 0.3, 1)",
		slideDownAndFade: "slideDownAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
		slideLeftAndFade: "slideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
		slideUpAndFade: "slideUpAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
		slideRightAndFade: "slideRightAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
