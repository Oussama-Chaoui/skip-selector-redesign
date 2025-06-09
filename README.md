# Skip Selector Redesign

A modern, responsive revamp of the “Choose Your Skip Size” page from WeWantWaste.co.uk—built in React with Vite and Tailwind CSS, featuring both timeline and grid layouts, light/dark modes, and an interactive skip-recommendation chatbot.

## Demo

Check out a live version here:  
[View the Demo](https://oussama-chaoui.github.io/skip-selector-redesign/)

## Preview

![Timeline View](./screenshots/timeline-view.png)  
![Grid View](./screenshots/grid-view.png)  
![Chatbot Recommendation](./screenshots/chatbot.png)  

## Features

- **Timeline View**  
  A horizontal timeline UI to browse skip sizes.
- **Grid View**  
  An enhanced grid layout for side-by-side comparison.
- **Light & Dark Themes**  
  Toggleable themes powered by Tailwind v4 defaults.
- **Skip Recommendation Bot**  
  A small chatbot (using `react-chatbot-kit`) to guide users toward the right skip.
- **Fully Responsive**  
  Optimized for mobile and desktop browsers.

## Design Process

1. **Analysis & Inspiration**  
   Reviewed the original grid-based design, then brainstormed alternative layouts with ChatGPT and DeepSeek.  
2. **Timeline Concept**  
   Settled on a timeline format for clarity and visual interest, and implemented it in React.  
3. **Theme Support**  
   Added light and dark modes to match Tailwind CSS v4’s default theming with Vite.  
4. **Intelligent Guidance**  
   Built a mini chatbot to help users choose the correct skip size when they’re unsure.  
5. **Grid Enhancement**  
   After the timeline was complete, revisited the original grid to apply improvements and compare both approaches.

## Tech Stack

- **Framework:** React 19.1 + Vite  
- **Styling:** Tailwind CSS 4.1  
- **Animation:** Framer Motion  
- **Icons:** Lucide React  
- **Viewport:** react-intersection-observer  
- **Tilt Effects:** tilt.js  
- **Chatbot:** react-chatbot-kit  

### Dependencies

```jsonc
{
  "dependencies": {
    "@tailwindcss/vite": "^4.1.8",
    "framer-motion": "^12.16.0",
    "lucide-react": "^0.513.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-chatbot-kit": "^2.2.2",
    "react-intersection-observer": "^9.16.0",
    "tailwindcss": "^4.1.8",
    "tilt.js": "^1.2.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.4.1",
    "@eslint/js": "^9.25.0",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.30.1",
    "vite": "^6.3.5"
  }
}
