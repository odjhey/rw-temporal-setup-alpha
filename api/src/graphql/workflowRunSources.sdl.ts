export const schema = gql`
  type WorkflowRunSource {
    id: Int!
    slug: String!
  }

  type FileSource {
    slug: String!
  }

  type Query {
    workflowRunSources: [WorkflowRunSource!]! @requireAuth
    workflowRunSource(id: Int!): WorkflowRunSource @requireAuth
    fileSources: [FileSource!]!
  }

  input CreateWorkflowRunSourceInput {
    slug: String!
  }

  input UpdateWorkflowRunSourceInput {
    slug: String
  }

  type Mutation {
    createWorkflowRunSource(
      input: CreateWorkflowRunSourceInput!
    ): WorkflowRunSource! @requireAuth
    updateWorkflowRunSource(
      id: Int!
      input: UpdateWorkflowRunSourceInput!
    ): WorkflowRunSource! @requireAuth
    deleteWorkflowRunSource(id: Int!): WorkflowRunSource! @requireAuth
  }
`
