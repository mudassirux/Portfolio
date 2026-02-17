# Portfolio

A modern, interactive portfolio website built with React, Vite, and Sanity CMS.

## Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Styled Components](https://styled-components.com/) & [Tailwind CSS](https://tailwindcss.com/)
- **Animations/Physics**: [Matter.js](https://brm.io/matter-js/)
- **CMS**: [Sanity](https://www.sanity.io/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Project Structure

```
/
├── src/                # Source code
│   ├── components/     # React components
│   ├── App.tsx         # Main application component
│   ├── constants.ts    # Configuration and constants
│   ├── types.ts        # TypeScript definitions
│   └── ...
├── sanity/             # Sanity Studio configuration
└── ...
```

## Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run development server:**

    ```bash
    npm run dev
    ```

3.  **Build for production:**

    ```bash
    npm run build
    ```

## Development

-   The application uses **Vite** for fast HMR and building.
-   Content is managed via **Sanity**. To start the Sanity Studio locally, run `npm run sanity`.
