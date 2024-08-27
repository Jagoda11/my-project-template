# 🚀 TypeScript Full-Stack Template

![License](https://img.shields.io/github/license/Jagoda11/my-project-template?style=flat-square&color=blue)
![Open Issues](https://img.shields.io/github/issues/Jagoda11/my-project-template?style=flat-square&color=orange)
![Last Commit](https://img.shields.io/github/last-commit/Jagoda11/my-project-template/main?style=flat-square&color=blue)
![Build Status](https://github.com/Jagoda11/my-project-template/actions/workflows/🚀ci.yml/badge.svg?branch=main)
![TypeScript](https://img.shields.io/github/package-json/dependency-version/Jagoda11/my-project-template/dev/typescript?label=TypeScript)
![Build Status](https://github.com/Jagoda11/my-project-template/actions/workflows/⬆️npm-update.yml/badge.svg?branch=main)

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

This script will prompt you to choose a frontend framework (React ⚛️, Angular 🅰️, or Vue 🟢), css library and a backend framework is always Node. It will then install the necessary dependencies and configure the project for the chosen frameworks.

> ⚠️ **Important:** After the initial setup, manually delete the `setup-eslint.ts` file and its reference in the `package.json` scripts. Also, don't forget to remove the `FRAMEWORKS_GUIDE.md` file as it is no longer needed. 🗑️

To remove the setup script and its references after the initial setup, you can run the following command in your terminal:

```bash
rm ./setup-eslint.ts && sed -i '' '/"setup-eslint":/d' package.json && rm FRAMEWORKS_GUIDE.md && sed -i '' '/Frameworks Guide/d' README.md
```

> ⚠️ **Important:** After running the above command, make sure to update your `README.md` file to remove any scripts or references that are no longer needed. Also, remember to update the `CONTRIBUTING.md` file and any other files that contain a GitHub link to this project.

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

## 🤖 GitHub Actions Workflows

This template includes several GitHub Actions workflows that automate various tasks:

- `🚀ci.yml`: Runs your project's continuous integration (CI) tasks.
- `🔐close-merged-pull-requests.yml`: Automatically closes pull requests that have been merged.
- `⏳close-stale-issues-and-prs.yml`: Closes stale issues and pull requests.
- `🏷️label-new-pull-requests.yml`: Automatically adds labels to new pull requests.
-`🙏thank-contributors-on-issue-close.yml`: Thanks contributors when an issue they commented on is closed.
- `👋welcome-new-pull-requests.yml`: Posts a welcome message on new pull requests.
- `👋welcome.yml`: Posts a welcome message on new issues.
- `⬆️npm-update.yml`: runs every day and updates package.json with new versions of dependencies
- `🧹remove-stale-unmerged-branches.yml`: Remove stale unmerged branches
- `🧹remove-merged-branches.yml`: Remove merged Branches

These workflows use the `secrets.GITHUB_TOKEN` secret, which GitHub automatically creates for every repository. You can create a personal access token and add it as a secret in your repository. For more information, see [Creating and storing encrypted secrets](https://docs.github.com/en/actions/reference/encrypted-secrets).

## 🌐 GitHub Codespaces Support

This project includes a `.devcontainer.json` file which allows you to work on this project in a Docker container using [GitHub Codespaces](https://github.com/features/codespaces). This helps to maintain a consistent development environment, making it easier for you to collaborate with others without having to worry about individual setup.

GitHub Codespaces configures your development environment based on your project's needs using this file. When you create a new codespace for this project, the Codespaces environment is automatically configured as per the settings defined in `.devcontainer.json`.

To use GitHub Codespaces:

1. Navigate to the main page of the repository.
2. Click the Code button and then click "Open with Codespaces".
3. Click "+ New codespace".

Your development environment is now set up and running in a Docker container in the cloud. All commands you run in the Codespaces terminal will be executed inside the container. Any changes you make to the project will be reflected in the container and vice versa.

## 📚 Frameworks Guide

For more information on how to choose and work with different frontend and backend frameworks in this project, please read the [Frameworks Guide](FRAMEWORKS_GUIDE.md).

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

## 📖 Related Articles

For more insights and detailed guides, check out these related articles:

- [The Power of Project Templates: Boosting Efficiency in Development](https://medium.com/code-like-a-girl/the-power-of-project-templates-boosting-efficiency-in-development-1a61cb6bcdae)
- [How to Set Up a Template Repository on GitHub](https://medium.com/new-writers-welcome/how-to-set-up-a-template-repository-on-github-0e7446a46817)
