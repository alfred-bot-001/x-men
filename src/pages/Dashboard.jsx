import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { DASHBOARD_DATA } from '../data/mockData'

const KPI = ({ label, value, unit, color }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</div>
    <div className={`text-3xl font-bold ${color || 'text-white'}`}>
      {value}<span className="text-lg font-normal text-gray-500 ml-1">{unit}</span>
    </div>
  </div>
)

export default function Dashboard() {
  const { kpis, casesPerAgent, hourlyVolume, outcomes, agentPerformance } = DASHBOARD_DATA

  return (
    <div className="p-6 max-w-7xl space-y-6">
      <h2 className="text-xl font-bold text-white">工作量 & 审计 Dashboard</h2>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="今日处理 Cases" value={kpis.todayCases} color="text-indigo-400" />
        <KPI label="平均处理时长" value={kpis.avgProcessingTime} unit="min" color="text-blue-400" />
        <KPI label="人工介入率" value={kpis.interventionRate} unit="%" color="text-yellow-400" />
        <KPI label="整体准确率" value={kpis.accuracy} unit="%" color="text-green-400" />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Bar chart: cases per agent */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-sm font-semibold text-white mb-4">Cases per Agent</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={casesPerAgent} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="agent" tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#f9fafb' }}
              />
              <Bar dataKey="cases" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line chart: hourly volume */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-sm font-semibold text-white mb-4">Hourly Case Volume (Today)</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={hourlyVolume} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="hour" tick={{ fill: '#9ca3af', fontSize: 9 }} interval={3} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#f9fafb' }}
              />
              <Line type="monotone" dataKey="cases" stroke="#818cf8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Pie chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-sm font-semibold text-white mb-4">Case Outcomes</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={outcomes}
                cx="50%" cy="50%"
                innerRadius={55} outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {outcomes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#f9fafb' }}
                formatter={(value) => [`${value}%`]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-1">
            {outcomes.map(o => (
              <div key={o.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: o.color }}></span>
                <span className="text-xs text-gray-400">{o.name} {o.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance table */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="text-sm font-semibold text-white mb-4">Agent Performance Ranking</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 uppercase tracking-wide border-b border-gray-800">
                  <th className="text-left pb-2">Agent</th>
                  <th className="text-right pb-2">Cases</th>
                  <th className="text-right pb-2">Accuracy</th>
                  <th className="text-right pb-2">Escalation</th>
                  <th className="text-right pb-2">Avg Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {agentPerformance
                  .sort((a, b) => b.accuracy - a.accuracy)
                  .map((ag, i) => (
                    <tr key={ag.name} className="text-gray-300">
                      <td className="py-2 flex items-center gap-2">
                        <span className="text-xs text-gray-600 w-4">#{i+1}</span>
                        <span className="text-xs">{ag.name}</span>
                      </td>
                      <td className="text-right text-xs">{ag.cases}</td>
                      <td className="text-right">
                        <span className={`text-xs font-medium ${
                          ag.accuracy >= 95 ? 'text-green-400' :
                          ag.accuracy >= 92 ? 'text-yellow-400' : 'text-red-400'
                        }`}>{ag.accuracy}%</span>
                      </td>
                      <td className="text-right text-xs text-gray-400">{ag.escalationRate}%</td>
                      <td className="text-right text-xs text-gray-400">{ag.avgTime}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
