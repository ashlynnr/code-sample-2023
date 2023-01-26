# code-sample-2023

# What this is:

A code sample from a recent project of mine using React and Typescript. The task was to create multi-factor authentication for our users. I was responsible for the design as well!

This repo includes a common folder (representative of the UI component library) and a components folder (from the components folder in the main project). There's plenty to dig through if you want all of the context, or you can just look at the files I've linked below.

## Three files to look at

#### 1. The [main wrapper component](https://nodejs.org/) from the project's component library (Storybook)

- This is the base component of the Authorization Modal.
- It consists of the base styles that all auth modals the project will eventually use, and accepts properties for the header/content so that it can be customized.

#### 2. The [common phone authorization modal](https://nodejs.org/) from the main project

- This is one use case for the main wrapper component above.
- It includes project specific UI elements and styles, including the logo, input, and specific text.
-

#### 3. The [phone authorization form](https://nodejs.org/) from the main project

- This is where the actual logic happens (API calls, alterting data, etc.)
- This component uses the common phone modal above
- If it were up to me, we would be using redux for this project. Because we are using Context instead, the useContext() hook is used for state management, along with the useState() hook.

## Images

![Phone Modal](https://github.com/[username]/[reponame]/blob/[branch]/image.jpg?raw=true)
![Recovery Code Modal](https://github.com/[username]/[reponame]/blob/[branch]/image.jpg?raw=true)
![Challenge Modal](https://github.com/[username]/[reponame]/blob/[branch]/image.jpg?raw=true)
