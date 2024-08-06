# TIDS Engagement Web App

This repository contains the source code for the TIDS Engagement Web Application. The application is built using React and MUI (Material-UI), and includes various libraries for state management, routing, API communication, and more.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Build and Deployment](#build-and-deployment)
- [Forking the Repository](#forking-the-repository)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [DevDependencies](#devdependencies)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/).
- You have a basic understanding of React and JavaScript.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/tids-engagement-web-app.git
   ```

2. Change into the project directory:

   ```sh
   cd tids-engagement-web-app
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

## Running the Application

To run the application in development mode:

```sh
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Build and Deployment

To create a production build of the application:

```sh
npm run build:prod
```

The build will be stored in the `build/` directory.

## Forking the Repository

To fork this repository and make your own changes:

1. Navigate to the [repository](https://github.com/your-username/tids-engagement-web-app) on GitHub.
2. Click the "Fork" button at the top right of the page.
3. Clone your forked repository to your local machine:
   ```sh
   git clone https://github.com/your-username/tids-engagement-web-app.git
   ```
4. Create a new branch for your feature or bug fix:
   ```sh
   git checkout -b your-branch-name
   ```
5. Make your changes and commit them:
   ```sh
   git commit -m "Your commit message"
   ```
6. Push your changes to GitHub:
   ```sh
   git push origin your-branch-name
   ```
7. Create a pull request from your branch to the original repository.

## Project Structure

The project structure is as follows:

```
tids-engagement-web-app/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   ├── containers/
│   ├── pages/
│   ├── redux/
│   ├── services/
│   ├── styles/
│   ├── utils/
│   └── index.js
├── .env
├── .eslintrc.js
├── .prettierrc
├── package.json
├── README.md
└── yarn.lock
```

## Available Scripts

In the project directory, you can run the following scripts:

- `npm start`: Runs the app in development mode.
- `npm run start:prod`: Runs the app in production mode.
- `npm run start:test`: Runs the app in testing mode.
- `npm run build:prod`: Builds the app for production.
- `npm run build:test`: Builds the app for testing.
- `npm run build:dev`: Builds the app for development.
- `npm test`: Launches the test runner.
- `npm run eject`: Ejects the project configuration.
- `npm run lint`: Lints the project files.
- `npm run lint:fix`: Lints and fixes the project files.
- `npm run format`: Formats the project files.

## Dependencies

- `@emotion/react`
- `@emotion/styled`
- `@fortawesome/fontawesome-svg-core`
- `@fortawesome/free-solid-svg-icons`
- `@fortawesome/react-fontawesome`
- `@mui/icons-material`
- `@mui/material`
- `@mui/x-charts`
- `@reduxjs/toolkit`
- `@telus-uds/components-web`
- `@telus-uds/ds-allium`
- `@telus-uds/palette-allium`
- `@telus-uds/theme-allium`
- `@testing-library/jest-dom`
- `@testing-library/react`
- `@testing-library/user-event`
- `axios`
- `bootstrap`
- `bootstrap-icons`
- `chart.js`
- `env-cmd`
- `jwt-decode`
- `moment-timezone`
- `multer`
- `nanoid`
- `papaparse`
- `query-string`
- `react`
- `react-bootstrap`
- `react-chartjs-2`
- `react-datepicker`
- `react-dom`
- `react-icons`
- `react-notifications-component`
- `react-redux`
- `react-router-dom`
- `react-scripts`
- `styled-components`
- `typescript`
- `web-vitals`

## DevDependencies

- `@commitlint/cli`
- `@commitlint/config-conventional`
- `@types/chart.js`
- `@types/jest`
- `@types/node`
- `@types/papaparse`
- `@types/react`
- `@types/react-datepicker`
- `@types/react-dom`
- `@types/react-redux`
- `@types/styled-components`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `eslint`
- `eslint-config-prettier`
- `eslint-plugin-prettier`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `husky`
- `prettier`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
