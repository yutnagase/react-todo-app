# React TODO Application with JSON Server

This is a simple TODO application built with React and JSON Server for managing TODO items with CRUD operations.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add new TODO items
- Mark TODO items as complete
- Delete TODO items
- Move completed TODO items back to incomplete
- Fetch and store TODO items using JSON Server

## Installation

### Prerequisites

- Node.js (v12 or later)
- npm or yarn

### Clone the Repository

```sh
git clone https://github.com/yutnagase/react-todo-app.git
cd react-todo-json-server
```

### Install Dependencies

```sh
npm install
```

or yarn

```sh
yarn install
```

### Start the Application

1. Start the JSON Server:

```sh
npx json-server --watch db.json --port 8000
```

2. Start the React Application

- npm

```sh
npm start
```

- yarn

```sh
yarn start
```

## Usage

1. Open your browser and navigate to http://localhost:3000.
2. You can add new TODO items using the input field.
3. Mark TODO items as complete by clicking the "完了" button.
4. Delete TODO items by clicking the "削除" button.
5. Move completed TODO items back to incomplete by clicking the "戻す" button.

## Dependencies

- React
- axios
- SON Server

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
