# 99tech Automation Exercise
This is sample automation project for demoblaze which is implemented in Playwright and TypeScript.

## Table of Contents
- [Structure](#structure)
- [Environment Setup](#environment-setup)
- [IDE](#ide)
- [Execution commands](#execution)

## Structure
This project applied Page Object Model (POM) with 3A pattern (Arrange - Action - Assert) with the below structure
```
Project Name
│── pages
|   |── fixtures: defines the inital setup.
|   |── login: contains loginPage with UI elements for Login page.
|   |── main: contains the main page class.
|   |── search: contains the search page class.
│   ├── basePage: define base page.
│── settings
│   ├── .env
│   │   ├── .env.local: defines the local environment variables.
│── tests: contains the list of automation tests.
│── readme: the instructions
```

## Environment Setup
- NodeJS version: v22+ (currently v22.19.0)

## IDE
- Visual Studio Code (VS Code)
- VSCode Playwright Extensions: https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright

## Execution
- All environment variables are defined in .env file located in `./settings/.env` folder</br>
- Install necessary node packages:
    ```
    npm install
    ```
- Install Playwright dependencies:
    ```
    npx playwright install
    ```
- Execute all tests:
    ```
    npx playwright test
    ```
- Execute test by tag:
    ```
    npx playwright test -g "@login"
    ```
- View the executed result
    ```
    npx playwright show-report
    ```