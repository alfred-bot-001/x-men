import { useState } from 'react'
import { INITIAL_AGENTS, SKILLS_LIST, XMEN_AVATARS } from '../data/mockData'

const EMPTY_FORM = { name: '', avatar: 'wolverine', avatarUrl: XMEN_AVATARS[0]?.url, skills: [], workMode: 'auto', maxConcurrent: 2 }

function AgentAvatar({ agent, size = 'lg' }) {
  const cls = size === 'lg' ? 'w-14 h-14' : 'w-10 h-10'
  if (agent.avatarUrl) {
    return (
      <img
        src={agent.avatarUrl}
        alt={agent.name}
        className={`${cls} rounded-full object-cover border-2 border-gray-700`}
        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
      />
    )
  }
  return <div className={`${cls} rounded-full bg-indigo-900 flex items-center justify-center text-2xl border-2 border-gray-700`}>{agent.avatar}</div>
}

export default function AgentManagement() {
  const [agents, setAgents] = useState(INITIAL_AGENTS)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [toast, setToast] = useState(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const toggleSkill = (s) => {
    setForm(f => ({
      ...f,
      skills: f.skills.includes(s) ? f.skills.filter(x => x !== s) : [...f.skills, s]
    }))
  }

  const handleSave = () => {
    if (!form.name.trim()) return
    const newAgent = {
      id: `agent-${Date.now()}`,
      ...form,
      status: 'idle',
      currentCase: null,
      todayCases: 0,
      accuracy: 0,
    }
    setAgents(a => [...a, newAgent])
    setShowModal(false)
    setForm(EMPTY_FORM)
    showToast(`✅ Agent "${newAgent.name}" created successfully`)
  }

  const handleDelete = (id) => {
    setAgents(a => a.filter(ag => ag.id !== id))
    showToast('🗑️ Agent removed')
  }

  return (
    <div className="p-6 max-w-6xl">
      {toast && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg border border-gray-700 z-50">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Agent 管理</h2>
          <p className="text-sm text-gray-400 mt-0.5">{agents.length} agents configured</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + 新建 Agent
        </button>
      </div>

      {/* Agent cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map(agent => (
          <div key={agent.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <AgentAvatar agent={agent} size="lg" />
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-gray-900 ${
                    agent.status === 'idle' ? 'bg-green-400' : agent.status === 'busy' ? 'bg-yellow-400' : 'bg-red-500'
                  }`}></div>
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{agent.name}</div>
                  <div className={`text-xs mt-0.5 flex items-center gap-1 ${
                    agent.workMode === 'auto' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {agent.workMode === 'auto' ? '🤖 Auto' : '🖐 Manual'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(agent.id)}
                className="text-gray-600 hover:text-red-400 text-lg transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {agent.skills.map(s => (
                  <span key={s} className="bg-indigo-900/50 text-indigo-300 text-xs px-2 py-0.5 rounded-full border border-indigo-800/60">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                <span className="text-xs text-gray-500">Max concurrent: {agent.maxConcurrent}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  agent.status === 'idle' ? 'bg-green-900/40 text-green-400' :
                  agent.status === 'busy' ? 'bg-yellow-900/40 text-yellow-400' :
                  'bg-red-900/40 text-red-400'
                }`}>
                  {agent.status === 'idle' ? '● Idle' : agent.status === 'busy' ? '● Busy' : '● Alert'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white">新建 Agent</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white text-xl">×</button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-1.5">名称</label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Jean Grey"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Avatar — X-Men characters */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-1.5">头像 (X-Men)</label>
                <div className="grid grid-cols-6 gap-2">
                  {XMEN_AVATARS.map(a => (
                    <button
                      key={a.id}
                      onClick={() => setForm(f => ({ ...f, avatar: a.id, avatarUrl: a.url, name: f.name || a.name }))}
                      className={`relative rounded-lg overflow-hidden border-2 transition-colors aspect-square ${
                        form.avatar === a.id
                          ? 'border-indigo-500 ring-2 ring-indigo-500/40'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <img src={a.url} alt={a.name} className="w-full h-full object-cover" />
                      {form.avatar === a.id && (
                        <div className="absolute inset-0 bg-indigo-500/20 flex items-end justify-center pb-0.5">
                          <span className="text-white text-xs font-bold drop-shadow">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Selected: <span className="text-gray-400">{XMEN_AVATARS.find(a => a.id === form.avatar)?.name}</span>
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-1.5">Skills</label>
                <div className="space-y-1.5">
                  {SKILLS_LIST.map(s => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.skills.includes(s)}
                        onChange={() => toggleSkill(s)}
                        className="accent-indigo-500"
                      />
                      <span className="text-sm text-gray-300">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Work Mode */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-1.5">工作模式</label>
                <div className="space-y-1.5">
                  {[
                    { val: 'auto', label: '🤖 Auto — 自动接任务' },
                    { val: 'manual', label: '🖐 Manual — 手动触发' },
                  ].map(opt => (
                    <label key={opt.val} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="workMode"
                        checked={form.workMode === opt.val}
                        onChange={() => setForm(f => ({ ...f, workMode: opt.val }))}
                        className="accent-indigo-500"
                      />
                      <span className="text-sm text-gray-300">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max concurrent */}
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-1.5">
                  最大并发 Case 数：{form.maxConcurrent}
                </label>
                <input
                  type="range" min={1} max={5}
                  value={form.maxConcurrent}
                  onChange={e => setForm(f => ({ ...f, maxConcurrent: Number(e.target.value) }))}
                  className="w-full accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-0.5">
                  <span>1</span><span>5</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => { setShowModal(false); setForm(EMPTY_FORM) }}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm py-2 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                disabled={!form.name.trim() || form.skills.length === 0}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium py-2 rounded-lg transition-colors"
              >
                创建 Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


