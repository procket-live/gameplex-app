import { gql } from 'apollo-boost';

export function UserQuery() {
    return gql`
        query {
        me {
                id
        }
    }
    `
}