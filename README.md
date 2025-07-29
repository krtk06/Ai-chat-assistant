
AI Chat Assistant 

Description :

An AI Chat Assistant application built using HTML, CSS, React, and TypeScript, integrated with the OpenAI API. This app allows users to interact in real-time with a smart AI-powered assistant, delivering instant responses through a modern, responsive, and user-friendly interface. It demonstrates advanced front-end development along with AI integration.

Features:

Real-time chat with AI assistant using OpenAI API.\
Interactive UI built with React for seamless updates.\
TypeScript for type safety and maintainability.\
Responsive design using CSS for accessibility on various devices.\
State management for handling conversations and user inputs.\
Easily extensible for adding more AI capabilities or UI enhancements.\

Technologies Used:

React\
TypeScript\
HTML5 & CSS3\
OpenAI API\

Usage :

Open the app in your browser (usually at http://localhost:3000)\
Type your messages to chat with the AI assistant\
Get fast, smart responses powered by OpenAI models\

Notes :

Ensure you have a valid OpenAI API key to enable AI functionality.\
This project is a front-end focused implementation demonstrating AI integration with React and TypeScript.****\

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
