import { useState, useEffect, useRef } from 'react'
import { CASES, CASE_STEPS } from '../data/mockData'

const RESULT_CONFIG = {
  pass:    { icon: '✅', color: 'text-green-400',  bg: 'bg-green-900/20 border-green-800/40' },
  warning: { icon: '⚠️', color: 'text-yellow-400', bg: 'bg-yellow-900/20 border-yellow-800/40' },
  flag:    { icon: '🔴', color: 'text-red-400',    bg: 'bg-red-900/20 border-red-800/40' },
}

const RECOMMENDATION = {
  'CASE-2026-0042': { text: 'Escalate to L3', color: 'text-orange-400', bg: 'bg-orange-900/30 border-orange-800' },
  'CASE-2026-0043': { text: 'Approve',        color: 'text-green-400',  bg: 'bg-green-900/30 border-green-800' },
  'CASE-2026-0044': { text: 'Send RFI',       color: 'text-yellow-400', bg: 'bg-yellow-900/30 border-yellow-800' },
  'CASE-2026-0045': { text: 'Approve',        color: 'text-green-400',  bg: 'bg-green-900/30 border-green-800' },
  'CASE-2026-0046': { text: 'Escalate to L3', color: 'text-orange-400', bg: 'bg-orange-900/30 border-orange-800' },
}

// Fixed height for both panels — avoids relying on parent height chain
const PANEL_STYLE = { height: 'calc(100vh - 220px)', overflowY: 'auto' }

