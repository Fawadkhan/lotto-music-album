# Lotto Music Album 

## Table of Contents
- [Getting Started](#getting-started)
- [Running Tests](#to-run-the-tests)
- [Design Decisions](#design-decisions)
- [CDK Virtual Scroller](#cdk-virtual-scroller)
- [Pitfalls and Cons of the Current System](#pitfalls-and-cons-of-the-current-system)
- [Potential Solution for Using an Endpoint](#potential-solution-for-using-an-endpoint)
- [Folder Structure](#folder-structure)
- [Important Future Considerations](#future-considerations)


## Getting Started

This project was generated with [Angular CLI](https://github.com/angular/angular-cli)



1. Clone the repository
2. Run `npm install` to install dependencies
3. Use `npm run start` to start the development server
4. Navigate to `http://localhost:4200/` in your browser

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

 **Karma** : Currently I'm using karma as the default test runner, I usually prefer Jest but in this case I used karma. Reason? It was pre-setup in the project and I didn't have to do much configuration. 
 **What would I prefer in big projects?**: Jest is much faster and doesn't use the real browser but a simulated DOM. Tests can be run in parallel and requires minial config. so I would go with JEST.

## Design Decisions

1. **Standalone Components**: I've adopted standalone components for better code organization and lazy loading capabilities, improving performance. In standalone components the dependencies are imported directly within the components and this increases Tree shaking capabilities which leads to better performance.

2. **Signal-based State Management**: I have used Angular's signals for lightweight, reactive state management, avoiding the complexity of additional libraries while maintaining simplicity. I would generally prefer Ngrx for bigger projects but this is something very tricky and can be handled from project to project. I usually don't come up with a decision before I see the project and that's the reason why I went for signal state management to avoid complexity in such a small project. 

3. **Query Parameters for State of Inputs**: Used query parameters in routing to maintain sorting and filtering states, enabling shareable URLs and proper navigation history. This is one of the strategices I use to keep the state consistent specially on refreshing the page. Other solution would be save the state globally or just use local storage but that's not very ideal in our case.

4. **Service Architecture**: Created separate services (AlbumService, PlaylistService, StorageService) to separate business logic and data management, improving testability and maintainability.

### CDK Virtual Scroller

I implemented the CDK Virtual Scroller (`cdk-virtual-scroll-viewport`) in the AlbumListComponent to efficiently render large lists of albums. This decision was made because:

- It significantly improves performance when dealing with long lists by only rendering the items currently in view.
- It reduces memory usage and DOM size, crucial for mobile devices or low-end computers.

The virtual scroller is particularly useful in our case where we potentially have a large number of albums that could cause performance issues if all rendered at once.

## Pitfalls and Cons of the Current System

1. **Limited Scalability**: The current signal-based state management might become complex as the application grows, potentially necessitating a more robust solution like NgRx.

2. **Mock Data Limitations**: Using static data limits real-world testing scenarios and doesn't represent for API latency or error handling. In our real case we might have a delay, async data, and how we use observable data/async data with signals. 

4. **Potential Performance Issues**: Heavy reliance on client-side filtering and sorting could become problematic with very large datasets. I would much rather prefer pagination from the backend. This is very crucial and important specially when it comes to large data-set including image handling.

5. **Limited Error Handling**: The current implementation may not adequately handle all potential error scenarios, especially those related to data fetching and state updates.

### Potential solution for Using an Endpoint

If we were to use an endpoint instead of static signals, we would make the following changes:

1. **HTTP Service**: Implement an HTTP service using Angular's HttpClient to handle API requests. I would also prefer to use http interceptors to handle any errors on the interceptor level.

2. **Observables**: Replace signals with Observables in services to handle asynchronous data streams from the endpoint.

3. **Error Handling**: Implement proper error handling for API requests, including user-friendly error messages.

These changes would make the application more robust and suitable for real-world scenarios with dynamic data from a backend API.

## Folder Structure:

- `src/app/`: Root folder for our Angular application.
  - `core/`: Contains core functionality used throughout the app.
    - `models/`: Data models and interfaces.
    - `services/`: Application-wide services.
  - `shared/`: Shared modules, components, and utilities.
    - `components/`: Reusable UI components.
    - `containers/`: Feature containers (smart components).
      - `album-list/`: Album list feature.
      - `album-detail/`: Album detail feature.
      - `playlist/`: Playlist feature.
  - App-level files: Main app component and routing configuration.

### Why am I doing this??
1. Separate core, shared, and feature-specific code.
2. Easily locate and manage components, services, and models.
3. Scale the application by adding new features in the `containers` folder.
4. Maintain a clear separation between smart (containers) and presentational components.

## IMPORTANT!! Future Considerations
1. **Layout component** : I would also prefer to createa a layout component to handle the shared layout components e.g header/footer or any shared UI's
2. **Router service** : In my case I didn't create a router service but it's ideal to create a Router service to manage this on a service level rather than component level. This is really important
3. Implement comprehensive unit and e2e tests. I used webdriver.io recently and it was a great solution for running e2e tests in pipeline but it has an overhead due to setting up the configuration
4. Consider adopting NgRx for more complex state management as I mentioned before, it really depends on the type and scale of the project but it's generally a good idea to use a stable solution when the project scales up.
5. Use Jest for unit testing as its much more faster than Karma.
