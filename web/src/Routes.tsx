// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import WorkflowRunsLayout from 'src/layouts/WorkflowRunsLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={WorkflowRunsLayout}>
        <Route path="/workflow-runs/new" page={WorkflowRunNewWorkflowRunPage} name="newWorkflowRun" />
        <Route path="/workflow-runs/{id:Int}/edit" page={WorkflowRunEditWorkflowRunPage} name="editWorkflowRun" />
        <Route path="/workflow-runs/{id:Int}" page={WorkflowRunWorkflowRunPage} name="workflowRun" />
        <Route path="/workflow-runs" page={WorkflowRunWorkflowRunsPage} name="workflowRuns" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
