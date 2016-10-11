// Inspired by https://github.com/airbnb/javascript but less opinionated.

// We use eslint-loader so even warnings are very visibile.
// This is why we only use "WARNING" level for potential errors,
// and we don't use "ERROR" level at all.

// In the future, we might create a separate list of rules for production.
// It would probably be more strict.

const ENV = process.env.NODE_ENV || 'development';
const isProduction = Number(ENV === 'production');

const OFF = 0;
const RECOMMENDED = 1;
const WARNING = 1 + isProduction;
const CRITICAL = 2;

module.exports = {
    root: true,

    parser: 'babel-eslint',

    // import plugin is termporarily disabled, scroll below to see why
    plugins: ['react', 'ava'],
    extends: "plugin:ava/recommended",

    env: {
        es6: true,
        commonjs: true,
        browser: true,
        node: true
    },

    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            generators: true,
            experimentalObjectRestSpread: true
        }
    },

    settings: {
        'import/ignore': [
            'node_modules',
            '\\.(json|css|jpg|png|gif|eot|svg|ttf|woff|woff2|mp4|webm)$',
        ],
        'import/extensions': ['.js'],
        'import/resolver': {
            node: {
                extensions: ['.js', '.json']
            }
        }
    },

    rules: {
        // http://eslint.org/docs/rules/
        'array-callback-return': CRITICAL,
        'block-scoped-var': WARNING,
        'class-methods-use-this': WARNING,
        'consistent-return': RECOMMENDED,
        'curly': OFF,
        'default-case': [WARNING, {commentPattern: '^no default$'}],
        'dot-location': [WARNING, 'property'],
        'dot-notation': WARNING,
        'eqeqeq': [WARNING, 'allow-null'],
        'guard-for-in': WARNING,
        'no-alert': RECOMMENDED,
        'no-array-constructor': WARNING,
        'no-caller': WARNING,
        'no-catch-shadow': WARNING,
        'no-cond-assign': [CRITICAL, 'always'],
        'no-console': WARNING,
        'no-control-regex': WARNING,
        'no-debugger': WARNING,
        'no-delete-var': CRITICAL,
        'no-dupe-args': WARNING,
        'no-dupe-keys': CRITICAL,
        'no-duplicate-case': WARNING,
        'no-else-return': RECOMMENDED,
        'no-empty': WARNING,
        'no-empty-character-class': WARNING,
        'no-empty-function': WARNING,
        'no-empty-pattern': WARNING,
        'no-eq-null': WARNING,
        'no-eval': CRITICAL,
        'no-ex-assign': WARNING,
        'no-extend-native': WARNING,
        'no-extra-bind': WARNING,
        'no-extra-label': WARNING,
        'no-fallthrough': WARNING,
        'no-func-assign': CRITICAL,
        'no-global-assign': CRITICAL,
        'no-implicit-globals': CRITICAL,
        'no-implied-eval': CRITICAL,
        'no-invalid-regexp': WARNING,
        'no-invalid-this': CRITICAL,
        'no-inner-declarations': WARNING,
        'no-iterator': WARNING,
        'no-label-var': CRITICAL,
        'no-labels': [WARNING, {allowLoop: false, allowSwitch: false}],
        'no-lone-blocks': WARNING,
        'no-loop-func': WARNING,
        'no-magic-numbers': OFF,
        'no-mixed-operators': [WARNING, {
            groups: [
                ['+', '-', '*', '/', '%', '**'],
                ['&', '|', '^', '~', '<<', '>>', '>>>'],
                ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                ['&&', '||'],
                ['in', 'instanceof']
            ],
            allowSamePrecedence: false
        }],
        'no-multi-spaces': RECOMMENDED,
        'no-multi-str': WARNING,
        'no-native-reassign': WARNING,
        'no-negated-in-lhs': WARNING,
        'no-new': WARNING,
        'no-new-func': WARNING,
        'no-new-object': WARNING,
        'no-new-symbol': WARNING,
        'no-new-wrappers': WARNING,
        'no-obj-calls': WARNING,
        'no-octal': WARNING,
        'no-octal-escape': WARNING,
        'no-proto': CRITICAL,
        'no-redeclare': CRITICAL,
        'no-regex-spaces': CRITICAL,
        'no-restricted-syntax': [
            WARNING,
            'LabeledStatement',
            'WithStatement',
        ],
        'no-return-assign': WARNING,
        'no-script-url': WARNING,
        'no-self-assign': WARNING,
        'no-self-compare': WARNING,
        'no-sequences': WARNING,
        'no-shadow': CRITICAL,
        'no-shadow-restricted-names': WARNING,
        'no-sparse-arrays': WARNING,
        'no-throw-literal': WARNING,
        'no-undef': WARNING,
        'no-undef-init': WARNING,
        'no-undefined': OFF,
        'no-unexpected-multiline': WARNING,
        'no-unreachable': WARNING,
        'no-unsafe-finally': WARNING,
        'no-unused-expressions': WARNING,
        'no-unused-labels': WARNING,
        'no-unused-vars': [WARNING, {vars: 'local', args: 'none'}],
        'no-use-before-define': [WARNING, 'nofunc'],
        'no-useless-call': CRITICAL,
        'no-useless-concat': WARNING,
        'no-useless-constructor': WARNING,
        'no-useless-escape': WARNING,
        'no-useless-rename': [WARNING, {
            ignoreDestructuring: false,
            ignoreImport: false,
            ignoreExport: false,
        }],
        'no-void': WARNING,
        'no-with': WARNING,
        'no-warning-comments': RECOMMENDED,
        'operator-assignment': [WARNING, 'always'],
        radix: WARNING,
        'require-yield': WARNING,
        'rest-spread-spacing': [WARNING, 'never'],
        strict: [WARNING, 'never'],
        'unicode-bom': [WARNING, 'never'],
        'use-isnan': WARNING,
        'valid-typeof': WARNING,
        'vars-on-top': RECOMMENDED,
        'wrap-iife': [RECOMMENDED, 'outside'],

        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/

        // TODO: import rules are temporarily disabled because they don't play well
        // with how eslint-loader only checks the file you change. So if module A
        // imports module B, and B is missing a default export, the linter will
        // record this as an issue in module A. Now if you fix module B, the linter
        // will not be aware that it needs to re-lint A as well, so the error
        // will stay until the next restart, which is really confusing.

        // This is probably fixable with a patch to eslint-loader.
        // When file A is saved, we want to invalidate all files that import it
        // *and* that currently have lint errors. This should fix the problem.

        // 'import/default': WARNING,
        // 'import/export': WARNING,
        // 'import/named': WARNING,
        // 'import/namespace': WARNING,
        // 'import/no-amd': WARNING,
        // 'import/no-duplicates': WARNING,
        // 'import/no-extraneous-dependencies': WARNING,
        // 'import/no-named-as-default': WARNING,
        // 'import/no-named-as-default-member': WARNING,
        // 'import/no-unresolved': [WARNING, { commonjs: true }],

        // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
        'jsx-quotes': WARNING,
        'react/jsx-boolean-value': WARNING,
        'react/jsx-equals-spacing': [WARNING, 'never'],
        'react/jsx-handler-names': [WARNING, {
            eventHandlerPrefix: 'handle',
            eventHandlerPropPrefix: 'on',
        }],
        'react/jsx-no-bind': CRITICAL,
        'react/jsx-no-duplicate-props': [WARNING, {ignoreCase: true}],
        'react/jsx-no-undef': WARNING,
        'react/jsx-pascal-case': [WARNING, {
            allowAllCaps: true,
            ignore: [],
        }],
        'react/jsx-uses-react': WARNING,
        'react/jsx-uses-vars': WARNING,
        'react/no-deprecated': WARNING,
        'react/no-direct-mutation-state': WARNING,
        'react/no-is-mounted': CRITICAL,
        'react/no-string-refs': WARNING,
        'react/prefer-es6-class': CRITICAL,
        'react/prefer-stateless-function': CRITICAL,
        'react/react-in-jsx-scope': WARNING,
        'react/require-render-return': CRITICAL,
        'react/self-closing-comp': WARNING,
        'react/jsx-closing-bracket-location': RECOMMENDED,
        'react/jsx-wrap-multilines': WARNING,
        'react/prop-types': RECOMMENDED,
        'react/sort-comp': RECOMMENDED,

        // style
        'block-spacing': [RECOMMENDED, 'always'],
        'brace-style': RECOMMENDED,
        'camelcase': WARNING,
        'comma-dangle': WARNING,
        'comma-spacing': WARNING,
        'consistent-this': [WARNING, 'self'],
        'func-call-spacing': WARNING,
        'func-names': RECOMMENDED,
        'linebreak-style': CRITICAL,
        'keyword-spacing': RECOMMENDED,
        'indent': [RECOMMENDED, 4],
        'no-lonely-if': RECOMMENDED,
        'new-cap': [WARNING, {newIsCap: true}],
        'new-parens': CRITICAL,
        'no-mixed-spaces-and-tabs': RECOMMENDED,
        'no-multiple-empty-lines': RECOMMENDED,
        'no-trailing-spaces': RECOMMENDED,
        'no-unneeded-ternary': WARNING,
        'no-whitespace-before-property': WARNING,
        'semi': [RECOMMENDED, 'always'],
        'quotes': [RECOMMENDED, 'single'],
        'spaced-comment': [RECOMMENDED, 'always'],
        'space-before-blocks': [RECOMMENDED, 'always'],
        'space-before-function-paren': [RECOMMENDED, 'never'],

        // ES6
        'arrow-body-style': [RECOMMENDED, 'as-needed'],
        'arrow-parens': [RECOMMENDED, 'as-needed'],
        'arrow-spacing': [RECOMMENDED, {'before': true, 'after': true}],
        'constructor-super': WARNING,
        'generator-star-spacing': [RECOMMENDED, {'before': false, 'after': true}],
        'no-confusing-arrow': RECOMMENDED,
        'no-useless-computed-key': WARNING,
        'no-this-before-super': WARNING,
        'no-duplicate-imports': RECOMMENDED,
        'no-dupe-class-members': CRITICAL,
        'no-const-assign': CRITICAL
    }
};
