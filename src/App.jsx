import { useState } from 'react'
import AgentManagement from './pages/AgentManagement'
import WorkList from './pages/WorkList'
import CaseDetail from './pages/CaseDetail'
import Dashboard from './pages/Dashboard'
import SkillManagement from './pages/SkillManagement'

const NAV = [
  { id: 'agents', label: 'Agent 管理', icon: '🤖' },
  { id: 'worklist', label: '工作列表', icon: '📋' },
  { id: 'case', label: 'Case 详情', icon: '🔍' },
  { id: 'dashboard', label: '审计 Dashboard', icon: '📊' },
  { id: 'skills', label: 'Skill 管理', icon: '⚙️' },
]

export default function App() {
  const [page, setPage] = useState('agents')
  const [activeCaseId, setActiveCaseId] = useState(null)

  const navigateToCase = (caseId) => {
    setActiveCaseId(caseId)
    setPage('case')
  }

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
        <div className="px-4 py-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <div>
              <div className="font-bold text-white text-sm">X-Men</div>
              <div className="text-xs text-gray-400">FCMI Platform</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => setPage(n.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                page === n.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span>{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">M</div>
            <div>
              <div className="text-xs font-medium text-white">Max W.</div>
              <div className="text-xs text-gray-500">FCMI Manager</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between shrink-0">
          <h1 className="font-semibold text-white">
            {NAV.find(n => n.id === page)?.icon} {NAV.find(n => n.id === page)?.label}
          </h1>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>System Operational</span>
            <span>Binance FCMI · ADGM</span>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {page === 'agents' && <AgentManagement />}
          {page === 'worklist' && <WorkList onCaseClick={navigateToCase} />}
          {page === 'case' && <CaseDetail initialCaseId={activeCaseId} />}
          {page === 'dashboard' && <Dashboard />}
          {page === 'skills' && <SkillManagement />}
        </div>
      </main>
    </div>
  )
}
