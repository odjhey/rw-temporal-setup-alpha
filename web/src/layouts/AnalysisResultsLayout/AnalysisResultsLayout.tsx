import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type AnalysisResultLayoutProps = {
  children: React.ReactNode
}

const AnalysisResultsLayout = ({ children }: AnalysisResultLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.analysisResults()}
            className="rw-link"
          >
            AnalysisResults
          </Link>
        </h1>
        <Link
          to={routes.newAnalysisResult()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New AnalysisResult
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default AnalysisResultsLayout
