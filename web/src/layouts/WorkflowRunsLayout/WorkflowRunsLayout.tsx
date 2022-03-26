import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type WorkflowRunLayoutProps = {
  children: React.ReactNode
}

const WorkflowRunsLayout = ({ children }: WorkflowRunLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.workflowRuns()}
            className="rw-link"
          >
            WorkflowRuns
          </Link>
        </h1>
        <Link
          to={routes.newWorkflowRun()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New WorkflowRun
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default WorkflowRunsLayout
