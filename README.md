# ScullyPlayground

## Promises are eager

The Directus API has a promise-based SDK.

In the `eager` version the api gets called everytime and the `Transfer State` does not kick in. In the `prefetched` route, it uses `defer(() -> new Promise())` to avoid the eager evaluation and the `Transfer State` does its job as expected. The API is never called on the client.

Thanks [SanderElias](https://github.com/SanderElias) and @Chau
