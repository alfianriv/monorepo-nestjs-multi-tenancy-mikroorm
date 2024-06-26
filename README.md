# Monorepo Microservices with Multi-Tenancy (Multi-Schema) on PostgreSQL

## Overview

This repository contains a collection of microservices designed to work together to provide a robust, scalable multi-tenancy solution using PostgreSQL multi-schema architecture. Each tenant has its own schema within the same database, ensuring data isolation while sharing the same database instance.

## Features

- **Microservices Architecture**: Independent services that communicate via APIs.
- **Multi-Tenancy**: Each tenant's data is stored in a separate schema within the same PostgreSQL database.
- **Scalability**: Easily add new tenants and services without major changes to the system.
- **Data Isolation**: Ensure tenant data is isolated and secure.

## Prerequisites

- **PostgreSQL**: The primary database system used for storing tenant data.
- **Node.js**: Depending on the microservices' language.

## Directory Structure

```plaintext
root
│
├── apps
│   ├── service1
│   │   ├── src
│   │   ├── ...
│   ├── service2
│   │   ├── src
│   │   ├── ...
│   └── ...
│
├── libs
│   ├── multi-tenancy
|   |   ├── src
|   |   └── ...
│   └── ...
│
├── README.md
└── ...
```

## Getting Started

### Setup

1. **Clone the Repository**

    ```sh
    git clone https://github.com/alfianriv/monorepo-nestjs-multi-tenancy-mikroorm/tree/develop
    cd monorepo-nestjs-multi-tenancy-mikroorm
    ```

2. **Build and Start the Services**

    ```sh
    npm run start:dev `service_name`
    ```

3. **Initialize the Database**

    Migrate database using migration script 

    ```sh
    npm run migrate
    ```

### Environment Variables

Each service requires specific environment variables. These can be set in a `.env` file in the root directory.

## Usage

### Adding a New Tenant

1. **Create a New Schema**

    Hit api in identity to create new users

    ```
    [POST] curl http://localhost:3000/users
    ```

2. **Initialize the Schema**

    Hit api to resync schema in all users

    ```
    [GET] curl http://localhost:3000/users/migrate
    ```

### Running the Services

Each service can be managed individually. For example, to start `identity`:

```sh
npm run start:dev identity
```

## Testing

Each service includes unit and integration tests. To run the tests:

```sh
npm run test 
```

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please contact [alfian.rivaldi8@gmail.com](mailto:alfian.rivaldi8@gmail.com).

---

This README provides a comprehensive guide to setting up and managing a monorepo for microservices with multi-tenancy on PostgreSQL using a multi-schema approach.