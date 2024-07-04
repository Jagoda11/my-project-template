/* eslint-disable @typescript-eslint/no-unused-vars */
import * as childProcess from 'child_process'
import * as fs from 'fs'
import * as readline from 'readline'

function executeCommand(command: string, dir: string) {
  return new Promise<void>((resolve, reject) => {
    childProcess.exec(command, { cwd: dir }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ ${stderr}`)
        reject(error)
      } else {
        console.log(`✅ ${stdout}`)
        resolve()
      }
    })
  })
}

function askQuestion(query: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise<string>((resolve) =>
    rl.question(query, (ans) => {
      rl.close()
      resolve(ans)
    }),
  )
}

function setupEslintAndTsconfig(
  dir: string,
  tsconfigName: string,
  framework: string,
) {
  // Ensure the directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(`${dir}/.eslintrc.yml`)) {
    let eslintContent = 'extends: eslint:recommended'
    if (dir === './backend') {
      eslintContent = `
  env:
    node: true
    es2021: true
    jest: true
  extends:
    - eslint:recommended
    - plugin:@typescript-eslint/recommended
    - plugin:jest/recommended
    - plugin:import/errors
    - plugin:import/warnings
    - plugin:prettier/recommended
  parser: '@typescript-eslint/parser'
  parserOptions:
    ecmaVersion: latest
    sourceType: 'module'
  plugins:
    - '@typescript-eslint'
    - jest 
    - import
  rules:
    'no-shadow': 'error'
    'prettier/prettier': 'error'
    'eqeqeq':
      - 'error'
      - 'always'
    'curly':
      - 'error'
      - 'all'
    'no-unused-vars': 'warn'
    'no-redeclare': 'error'
    'prefer-const': 'error'
    'no-var': 'error'
    'global-require': 'warn'
    'handle-callback-err': 'warn'
    'no-buffer-constructor': 'warn'
    'no-new-require': 'warn'
    'no-path-concat': 'warn'
    '@typescript-eslint/no-explicit-any': 'warn'
    'import/order':
      - 'error'
      - groups: ['builtin', 'external', 'internal','parent', 'sibling', 'index']
        newlines-between: 'always'
        alphabetize:
          order: 'asc'
          caseInsensitive: true
    'consistent-return': 'error'
    'no-unused-expressions': 'warn'
    'no-useless-constructor': 'warn'
      `
    } else if (dir === './frontend') {
      if (framework === 'react') {
        eslintContent = `
env:
  browser: true
  es2021: true
  jest: true
extends:
  - eslint:recommended
  - plugin:react/recommended
  - plugin:@typescript-eslint/recommended
  - plugin:jest/recommended
  - plugin:prettier/recommended 
parser: '@typescript-eslint/parser'
parserOptions:
  ecmaVersion: latest
  sourceType: 'module'
plugins:
  - '@typescript-eslint'
  - jest
  - prettier 
  - react-hooks
rules:
  prettier/prettier: 'error'  # Enforce Prettier formatting
  react/jsx-filename-extension:
    - 1
    - { extensions: ['.tsx'] }  # Enforce the use of .tsx extension for JSX files
  react/react-in-jsx-scope: 'off'  # Not needed with React 17+
  '@typescript-eslint/explicit-module-boundary-types': 'warn'  # Ensure functions have explicit return types
  '@typescript-eslint/no-unused-vars': 'warn'  # Warn about unused variables
  '@typescript-eslint/no-explicit-any': 'warn'  # Warn about usage of the any type
  'no-console': 'warn'
  'jest/no-disabled-tests': 'warn'  # Warn about disabled tests
  'jest/no-focused-tests': 'error'  # Error on focused tests
  'jest/no-identical-title': 'error'
  react-hooks/rules-of-hooks: 'error'
  react-hooks/exhaustive-deps: 'warn'
        `
      } else if (framework === 'angular') {
        eslintContent = `
      env:
        browser: true
        es2021: true
        jest: true
      extends:
        - eslint:recommended
        - plugin:@typescript-eslint/recommended
        - plugin:@angular-eslint/recommended
        - plugin:jest/recommended
        - plugin:prettier/recommended
        - plugin:rxjs/recommended
      parser: '@typescript-eslint/parser'
      parserOptions:
        ecmaVersion: latest
        sourceType: 'module'
        project: ['./tsconfig.json']  # Adjust if your project has multiple or different tsconfig files
      plugins:
        - '@typescript-eslint'
        - '@angular-eslint'
        - jest
        - prettier
      rules:
        prettier/prettier: 'error'
        '@typescript-eslint/explicit-module-boundary-types': 'warn'
        '@typescript-eslint/no-unused-vars': 'warn'
        '@typescript-eslint/no-explicit-any': 'warn'
        'no-console': 'warn'
        '@angular-eslint/component-selector':
          ['error', { type: 'element', prefix: 'app', style: 'kebab-case' }]
        '@angular-eslint/directive-selector':
          ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }]
          `
        // eslintContent for Angular
      } else if (framework === 'vue') {
        eslintContent = `
env:
  browser: true
  es2021: true
  jest: true
extends:
  - eslint:recommended
  - plugin:@typescript-eslint/recommended
  - plugin:vue/vue3-recommended
  - plugin:jest/recommended
  - plugin:prettier/recommended
parser: '@typescript-eslint/parser'
parserOptions:
  ecmaVersion: latest
  sourceType: 'module'
  extraFileExtensions: ['.vue']
  project: ['./tsconfig.json']  # Your tsconfig file
plugins:
  - '@typescript-eslint'
  - vue
  - jest
  - prettier
rules:
  prettier/prettier: 'error'
  '@typescript-eslint/explicit-module-boundary-types': 'warn'
  '@typescript-eslint/no-unused-vars': 'warn'
  '@typescript-eslint/no-explicit-any': 'warn'
  'no-console': 'warn'
  # Vue 3 specific rules
  'vue/no-unused-vars': 'warn'
  'vue/no-unused-components': 'warn'
  'vue/multi-word-component-names': 'error'
  'vue/component-tags-order': ['error', {
    'order': ['template', 'script', 'style']
  }]
  'vue/require-default-prop': 'off'
  'vue/require-explicit-emits': 'error'
  'vue/attribute-hyphenation': ['error', 'always', {
    'ignore': []
  }]` // eslintContent for Vue
      }
    }
    fs.writeFileSync(`${dir}/.eslintrc.yml`, eslintContent)
    console.log(`📝 Created .eslintrc.yml in ${dir}`)
  }

  if (!fs.existsSync(`${dir}/${tsconfigName}`)) {
    let tsconfigContent = '{ "compilerOptions": { "target": "ESNext" } }'
    if (tsconfigName === 'tsconfig.backend.json') {
      tsconfigContent = JSON.stringify(
        {
          compilerOptions: {
            target: 'ESNext',
            module: 'CommonJS',
            strict: true,
            outDir: './dist',
            rootDir: './src',
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            declaration: true,
            emitDeclarationOnly: true,
            allowJs: true, //to compile JavaScript files
            checkJs: true, //to check JavaScript files
          },
          include: ['src'],
          exclude: ['node_modules', '**/*.spec.ts', 'build'],
        },
        null,
        2,
      )
    } else if (tsconfigName === `tsconfig.${framework}.json`) {
      if (framework === 'react') {
        tsconfigContent = JSON.stringify(
          {
            compilerOptions: {
              target: 'ESNext',
              module: 'ESNext',
              lib: ['DOM', 'DOM.Iterable', 'ESNext'],
              allowJs: true,
              skipLibCheck: true,
              esModuleInterop: true,
              allowSyntheticDefaultImports: true,
              strict: true,
              forceConsistentCasingInFileNames: true,
              moduleResolution: 'node',
              resolveJsonModule: true,
              isolatedModules: true,
              noEmit: true,
              jsx: 'react-jsx',
            },
            include: ['src'],
            exclude: ['node_modules', '**/*.spec.ts', 'build'],
          },
          null,
          2,
        ) // tsconfigContent for React
      } else if (framework === 'angular') {
        tsconfigContent = JSON.stringify(
          {
            compilerOptions: {
              target: 'ESNext',
              module: 'ESNext',
              lib: ['DOM', 'ESNext'],
              allowJs: true,
              skipLibCheck: true,
              esModuleInterop: true,
              allowSyntheticDefaultImports: true,
              strict: true,
              forceConsistentCasingInFileNames: true,
              moduleResolution: 'node',
              resolveJsonModule: true,
              isolatedModules: true,
              noEmit: true,
              experimentalDecorators: true,
              emitDecoratorMetadata: true,
            },
            include: ['src'],
            exclude: ['node_modules', '**/*.spec.ts', 'build'],
          },
          null,
          2,
        ) // tsconfigContent for Angular
      } else if (framework === 'vue') {
        tsconfigContent = JSON.stringify(
          {
            compilerOptions: {
              target: 'ESNext',
              module: 'ESNext',
              lib: ['DOM', 'ESNext'],
              allowJs: true,
              skipLibCheck: true,
              esModuleInterop: true,
              allowSyntheticDefaultImports: true,
              strict: true,
              forceConsistentCasingInFileNames: true,
              moduleResolution: 'node',
              resolveJsonModule: true,
              isolatedModules: true,
              noEmit: true,
              jsx: 'preserve',
            },
            include: ['src'],
            exclude: ['node_modules', '**/*.spec.ts', 'build'],
          },
          null,
          2,
        ) // tsconfigContent for Vue
      }
    }
    fs.writeFileSync(`${dir}/${tsconfigName}`, tsconfigContent)
    console.log(`📝 Created ${tsconfigName} in ${dir}`)
  }
}

async function setupFrontend() {
  try {
    const shouldSetupFrontend = await askQuestion(
      '🖥️ Do you want to setup a frontend (yes/no)? ',
    )

    if (
      shouldSetupFrontend.toLowerCase() !== 'yes' &&
      shouldSetupFrontend.toLowerCase() !== 'y'
    ) {
      return
    }

    type FrontendFrameworks = {
      [key: string]: 'react' | 'angular' | 'vue'
    }
    const frontendFrameworks: FrontendFrameworks = {
      r: 'react',
      react: 'react',
      a: 'angular',
      angular: 'angular',
      v: 'vue',
      vue: 'vue',
    }

    const frontend = await askQuestion(
      '🔧 Which frontend framework do you want to install (React/Angular/Vue)? ',
    )
    const frontendLower = frontend.toLowerCase()

    if (
      !Object.prototype.hasOwnProperty.call(frontendFrameworks, frontendLower)
    ) {
      console.error(
        '❌ Invalid framework. Please enter React, Angular, or Vue.',
      )
      return
    }

    const framework = frontendFrameworks[frontendLower]

    console.log(`🚀 Setting up ${framework} frontend...`)

    setupEslintAndTsconfig(
      './frontend',
      `tsconfig.${framework}.json`,
      framework,
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type NpmPackages = {
      [key in 'react' | 'angular' | 'vue']: {
        dependencies: string
        devDependencies: string
      }
    }

    const npmPackages: NpmPackages = {
      react: {
        dependencies:
          'react react-dom react-router-dom redux react-redux axios',
        devDependencies:
          '@types/react @types/react-dom @types/react-router-dom @types/react-redux eslint-plugin-react eslint-plugin-react-hooks',
      },
      angular: {
        dependencies:
          '@angular/core @angular/router @angular/forms @angular/material rxjs @ngrx/store',
        devDependencies:
          '@angular/cli @angular-eslint/eslint-plugin jest @types/jest jest-preset-angular eslint-plugin-rxjs',
      },
      vue: {
        dependencies: 'vue',
        devDependencies: 'eslint-plugin-vue vite',
      },
    }

    await executeCommand(
      `npm install ${npmPackages[framework].dependencies} --legacy-peer-deps`,
      './frontend',
    )
    await executeCommand(
      `npm install --save-dev ${npmPackages[framework].devDependencies} --legacy-peer-deps`,
      './frontend',
    )

    if (framework === 'vue') {
      const viteConfigContent = `
        import { defineConfig } from 'vite'
        import vue from '@vitejs/plugin-vue'
        import typescript from '@rollup/plugin-typescript'
        
        export default defineConfig({
          plugins: [vue(), typescript()],
        })
      `

      fs.writeFileSync('./frontend/vite.config.js', viteConfigContent)
      console.log('📝 Created vite.config.js in ./frontend')
    }
  } catch (error) {
    console.error(`❌ Error setting up frontend: ${error}`)
  }
}
const cssFrameworks: { [key: string]: { [key: string]: string } } = {
  b: {
    react: 'bootstrap',
    angular: 'bootstrap',
    vue: 'bootstrap',
  },
  bootstrap: {
    react: 'bootstrap',
    angular: 'bootstrap',
    vue: 'bootstrap',
  },
  t: {
    react: 'tailwindcss postcss autoprefixer',
    angular: 'tailwindcss postcss autoprefixer',
    vue: 'tailwindcss postcss autoprefixer',
  },
  tailwind: {
    react: 'tailwindcss postcss autoprefixer',
    angular: 'tailwindcss postcss autoprefixer',
    vue: 'tailwindcss postcss autoprefixer',
  },
  s: {
    react: 'semantic-ui-react semantic-ui-css',
    angular: '@angular-ex/semantic-ui',
    vue: 'semantic-ui-vue',
  },
  semantic: {
    react: 'semantic-ui-react semantic-ui-css',
    angular: '@angular-ex/semantic-ui',
    vue: 'semantic-ui-vue',
  },
  m: {
    react: '@material-ui/core',
    angular: '@angular/material',
    vue: 'vue-material',
  },
  'material-ui': {
    react: '@material-ui/core',
    angular: '@angular/material',
    vue: 'vue-material',
  },
}

async function setupCSSFramework() {
  try {
    const frontendFramework = await askQuestion(
      '🔧 Which frontend framework are you using (React/Angular/Vue)? ',
    )
    const cssFramework = await askQuestion(
      '🎨 Which CSS framework would you like to use? (B/Bootstrap, T/Tailwind, S/Semantic, M/Material-UI, N/None): ',
    )
    const cssFrameworkLower = cssFramework.toLowerCase()

    if (
      !Object.prototype.hasOwnProperty.call(cssFrameworks, cssFrameworkLower)
    ) {
      console.log('❌ Invalid option. No CSS framework will be installed.')
      return
    }
    const cssPackages =
      cssFrameworks[cssFrameworkLower][frontendFramework.toLowerCase()]
    await executeCommand(
      `npm install ${cssPackages} --legacy-peer-deps`,
      './frontend',
    )
    console.log(`🎨 ${cssFramework} installed.`)
  } catch (error) {
    console.error(`❌ Error setting up CSS framework: ${error}`)
  }
}

async function setupBackend() {
  try {
    const shouldSetupBackend = await askQuestion(
      '🖥️ Do you want to setup a backend (yes/no)? ',
    )

    if (
      shouldSetupBackend.toLowerCase() !== 'yes' &&
      shouldSetupBackend.toLowerCase() !== 'y'
    ) {
      return
    }

    console.log('🚀 Setting up Node.js backend...')

    setupEslintAndTsconfig('./backend', 'tsconfig.backend.json', '')

    await executeCommand('npm install express', './backend')
  } catch (error) {
    console.error(`❌ Error setting up backend: ${error}`)
  }
}

;(async () => {
  try {
    await setupFrontend()
    await setupCSSFramework()
    await setupBackend()
  } catch (error) {
    console.error(`❌ Error setting up project: ${error}`)
  }
})()
