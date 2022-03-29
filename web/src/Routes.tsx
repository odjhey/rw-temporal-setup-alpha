// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import WorkflowRunResultsLayout from 'src/layouts/WorkflowRunResultsLayout'
import WorkflowRunSourcesLayout from 'src/layouts/WorkflowRunSourcesLayout'
import WorkflowRunsLayout from 'src/layouts/WorkflowRunsLayout'
import TestRunWfLayout from 'src/layouts/TestRunWfLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={TestRunWfLayout}>
        <Route path="/test-run-wf" page={TestRunWfPage} name="testRunWf" />
      </Set>
      <Set wrap={WorkflowRunResultsLayout}>
        <Route path="/workflow-run-results/new" page={WorkflowRunResultNewWorkflowRunResultPage} name="newWorkflowRunResult" />
        <Route path="/workflow-run-results/{id:Int}/edit" page={WorkflowRunResultEditWorkflowRunResultPage} name="editWorkflowRunResult" />
        <Route path="/workflow-run-results/{id:Int}" page={WorkflowRunResultWorkflowRunResultPage} name="workflowRunResult" />
        <Route path="/workflow-run-results" page={WorkflowRunResultWorkflowRunResultsPage} name="workflowRunResults" />
      </Set>
      <Set wrap={WorkflowRunSourcesLayout}>
        <Route path="/workflow-run-sources/new" page={WorkflowRunSourceNewWorkflowRunSourcePage} name="newWorkflowRunSource" />
        <Route path="/workflow-run-sources/{id:Int}/edit" page={WorkflowRunSourceEditWorkflowRunSourcePage} name="editWorkflowRunSource" />
        <Route path="/workflow-run-sources/{id:Int}" page={WorkflowRunSourceWorkflowRunSourcePage} name="workflowRunSource" />
        <Route path="/workflow-run-sources" page={WorkflowRunSourceWorkflowRunSourcesPage} name="workflowRunSources" />
      </Set>
      <Route path="/upload" page={UploadPage} name="upload" />
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
