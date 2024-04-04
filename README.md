# 🚀 TypeScript Full-Stack Template

This project is a template for setting up a full-stack TypeScript application with a Node.js backend 🟩 and your choice of frontend framework: React ⚛️, Angular 🅰️, or Vue 🟢. 

This project includes pre-configured setups for:

- Babel 🐵
- TypeScript 🔵
- ESLint 🛠️
- Prettier 🖋️
- Jest 🃏
- Husky 🐶

## 🚀 Initial Setup

First, install the project dependencies:

```bash
npm install
```

Next, run the `setup-eslint` script to choose your frontend and backend frameworks:

```bash
npm run setup-eslint
```

This script will prompt you to choose a frontend framework (React ⚛️, Angular 🅰️, or Vue 🟢) and a backend framework is always Node. It will then install the necessary dependencies and configure the project for the chosen frameworks.

> ⚠️ **Important:** After the initial setup, manually delete the `setup-eslint.ts` file and its reference in the `package.json` scripts. 🗑️

## ⚠️ Note on Commits
If you're having trouble making a commit, it might be due to the `precommit` hook, which runs the `lint` and `test` scripts before each commit. If these scripts find any errors, the commit will be blocked. Check the output for any lint or test errors and fix them before trying to commit again.

## 📜 Scripts

To run these scripts, use `npm run <script-name>`:

- `start`: 🚀 Builds the TypeScript code and starts the application.
- `build`: 🔨 Compiles the TypeScript code using the TypeScript compiler (`tsc`).
- `test`: 🧪 Runs tests using Jest and generates a coverage report.
- `format`: 🖋️ Formats the code using Prettier.
- `lint`: 🧹 Lints all JavaScript and TypeScript files in the project using ESLint.
- `lint:root`: 🧹 Lints JavaScript and TypeScript files in the root directory, excluding the `frontend` and `backend` directories.
- `lint:frontend`: 🧹 Lints JavaScript and TypeScript files in the `frontend` directory.
- `lint:backend`: 🧹 Lints JavaScript and TypeScript files in the `backend` directory.
- `setup-eslint`: 🔧 Runs the setup script to choose the frontend and backend frameworks, install the necessary dependencies, and configure the project.
- `precommit`: 🔒 Runs the `lint` and `test` scripts before each commit to ensure code quality. This is managed by Husky 🐶.
- `pretest`: 🔍 Lints the code before running tests.
- `watch`: 👀 Runs tests in watch mode using Jest.
- `debug`: 🐞 Starts the application in debug mode using `nodemon`.
- `clean`: 🧽 Removes the `node_modules` directory and `package-lock.json` file.
- `prepare`: 🐾 Sets up Husky for managing git hooks.


## 💖 Support

If you appreciate my work and would like to support me, consider sponsoring me on [GitHub Sponsors](https://github.com/sponsors/[YourUsername]). Your support is greatly appreciated and helps me continue my contributions to open source and volunteer work.


## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md).
for details on our code of conduct and the process for submitting pull requests.

## 📜 Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

© 2024 Jagoda11

This README template provides a basic structure for documenting your projects. You can enhance and modify it for each new project based on the project's unique aspects and requirements.
