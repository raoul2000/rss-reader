# RSS Reader

This **really simple RSS reader** is a personal side project initiated for auto-educational purpose only,  around Typescript, React and companion libraries. If you're looking for a real RSS reader, your quest is not over ...

- [RSS Reader](#rss-reader)
  - [Features](#features)
  - [Preview](#preview)
  - [Base App](#base-app)
  - [Available Scripts](#available-scripts)
    - [`npm start`](#npm-start)
    - [`npm test`](#npm-test)
    - [`npm run build`](#npm-run-build)
    - [`npm run eject`](#npm-run-eject)
  - [Reference](#reference)
    - [Redux](#redux)
    - [About async data fetch](#about-async-data-fetch)
    - [Others](#others)


## Features

- [X] use TypeScript
- [X] 3 columns layout 
- [X] default list of RSS source
- [ ] add new RSS source
- [X] display RSS items list
- [X] display detail item
- more to come ... (maybe)

## Preview

![demo](./demo.gif)

## Base App
- Base App is create using [create-react-app with typescript](https://create-react-app.dev/docs/adding-typescript/) with Typescript template
```
npx create-react-app rss-reader --template typescript
```
## Available Scripts 

(extract from Create React App README.md)

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Reference
### Redux
- [Redux](https://redux.js.org/)
- [React Redux](https://react-redux.js.org/)
- [Redux DevTools Extension](http://extension.remotedev.io/)

### About async data fetch
- [How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data)
- [Hook: useFetch](https://use-http.com)
- [react-async-utils](https://github.com/CarlosGines/react-async-utils)

### Others
- [How the useEffect Hook Works (with Examples)](https://daveceddia.com/useeffect-hook-examples/)
- [React & Redux in TypeScript - Complete Guide](https://github.com/piotrwitek/react-redux-typescript-guide)
- [Reselect: a selector library](https://github.com/reduxjs/reselect#motivation-for-memoized-selectors)
