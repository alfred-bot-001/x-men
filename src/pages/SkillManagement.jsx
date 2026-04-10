import { useState } from 'react'
import { SKILLS_DATA } from '../data/mockData'

export default function SkillManagement() {
  const [skills, setSkills] = useState(SKILLS_DATA)
  const [selected, setSelected] = useState(null)
  const [toast, setToast] = useState(null)
  const [editName, setEditName] = useState('')
  const [editDesc, setEditDesc] = useState('')
  const [steps, setSteps] = useState([])

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500) }

  const openSkill = (skill) => {
    setSelected(skill.id)
    setEditName(skill.name)
    setEditDesc(skill.description)
    setSteps(skill.steps.map(s => ({ ...s })))
  }

  const handleSave = () => {
    setSkills(prev => prev.map(s =>
      s.id === selected
        ? { ...s, name: editName, description: editDesc, steps, lastUpdated: new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) }
        : s
    ))
    showToast('✅ Skill saved successfully')
  }

  const addStep = () => {
    const newId = Math.max(...steps.map(s => s.id)) + 1
    setSteps(prev => [...prev, { id: newId, name: 'New Step', description: 'Describe this step...', decision: 'Pass/Fail' }])
  }

  const updateStep = (id, field, value) => {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const removeStep = (id) => {
    setSteps(prev => prev.filter(s => s.id !== id))
  }

  const handleFakeUpload = () => {
    showToast('📄 SOP uploaded! AI is parsing workflow steps... (demo)')
  }

  const currentSkill = skills.find(s => s.id === selected)

  if (selected && currentSkill) {
    return (
      <div className="p-6 max-w-4xl">
        {toast && (
          <div className="fixed top-4 right-4 bg-gray-800 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg border border-gray-700 z-50">
            {toast}
          </div>
        )}

        {/* Back */}
        <button onClick={() => setSelected(null)} className="text-indigo-400 hover:text-indigo-300 text-sm mb-4 flex items-center gap-1 transition-colors">
          ← 返回 Skill 列表
        </button>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">编辑 Skill</h2>
          <div className="flex gap-2">
            <button onClick={handleFakeUpload}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-sm px-4 py-2 rounded-lg transition-colors">
              📄 Upload SOP
            </button>
            <button onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              💾 Save Skill
            </button>
          </div>
        </div>

        {/* Name & description */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-4 space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-1.5">Skill 名称</label>
            <input value={editName} onChange={e => setEditName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-1.5">描述</label>
            <textarea value={editDesc} onChange={e => setEditDesc(e.target.value)} rows={2}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none" />
          </div>
        </div>

        {/* Workflow steps */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-white">📋 工作流程节点 ({steps.length})</div>
            <button onClick={addStep}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-xs px-3 py-1.5 rounded-lg transition-colors">
              + Add Step
            </button>
          </div>

          <div className="space-y-3">
            {steps.map((step, idx) => (
              <div key={step.id} className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                <div className="flex items-start gap-3">
                  {/* Drag handle */}
                  <div className="text-gray-600 mt-1 cursor-grab text-lg select-none">⋮⋮</div>
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-900/50 text-indigo-400 text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      value={step.name}
                      onChange={e => updateStep(step.id, 'name', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                    <textarea
                      value={step.description}
                      onChange={e => updateStep(step.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none focus:border-indigo-500 resize-none"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Decision type:</span>
                      <select
                        value={step.decision}
                        onChange={e => updateStep(step.id, 'decision', e.target.value)}
                        className="bg-gray-700 border border-gray-600 rounded px-2 py-0.5 text-xs text-gray-300 focus:outline-none"
                      >
                        {['Pass/Fail', 'Pass/Flag', 'Pass/Escalate', 'Agree/Disagree', 'Auto-Close/Proceed', 'Score', 'Final', 'Approve/RFI/Escalate/Reject'].map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button onClick={() => removeStep(step.id)}
                    className="text-gray-600 hover:text-red-400 text-lg transition-colors shrink-0">×</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-5xl">
      {toast && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg border border-gray-700 z-50">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Skill 管理</h2>
          <p className="text-sm text-gray-400 mt-0.5">{skills.length} skills configured</p>
        </div>
        <button onClick={handleFakeUpload}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          📄 Upload SOP
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map(skill => (
          <div
            key={skill.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-indigo-700/50 cursor-pointer transition-colors group"
            onClick={() => openSkill(skill)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">{skill.name}</div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{skill.description}</p>
              </div>
              <span className="text-gray-600 group-hover:text-indigo-400 transition-colors ml-3">→</span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-800">
              <div className="text-center">
                <div className="text-lg font-bold text-indigo-400">{skill.steps.length}</div>
                <div className="text-xs text-gray-600">Steps</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">{skill.assignedAgents}</div>
                <div className="text-xs text-gray-600">Agents</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-medium text-gray-400">{skill.lastUpdated}</div>
                <div className="text-xs text-gray-600">Updated</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
