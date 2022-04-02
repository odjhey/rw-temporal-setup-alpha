export const schema = gql`
  type AnalysisResult {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    ref: String!
    source: String!
    rawJson: JSON!
    schemaVersion: String!
  }

  type Query {
    analysisResults: [AnalysisResult!]! @requireAuth
    analysisResult(id: String!): AnalysisResult @requireAuth
  }

  input CreateAnalysisResultInput {
    ref: String!
    source: String!
    rawJson: JSON!
    schemaVersion: String!
  }

  input UpdateAnalysisResultInput {
    ref: String
    source: String
    rawJson: JSON
    schemaVersion: String
  }

  type Mutation {
    createAnalysisResult(input: CreateAnalysisResultInput!): AnalysisResult!
      @requireAuth
    updateAnalysisResult(
      id: String!
      input: UpdateAnalysisResultInput!
    ): AnalysisResult! @requireAuth
    deleteAnalysisResult(id: String!): AnalysisResult! @requireAuth
  }
`
