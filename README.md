
# A/B Testing Statistical Calculator

This is a web application for performing statistical analysis on A/B test results, built with React, TypeScript, and Express.

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── ui/       # Reusable UI components
│   │   │   ├── InfoCard.tsx          # Statistical concepts explanation
│   │   │   ├── ResultsCard.tsx       # Test results display
│   │   │   ├── SampleDataCard.tsx    # Sample data management
│   │   │   └── TestDataInput.tsx     # Test data input form
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility libraries
│   │   ├── pages/        # Page components
│   │   └── utils/        # Helper functions
│   └── index.html        # HTML entry point
│
├── server/                # Backend Express server
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data storage logic
│   └── vite.ts           # Vite configuration
│
├── shared/               # Shared code between client and server
│   └── schema.ts        # TypeScript type definitions
│
└── configuration files   # Various config files for TypeScript, Tailwind, etc.
```

## Key Components

### Frontend

- **ResultsCard**: Displays statistical analysis results with visualizations
- **InfoCard**: Provides explanations of statistical concepts
- **TestDataInput**: Form for entering A/B test data
- **UI Components**: Collection of reusable UI components built with Radix UI

### Backend

- **Express Server**: Handles API requests and data processing
- **Storage**: Manages data persistence
- **Routes**: Defines API endpoints for the application

## Technology Stack

- Frontend: React, TypeScript, TailwindCSS
- Backend: Express.js, TypeScript
- Build Tools: Vite
- UI Components: Radix UI primitives

## Development

The application runs on port 5000 in development mode. Use the following command to start the development server:

```bash
npm run dev
```
