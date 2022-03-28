import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type WorkflowRunResultLayoutProps = {
  children: React.ReactNode
}

const WorkflowRunResultsLayout = ({ children }: WorkflowRunResultLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.workflowRunResults()}
            className="rw-link"
          >
            WorkflowRunResults
          </Link>
        </h1>
        <Link
          to={routes.newWorkflowRunResult()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New WorkflowRunResult
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default WorkflowRunResultsLayout
