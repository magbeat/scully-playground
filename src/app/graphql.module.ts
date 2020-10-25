import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {HttpHeaders} from '@angular/common/http';

const uri = 'https://graphql.datocms.com/'; // <-- add the URL of the GraphQL server here
const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', '1b77458392af947f0fe8fa2b42eb5c');

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
    return {
        link: httpLink.create({uri, headers}),
        cache: new InMemoryCache(),
    };
}

@NgModule({
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule {
}