export default function CaseDetail({ initialCaseId }) {
  const defaultCase = initialCaseId || CASES[0]?.id
  const [selectedCase, setSelectedCase] = useState(defaultCase)
  const [visibleSteps, setVisibleSteps]   = useState([])
  const [streaming, setStreaming]         = useState(false)
  const [feedback, setFeedback]           = useState({})
  const [rating, setRating]               = useState(0)
  const [decision, setDecision]           = useState(null)
  const [toast, setToast]                 = useState(null)
  const timerRef  = useRef(null)
  const rightRef  = useRef(null)   // scroll right panel to top when allDone

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500) }

  const startStreaming = (caseId) => {
    clearTimeout(timerRef.current)
    setVisibleSteps([])
    setStreaming(true)
    setDecision(null)
    setRating(0)
    setFeedback({})
    const steps = CASE_STEPS[caseId] || []
    let i = 0
    const tick = () => {
      if (i < steps.length) {
        const step = steps[i]
        i++
        setVisibleSteps(prev => [...prev, step])
        timerRef.current = setTimeout(tick, 600)
      } else {
        setStreaming(false)
      }
    }
    timerRef.current = setTimeout(tick, 300)
  }

  // Re-run when navigated from WorkList
  useEffect(() => {
    if (initialCaseId && initialCaseId !== selectedCase) {
      setSelectedCase(initialCaseId)
    }
  }, [initialCaseId])

  useEffect(() => {
    startStreaming(selectedCase)
    return () => clearTimeout(timerRef.current)
  }, [selectedCase])

  const steps    = CASE_STEPS[selectedCase] || []
  const allDone  = visibleSteps.length === steps.length && !streaming
  const hasFlag  = visibleSteps.some(s => s.result === 'flag')
  const caseData = CASES.find(c => c.id === selectedCase)
  const rec      = RECOMMENDATION[selectedCase]

  // When analysis finishes, scroll right panel back to top so user sees the results
  useEffect(() => {
    if (allDone && rightRef.current) {
      rightRef.current.scrollTop = 0
    }
  }, [allDone])

  const handleDecision = (d) => {
    setDecision(d)
    showToast(`✅ Decision recorded: ${d}`)
  }

  return (
    <div className="p-6">
      {toast && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg border border-gray-700 z-50">
          {toast}
        </div>
      )}

      {/* Case selector row */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <label className="text-sm text-gray-400 shrink-0">Case 选择：</label>
        <select
          value={selectedCase}
          onChange={e => setSelectedCase(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
        >
          {CASES.map(c => (
            <option key={c.id} value={c.id}>{c.id} — {c.client} ({c.type})</option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Assigned:</span>
          <span className="text-xs text-indigo-300">{caseData?.assignedAgent}</span>
        </div>
        {caseData && (
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            caseData.risk === 'high' ? 'bg-red-900/30 text-red-400' :
            caseData.risk === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
            'bg-green-900/30 text-green-400'
          }`}>{caseData.risk} risk</span>
        )}
        {streaming && (
          <span className="text-xs text-indigo-400 flex items-center gap-1 ml-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse inline-block"></span>
            Agent reviewing...
          </span>
        )}
        {allDone && (
          <span className="text-xs text-green-400 ml-auto">✓ Analysis complete</span>
        )}
      </div>

      {/* Two-panel layout — each panel has its own fixed height + scroll */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* LEFT: Chain of thought */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4" style={PANEL_STYLE}>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800">
            <span>🧠</span>
            <span className="font-semibold text-white text-sm">思维链 (Chain of Thought)</span>
            <span className="ml-auto text-xs text-gray-600">{visibleSteps.length}/{steps.length} steps</span>
          </div>

          <div className="space-y-3">
            {visibleSteps.map(step => {
              const rc = RESULT_CONFIG[step.result] || RESULT_CONFIG.pass
              return (
                <div key={step.step} className={`border rounded-lg p-3 ${rc.bg}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-500">Step {step.step}</span>
                    <span className="text-sm">{step.icon}</span>
                    <span className={`text-sm font-medium ${rc.color}`}>{step.title}</span>
                    <span className="ml-auto text-base">{rc.icon}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{step.detail}</p>
                </div>
              )
            })}

            {streaming && (
              <div className="flex items-center gap-2 text-indigo-400 text-sm py-2">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </span>
                <span className="text-xs">Analyzing...</span>
              </div>
            )}

            {visibleSteps.length === 0 && !streaming && (
              <p className="text-gray-600 text-sm text-center py-8">Select a case to begin</p>
            )}
          </div>
        </div>

        {/* RIGHT: Structured output — ref for auto-scroll-to-top on completion */}
        <div ref={rightRef} className="bg-gray-900 border border-gray-800 rounded-xl p-4" style={PANEL_STYLE}>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800">
            <span>📋</span>
            <span className="font-semibold text-white text-sm">结构化输出 (Structured Output)</span>
          </div>

          {/* Placeholder */}
          {visibleSteps.length === 0 && !streaming && (
            <div className="text-gray-600 text-sm text-center py-12">
              <div className="text-4xl mb-3">📋</div>
              <div>Waiting for analysis...</div>
            </div>
          )}

          {/* Red alert banner */}
          {hasFlag && allDone && (
            <div className="border border-red-700 bg-red-900/20 rounded-lg p-3 mb-4 flex items-center gap-2">
              <span className="text-red-400 text-lg animate-pulse">🚨</span>
              <div>
                <div className="text-red-400 font-semibold text-sm">需要人工审批</div>
                <div className="text-xs text-red-300/70">High-risk indicators detected. Human review required before proceeding.</div>
              </div>
            </div>
          )}

          {/* Findings summary (streams in with each step) */}
          {visibleSteps.length > 0 && (
            <div className="space-y-2 mb-4">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">调查结果</div>
              {visibleSteps.map(step => {
                const rc = RESULT_CONFIG[step.result] || RESULT_CONFIG.pass
                return (
                  <div key={step.step} className="flex items-center justify-between bg-gray-800 rounded-lg px-3 py-2">
                    <span className="text-sm text-gray-300">{step.icon} {step.title}</span>
                    <span className={`text-xs font-medium ${rc.color}`}>
                      {rc.icon} {step.result.charAt(0).toUpperCase() + step.result.slice(1)}
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Recommendation */}
          {allDone && rec && (
            <div className={`border rounded-lg p-3 mb-4 ${rec.bg}`}>
              <div className="text-xs text-gray-400 mb-1">Agent 建议</div>
              <div className={`text-base font-bold ${rec.color}`}>{rec.text}</div>
            </div>
          )}

          {/* Human decision buttons */}
          {allDone && !decision && (
            <div className="mb-4">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">人工决定</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: '✅ Approve',     value: 'Approve',     cls: 'bg-green-800/40 hover:bg-green-700/50 border-green-700/50 text-green-300' },
                  { label: '📝 Send RFI',    value: 'Send RFI',    cls: 'bg-yellow-800/40 hover:bg-yellow-700/50 border-yellow-700/50 text-yellow-300' },
                  { label: '↑ Escalate L3',  value: 'Escalate L3', cls: 'bg-orange-800/40 hover:bg-orange-700/50 border-orange-700/50 text-orange-300' },
                  { label: '❌ Reject',       value: 'Reject',      cls: 'bg-red-800/40 hover:bg-red-700/50 border-red-700/50 text-red-300' },
                ].map(btn => (
                  <button key={btn.value} onClick={() => handleDecision(btn.value)}
                    className={`${btn.cls} border text-sm py-2 rounded-lg transition-colors`}>
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {decision && (
            <div className="bg-indigo-900/30 border border-indigo-700/50 rounded-lg p-3 mb-4">
              <div className="text-xs text-indigo-400">Decision Recorded</div>
              <div className="text-sm font-bold text-white mt-0.5">{decision}</div>
            </div>
          )}

          {/* Feedback + rating */}
          {allDone && (
            <div className="border-t border-gray-800 pt-4 space-y-3">
              <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">Agent 工作评分</div>
              <div className="flex gap-2">
                {[
                  { v: 'accurate',   label: '👍 准确',   active: 'bg-green-800/50 border-green-600 text-green-300' },
                  { v: 'inaccurate', label: '👎 不准确', active: 'bg-red-800/50 border-red-600 text-red-300' },
                ].map(btn => (
                  <button key={btn.v}
                    onClick={() => { setFeedback({ v: btn.v }); showToast(`Feedback: ${btn.label}`) }}
                    className={`flex-1 text-sm py-2 rounded-lg border transition-colors ${
                      feedback.v === btn.v
                        ? btn.active
                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">评分：</span>
                {[1,2,3,4,5].map(s => (
                  <button key={s} onClick={() => { setRating(s); showToast(`⭐ ${s}/5`) }}
                    className={`text-xl transition-colors ${s <= rating ? 'text-yellow-400' : 'text-gray-700 hover:text-yellow-600'}`}>
                    ★
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
