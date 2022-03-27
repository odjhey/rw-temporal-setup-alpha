import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type WorkflowRunSourceLayoutProps = {
  children: React.ReactNode
}

const WorkflowRunSourcesLayout = ({ children }: WorkflowRunSourceLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.workflowRunSources()}
            className="rw-link"
          >
            WorkflowRunSources
          </Link>
        </h1>
        <Link
          to={routes.newWorkflowRunSource()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New WorkflowRunSource
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default WorkflowRunSourcesLayout
