export const schema = gql`
  type WorkflowRunResult {
    id: Int!
    temporalWorkflowId: String!
    result: JSON!
  }

  type Query {
    workflowRunResults: [WorkflowRunResult!]! @requireAuth
    workflowRunResult(id: Int!): WorkflowRunResult @requireAuth
  }

  input CreateWorkflowRunResultInput {
    temporalWorkflowId: String!
    result: JSON!
  }

  input UpdateWorkflowRunResultInput {
    temporalWorkflowId: String
    result: JSON
  }

  type Mutation {
    createWorkflowRunResult(
      input: CreateWorkflowRunResultInput!
    ): WorkflowRunResult! @requireAuth
    updateWorkflowRunResult(
      id: Int!
      input: UpdateWorkflowRunResultInput!
    ): WorkflowRunResult! @requireAuth
    deleteWorkflowRunResult(id: Int!): WorkflowRunResult! @requireAuth
  }
`
