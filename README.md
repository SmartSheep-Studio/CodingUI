# CodingUI

Front-end of CodingLand

**Currently in the alpha development stage(inner test), a lot of features are not implemented, very unstable, not recommend to deploy to product environment and public test!**

**We are looking for the translator!**

**Recommend use `pnpm` to manage package, use disk space efficient!**

## Start up

### Development

```bash
# ...start codingserve
pnpm i
pnpm dev
```

### Build

```bash
pnpm i
pnpm run build
# ...rename dist to ui
# ...copy ui to codingserve project root
```

## Project Structure

- `.vscode` settings for vscode
- `public` root of web page
- `src/assets` includes videos and images
- `src/compoments` useful compoments
- `src/layouts` templates for router view
- `src/routes` vue router configure files
- `src/stores` pinia configure files
- `src/utils` useful functions
- `src/views` page compoments

## Technology Stack

Vue3(Template and renderer) + Vue Router(Navigating everything) + Vite(Builder like webpack) + Pinia(Store user profile) + NaiveUI(Provide compoments) + CSS(Just pure css) + TypeScript(Better than javascript) + Piston(Code runner)