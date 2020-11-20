# React Typescript Webpack starter

> Minimal starter with hot module replacement (HRM) for development

### Installation

1. Clone/download repo
2. Remove origin with `git remote remove origin`
3. Create a new github repository
4. Connect a new github repository with `git remote add origin <repo-link>`
5. Push and finished setup to new repo with
```
    git branch -M main
    git push -u origin main
```
6. Go to the folder application using cd command on your cmd or terminal
7. Run `yarn install`

### Usage

**Development**

Build app continuously (HRM enabled). App served `http://localhost:9001`

-   Copy `.env.example` file to `.env.development` on the root folder.
-   Open your `.env.development` file and change the values to your needs
-   Run `yarn run dev`

**Production**

Build app once (HRM disabled) to `/dist/`. App served `http://localhost:9000`

-   Copy `.env.example` file to `.env` on the root folder
-   Open your `.env.development` file and change the values to your needs
-   Run `yarn run build`
