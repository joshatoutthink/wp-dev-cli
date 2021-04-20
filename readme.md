# WP DEV CLI

A cli for wp code generation create wp boilerplate code, and add commonly used functions for wp development

## Install

```bash
yarn global add wp-gen
```

or

```bash
npm install -g wp-gen
```

## Commands

### Create a plugin

```bash
wp-gen create plugin <plugin-name>
```

this will give some prompts and will then scaffold out the plugin.

### Create a Theme

#### Parent theme

```bash
wp-gen create theme <theme-name>
```

#### Child Theme

```bash
wp-gen create theme <theme-name> --child-of <parent-theme-name>
```

### Create a custom endpoint

```bash
wp-gen create endpoint
```

this will give some prompts and will then scaffold out the Custom Endpoint.

### Add Custom Post type

```bash
wp-gen add cpt <cpt-name>
```

this will give some prompts and will then scaffold out the cpt.

### Add A Admin Page

```bash
wp-gen add admin page
```

this will give some prompts and will then scaffold out the Page.

### Add A Script or Style

```bash
wp-gen add script --type <script | style >
```

#### flags and Options

- `--is_admin` enqueue it on admin pages
- `--only-on`: pageID or `home` `post-type <post-type>`

### Add a component

```bash
wp-gen add component <component-name>
```
