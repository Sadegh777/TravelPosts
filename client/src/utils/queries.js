import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      memories {
        _id
        memoryTitle
        memoryText
        createdAt
      }
    }
  }
`;

export const QUERY_MEMORIES = gql`
  query getMemories {
    Memories {
      _id
      memoryTitle
      memoryText
      memoryAuthor
      createdAt
    }
  }
`;

export const QUERY_MEMORY = gql`
  query getMemory($memoryId: ID!) {
    memory(memoryId: $memoryId) {
      _id
      memoryTitle
      memoryText
      memoryAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      memories {
        _id
        memoryText
        memoryAuthor
        createdAt
      }
    }
  }
`;
