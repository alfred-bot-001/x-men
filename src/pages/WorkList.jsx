import { useState, useEffect } from 'react'
import { INITIAL_AGENTS, CASES } from '../data/mockData'

export default function WorkList() {
  const [agents, setAgents] = useState(INITIAL_AGENTS)
  const [filter, setFilter] = useState('all')

  // Simulate status cycling for agent-001
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(a => {
        if (a.id === 'agent-001') {
          if (a.status === 'busy') return { ...a, status: 'idle', currentCase: null }
          if (a.status === 'idle') return { ...a, status: 'busy', currentCase: 'CASE-2026-' + String(Math.floor(Math.random() * 100)).padStart(4, '0') }
        }
        return a
      }))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const filtered = filter === 'all' ? agents : agents.filter(a => {
    if (filter === 'idle') return a.status === 'idle'
    if (filter === 'busy') return a.status === 'busy'
    if (filter === 'alert') return a.status === 'alert'
    return true
  })

  const statusConfig = {
    idle: { dot: 'bg-green-400', badge: 'bg-green-900/30 text-green-400 border-green-800/50', label: '● Idle', pulse: false },
    busy: { dot: 'bg-yellow-400', badge: 'bg-yellow-900/30 text-yellow-400 border-yellow-800/50', label: '● Busy', pulse: false },
    alert: { dot: 'bg-red-500', badge: 'bg-red-900/30 text-red-400 border-red-800/50', label: '● Needs Attention', pulse: true },
  }

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Agent 工作列表</h2>
          <p className="text-sm text-gray-400 mt-0.5">Real-time agent status monitor</p>
        </div>
        <div className="flex gap-2">
          {['all', 'idle', 'busy', 'alert'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-colors ${
                filter === f
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Idle', count: agents.filter(a => a.status === 'idle').length, color: 'text-green-400', bg: 'bg-green-900/20 border-green-900/40' },
          { label: 'Busy', count: agents.filter(a => a.status === 'busy').length, color: 'text-yellow-400', bg: 'bg-yellow-900/20 border-yellow-900/40' },
          { label: 'Alert', count: agents.filter(a => a.status === 'alert').length, color: 'text-red-400', bg: 'bg-red-900/20 border-red-900/40' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} border rounded-lg p-3 text-center`}>
            <div className={`text-2xl font-bold ${s.color}`}>{s.count}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Agent cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(agent => {
          const sc = statusConfig[agent.status] || statusConfig.idle
          return (
            <div key={agent.id} className={`bg-gray-900 border rounded-xl p-5 transition-all ${
              agent.status === 'alert' ? 'border-red-800 shadow-red-900/20 shadow-lg' : 'border-gray-800'
            }`}>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="text-4xl">{agent.avatar}</div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-900 ${sc.dot} ${sc.pulse ? 'animate-pulse' : ''}`}></div>
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{agent.name}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border mt-1 inline-block ${sc.badge}`}>
                      {sc.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mb-3">
                {agent.skills.map(s => (
                  <span key={s} className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>

              {/* Current case */}
              <div className="bg-gray-800/50 rounded-lg p-3 mb-3">
                <div className="text-xs text-gray-500 mb-1">Current Case</div>
                {agent.currentCase ? (
                  <div className="text-sm font-mono text-indigo-300">{agent.currentCase}</div>
                ) : (
                  <div className="text-sm text-gray-600 italic">No active case</div>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{agent.todayCases}</div>
                  <div className="text-xs text-gray-500">Today</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${agent.accuracy >= 95 ? 'text-green-400' : agent.accuracy >= 90 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {agent.accuracy > 0 ? `${agent.accuracy}%` : '–'}
                  </div>
                  <div className="text-xs text-gray-500">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-400">{agent.workMode === 'auto' ? '🤖' : '🖐'}</div>
                  <div className="text-xs text-gray-500">{agent.workMode}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
