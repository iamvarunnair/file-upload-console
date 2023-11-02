# file-upload

## Table of Contents

-   [About](#about)
-   [About](#features)
-   [Technology](#technology)
-   [Getting Started](#getting_started)
-   [Usage](#usage)
-   [To do](#todo)
-   [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

A simple file upload system with node on the backend and react on the frontend.

-   Express used to create node server.
-   Files are stored in the system space. Alternative was using AWS S3
-   File preview support:
    -   Text: inside html
    -   Image: native html img tag
    -   Pdf: native html embed tag
    -   Audio: native html audio tag
    -   Video: native html video tag
    -   HTML: native html iframe tag
    -   JSON: native pre tag with JSON.stringify(json, null, 4)
    -   Excel, DOC: support through file conversion to pdf and then pdf preview

## Features <a name = "features"></a>

-   List uploaded files
-   Preview uploaded files. Supported types:

    -   .pdf
    -   images: .apng, .gif, .ico, .cur, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .svg
    -   .txt
    -   document: .doc, .docx
    -   .html
    -   excel: .xlsx, xls
    -   audio: .mp3, .wav, and .ogg.
    -   video: .mp4, .webm, and .ogg.
    -   .json

-   Download files
-   Upload files

## Technology <a name = "technology"></a>

-   [Node](https://nodejs.org/en)
-   [Express](https://expressjs.com/)
-   [React](https://react.dev/)
-   [Vite](https://vitejs.dev/)
-   [Libreoffice-convert](https://www.npmjs.com/package/libreoffice-convert)
-   [Libreoffice](https://www.libreoffice.org/)

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Install required packages for development

```sh
> cd client-app && npm i && cd .. && npm i
```

Create a build of client-app and start a node server to serve both BE and FE.

```sh
> npm run build
```

### Prerequisites

System (server) installation needed for:

-   Node
-   Vite
-   Libre office

### Installing

Environment: dev client, separate terminal at the root, running at localhost:3000

```
>  npm run start-client
```

Environment: dev server, separate terminal at the root, running at localhost:5173

```
>  npm run start
```

Environment: UAT, single command for both server and client, first client is build and then server starts serving at the same port as server on index route: 3000

```
> npm run start start-build
```

End with an example of getting some data out of the system or using it for a little demo.

## Usage <a name = "usage"></a>

Add notes about how to use the system.

## To do <a name = "todo"></a>

-   Explore alternative of using google/ms office doc viewer API, can be tested only on deployed server. Free deployments can also be used like [Serveo.net](https://serveo.net/)
-   Table layout
-   Unit testing with jest
-   Folder nesting with treeDS
-   Accessibility compliance, saturation, keyboard navigation, focus state, screen reader tests.
-   Dark theme
-   Octet/stream file uploads
-   Localization support
-   Make tabs sliding on swipe
-   Add micro interactions
-   Add react-router for page details

### Hope you liked it!

1. Use-case details:
   a. User is on the Documents tab where they can see list of documents which
   are already uploaded.
   b. Come up with your own columns - user should be able to understand who,
   what, why and when for each document.
   c. User should be able to preview any document in the UI.
   d. User should be able to download any document.
   e. User should be able to upload multiple documents.
   f. Once the document is uploaded user should be notified of the upload status
   (as an alert, notification, etc.) even if user is on another tab.

2. We don’t provide detailed instructions on what libraries to use, how to organise the
   codebase or the types of tests to write, however it would be nice if you implement
   task using Redux, Redux Toolkit, Typescript, Axios and Vite or Webpack. You can
   mock the data and use json server or node server for API calls.
3. We are looking for end to end solution - UX design or wireframe, responsive good-
   looking design, project structure, choice of libraries, development, linting, testing and
   build methodologies.
4. We would prefer candidate showing their designing skills where they could show
   something visually appealing design so be creative as you can.
5. Please check-in you code to GitHub repository, add a detailed readme file and
   provide access to it.
