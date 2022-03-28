export const schema = gql`
  type WorkflowRun {
    id: Int!
    temporalWorkflowId: String!
    temporalStatus: String
    temporalWfType: String
    fileInput: String!
  }

  type Query {
    workflowRuns: [WorkflowRun!]! @requireAuth
    workflowRun(id: Int!): WorkflowRun @requireAuth
  }

  input CreateWorkflowRunInput {
    temporalWorkflowId: String!
    fileInput: String!
  }

  input UpdateWorkflowRunInput {
    temporalWorkflowId: String
  }

  type Mutation {
    createWorkflowRun(input: CreateWorkflowRunInput!): WorkflowRun! @requireAuth
    updateWorkflowRun(id: Int!, input: UpdateWorkflowRunInput!): WorkflowRun!
      @requireAuth
    deleteWorkflowRun(id: Int!): WorkflowRun! @requireAuth
    unblock(id: Int!): WorkflowRun! @requireAuth
  }
`
