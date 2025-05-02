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

  // Create eslint.config.mjs instead of .eslintrc.yml
  if (!fs.existsSync(`${dir}/eslint.config.mjs`)) {
    let eslintContent = `export default [
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      'no-unused-vars': 'warn',
    }
  }
];`

    if (dir === './backend') {
      eslintContent = `// ESLint flat config for backend
import typescript from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import jest from 'eslint-plugin-jest'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      'package-lock.json',
      '*.min.js',
      'coverage/',
      'build/',
    ],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        node: true,
        jest: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'jest': jest,
      'import': importPlugin,
      'prettier': prettier,
    },
    rules: {
      'no-shadow': 'error',
      'prettier/prettier': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-redeclare': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'global-require': 'warn',
      'handle-callback-err': 'warn',
      'no-buffer-constructor': 'warn',
      'no-new-require': 'warn',
      'no-path-concat': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          'alphabetize': {
            'order': 'asc',
            'caseInsensitive': true
          }
        }
      ],
      'consistent-return': 'error',
      'no-unused-expressions': 'warn',
      'no-useless-constructor': 'warn'
    }
  }
];`
    } else if (dir === './frontend') {
      if (framework === 'react') {
        eslintContent = `// ESLint flat config for React frontend
import typescript from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import jest from 'eslint-plugin-jest'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      'package-lock.json',
      '*.min.js',
      'coverage/',
      'build/',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.jsx'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        browser: true,
        jest: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'jest': jest,
      'prettier': prettier,
      'react': reactPlugin,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'react/jsx-filename-extension': [1, { 'extensions': ['.tsx'] }],
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
];`
      } else if (framework === 'angular') {
        eslintContent = `// ESLint flat config for Angular frontend
import typescript from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import angularEslint from '@angular-eslint/eslint-plugin'
import jest from 'eslint-plugin-jest'
import rxjsPlugin from 'eslint-plugin-rxjs'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      'package-lock.json',
      '*.min.js',
      'coverage/',
      'build/',
    ],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        browser: true,
        jest: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      '@angular-eslint': angularEslint,
      'jest': jest,
      'rxjs': rxjsPlugin,
      'prettier': prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      '@angular-eslint/component-selector': ['error', { 'type': 'element', 'prefix': 'app', 'style': 'kebab-case' }],
      '@angular-eslint/directive-selector': ['error', { 'type': 'attribute', 'prefix': 'app', 'style': 'camelCase' }]
    }
  }
];`
      } else if (framework === 'vue') {
        eslintContent = `// ESLint flat config for Vue frontend
import typescript from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import jest from 'eslint-plugin-jest'
import vuePlugin from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      'package-lock.json',
      '*.min.js',
      'coverage/',
      'build/',
    ],
  },
  {
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        project: ['./tsconfig.json'],
      },
      globals: {
        browser: true,
        jest: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'vue': vuePlugin,
      'jest': jest,
      'prettier': prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      'vue/no-unused-vars': 'warn',
      'vue/no-unused-components': 'warn',
      'vue/multi-word-component-names': 'error',
      'vue/component-tags-order': ['error', { 'order': ['template', 'script', 'style'] }],
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'error',
      'vue/attribute-hyphenation': ['error', 'always', { 'ignore': [] }]
    }
  }
];`
      }
    }
    fs.writeFileSync(`${dir}/eslint.config.mjs`, eslintContent)
    console.log(`📝 Created eslint.config.mjs in ${dir}`)
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
