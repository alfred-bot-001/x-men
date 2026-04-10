// Mock data for the ComplianceOps platform

export const SKILLS_LIST = [
  'EDD-KYC Review',
  'EDD-SOF Review',
  'ML Alert Review',
  'Name Screening L1',
  'Name Screening L2',
]

// X-Men character avatars (Marvel public image URLs via Wikipedia)
export const XMEN_AVATARS = [
  { id: 'wolverine',  name: 'Wolverine',  url: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Wolverine_Mainstay.jpg/220px-Wolverine_Mainstay.jpg' },
  { id: 'storm',      name: 'Storm',      url: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/StormXMen.jpg/220px-StormXMen.jpg' },
  { id: 'cyclops',    name: 'Cyclops',    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/CyclopsJohnCassaday.jpg/220px-CyclopsJohnCassaday.jpg' },
  { id: 'magneto',    name: 'Magneto',    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Magneto_Marvel_Comics.jpg/220px-Magneto_Marvel_Comics.jpg' },
  { id: 'rogue',      name: 'Rogue',      url: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/RogueMStrike.jpg/220px-RogueMStrike.jpg' },
  { id: 'jean-grey',  name: 'Jean Grey',  url: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/XMen_Jean_Grey.jpg/220px-XMen_Jean_Grey.jpg' },
]

// Fallback emoji avatars for new agent creation modal
export const AVATARS = ['🐺', '⚡', '🔴', '🧲', '💚', '🔥']

export const INITIAL_AGENTS = [
  {
    id: 'agent-001',
    name: 'Wolverine',
    avatar: 'wolverine',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Wolverine_Mainstay.jpg/220px-Wolverine_Mainstay.jpg',
    skills: ['EDD-KYC Review', 'EDD-SOF Review'],
    workMode: 'auto',
    maxConcurrent: 2,
    status: 'busy',
    currentCase: 'CASE-2026-0042',
    todayCases: 12,
    accuracy: 94.2,
  },
  {
    id: 'agent-002',
    name: 'Storm',
    avatar: 'storm',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/StormXMen.jpg/220px-StormXMen.jpg',
    skills: ['Name Screening L1', 'Name Screening L2'],
    workMode: 'auto',
    maxConcurrent: 3,
    status: 'busy',
    currentCase: 'CASE-2026-0043',
    todayCases: 18,
    accuracy: 96.5,
  },
  {
    id: 'agent-003',
    name: 'Cyclops',
    avatar: 'cyclops',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/CyclopsJohnCassaday.jpg/220px-CyclopsJohnCassaday.jpg',
    skills: ['ML Alert Review'],
    workMode: 'manual',
    maxConcurrent: 1,
    status: 'idle',
    currentCase: null,
    todayCases: 8,
    accuracy: 91.8,
  },
]

export const CASES = [
  {
    id: 'CASE-2026-0042',
    type: 'EDD',
    client: 'Alexander Petrov',
    assignedAgent: 'Wolverine',
    risk: 'high',
    flag: 'pep',
    status: 'pending-review',
  },
  {
    id: 'CASE-2026-0043',
    type: 'Screening',
    client: 'Wei Zhang',
    assignedAgent: 'Storm',
    risk: 'low',
    flag: 'clean',
    status: 'approved',
  },
  {
    id: 'CASE-2026-0044',
    type: 'ML Alert',
    client: 'Maria Santos',
    assignedAgent: 'Cyclops',
    risk: 'medium',
    flag: 'sof-warning',
    status: 'rfi-sent',
  },
  {
    id: 'CASE-2026-0045',
    type: 'EDD',
    client: 'David Okafor',
    assignedAgent: 'Wolverine',
    risk: 'low',
    flag: 'clean',
    status: 'approved',
  },
  {
    id: 'CASE-2026-0046',
    type: 'Screening',
    client: 'Yuki Tanaka',
    assignedAgent: 'Storm',
    risk: 'high',
    flag: 'escalated',
    status: 'escalated',
  },
]

export const CASE_STEPS = {
  'CASE-2026-0042': [
    { step: 1, title: 'Identity Document Verification', icon: '🪪', result: 'pass', detail: 'Passport valid until 2029. Name match confirmed. DOB consistent across documents.' },
    { step: 2, title: 'Proof of Address Verification', icon: '🏠', result: 'pass', detail: 'Bank statement dated within 3 months. Address matches KYC records.' },
    { step: 3, title: 'Source of Funds Review', icon: '💰', result: 'warning', detail: 'Declared salary USD 8,500/mo. Crypto holdings include Staking rewards — chain verification recommended.' },
    { step: 4, title: 'PEP & Adverse Media Screening', icon: '🔍', result: 'flag', detail: '1 PEP match found: Former regional government official (2018–2022). Adverse media: 2 minor articles. Requires L3 review.' },
    { step: 5, title: 'OSINT Investigation', icon: '🌐', result: 'warning', detail: 'LinkedIn profile verified. Employer confirmed. Previous political role documented in public records — consistent with PEP flag.' },
    { step: 6, title: 'Risk Score Aggregation', icon: '📊', result: 'flag', detail: 'Overall risk score: HIGH (78/100). PEP status + elevated transaction volume triggers mandatory escalation per EDD SOP §6.' },
  ],
  'CASE-2026-0043': [
    { step: 1, title: 'Identity Document Verification', icon: '🪪', result: 'pass', detail: 'National ID valid. Name match confirmed. No discrepancies.' },
    { step: 2, title: 'Proof of Address Verification', icon: '🏠', result: 'pass', detail: 'Utility bill confirmed. Address consistent.' },
    { step: 3, title: 'Source of Funds Review', icon: '💰', result: 'pass', detail: 'Salary slips from employer for 12 months. Consistent with deposit pattern.' },
    { step: 4, title: 'PEP & Adverse Media Screening', icon: '🔍', result: 'pass', detail: 'No PEP matches. No adverse media hits across 15 databases.' },
    { step: 5, title: 'OSINT Investigation', icon: '🌐', result: 'pass', detail: '3 mandatory checks completed. LinkedIn, company registry, news archives — all clear.' },
    { step: 6, title: 'Risk Score Aggregation', icon: '📊', result: 'pass', detail: 'Overall risk score: LOW (12/100). No red flags identified. Safe to approve.' },
  ],
  'CASE-2026-0044': [
    { step: 1, title: 'Identity Document Verification', icon: '🪪', result: 'pass', detail: 'Passport verified. Selfie match confirmed via face compare tool.' },
    { step: 2, title: 'ML Push Factors Review', icon: '🤖', result: 'warning', detail: 'ML model flagged: structuring pattern similarity 0.76 (threshold 0.8). 3 of 7 push factors agreed.' },
    { step: 3, title: 'Transaction Pattern Analysis', icon: '📈', result: 'warning', detail: 'Multiple sub-threshold transactions over 14 days. P2P transfers to 6 distinct counterparties.' },
    { step: 4, title: 'On-chain Exposure Analysis', icon: '⛓️', result: 'warning', detail: 'Elliptic Lens: 8% indirect exposure to high-risk exchanges. Below mandatory escalation threshold (10%).' },
    { step: 5, title: 'Source of Funds Verification', icon: '💰', result: 'warning', detail: 'Declared source: crypto trading profits. No supporting documentation provided. RFI required.' },
    { step: 6, title: 'Risk Score Aggregation', icon: '📊', result: 'warning', detail: 'Overall risk score: MEDIUM (54/100). RFI issued to obtain SOF documentation.' },
  ],
  'CASE-2026-0045': [
    { step: 1, title: 'Identity Document Verification', icon: '🪪', result: 'pass', detail: 'Passport valid. Full name match. DOB confirmed.' },
    { step: 2, title: 'Proof of Address Verification', icon: '🏠', result: 'pass', detail: 'Bank statement verified. Low-risk jurisdiction.' },
    { step: 3, title: 'Source of Funds Review', icon: '💰', result: 'pass', detail: 'Salary from verified employer. Annual income consistent with deposit amounts.' },
    { step: 4, title: 'PEP & Adverse Media Screening', icon: '🔍', result: 'pass', detail: 'No PEP exposure. No adverse media.' },
    { step: 5, title: 'OSINT Investigation', icon: '🌐', result: 'pass', detail: 'All 3 mandatory checks clear. No negative findings.' },
    { step: 6, title: 'Risk Score Aggregation', icon: '📊', result: 'pass', detail: 'Risk score: LOW (8/100). Approved for continued service.' },
  ],
  'CASE-2026-0046': [
    { step: 1, title: 'Identity Document Verification', icon: '🪪', result: 'pass', detail: 'Passport verified. Name match confirmed.' },
    { step: 2, title: 'Sanctions Screening', icon: '⚠️', result: 'flag', detail: '1 potential sanctions match identified. Name similarity 87%. Further investigation required — Possible Sanctions flag triggered.' },
    { step: 3, title: 'Adverse Media Screening', icon: '📰', result: 'flag', detail: '3 adverse media articles found: money laundering allegations (2023), regulatory investigation (2024).' },
    { step: 4, title: 'PEP Screening', icon: '🔍', result: 'flag', detail: 'Potential True PEP: Family member of current government official. L3 escalation mandatory per SOP §7.2.2.' },
    { step: 5, title: 'OSINT Investigation', icon: '🌐', result: 'flag', detail: 'Multiple adverse findings across news, company registry, legal databases. High confidence in negative profile.' },
    { step: 6, title: 'Risk Score Aggregation', icon: '📊', result: 'flag', detail: 'Risk score: CRITICAL (92/100). Mandatory escalation to L3 Compliance Screening team.' },
  ],
}

export const SKILLS_DATA = [
  {
    id: 'skill-edd-kyc',
    name: 'EDD-KYC Review',
    description: 'Enhanced Due Diligence - Identity & KYC verification for high-risk clients per EDD SOP v2.3',
    assignedAgents: 1,
    lastUpdated: '09 Oct 2025',
    steps: [
      { id: 1, name: 'Identity Document Verification', description: 'Check passport/ID validity, expiry, anti-forgery markers, photo match', decision: 'Pass/Fail' },
      { id: 2, name: 'Proof of Address Verification', description: 'Validate POA document: utility bill/bank statement within 3 months, address match', decision: 'Pass/Fail' },
      { id: 3, name: 'PEP & Adverse Media Screening', description: 'Screen against global PEP lists and adverse media databases; flag matches for L3', decision: 'Pass/Flag' },
      { id: 4, name: 'OSINT Investigation', description: '3 mandatory checks: client name, employer, professional history. Document all findings', decision: 'Pass/Flag' },
      { id: 5, name: 'Risk Score Aggregation', description: 'Aggregate all signals into overall risk score 0–100. Apply risk matrix from EDD SOP §5', decision: 'Score' },
      { id: 6, name: 'Disposition Decision', description: 'Based on risk score: Approve (<30), RFI (30–60), Escalate L3 (60–80), MLRO (>80)', decision: 'Approve/RFI/Escalate/Reject' },
    ],
  },
  {
    id: 'skill-edd-sof',
    name: 'EDD-SOF Review',
    description: 'Enhanced Due Diligence - Source of Funds and Source of Wealth verification per EDD SOP v2.3',
    assignedAgents: 1,
    lastUpdated: '09 Oct 2025',
    steps: [
      { id: 1, name: 'Fiat SOF Verification', description: 'Verify salary slips, tax returns, business income, inheritance documents', decision: 'Pass/Fail' },
      { id: 2, name: 'Crypto SOF Verification', description: 'Verify crypto sources: trading profits, staking, mining, DeFi, NFT (46 accepted types per EDD SOP)', decision: 'Pass/Flag' },
      { id: 3, name: 'Annual Income Breakdown', description: 'Request year-by-year breakdown matching declared wealth accumulation', decision: 'Pass/Fail' },
      { id: 4, name: 'Source of Wealth (SOW)', description: 'For limit increase requests: independent SOW evidence required beyond SOF', decision: 'Pass/Fail' },
      { id: 5, name: 'Consistency Check', description: 'Cross-reference SOF/SOW with transaction patterns and KYC profile', decision: 'Pass/Flag' },
    ],
  },
  {
    id: 'skill-ml-alert',
    name: 'ML Alert Review',
    description: 'Review ML model-triggered ICR cases (off-chain FTM + post on-chain CTM) per ML Cases SOP v1.0',
    assignedAgents: 1,
    lastUpdated: '30 Mar 2026',
    steps: [
      { id: 1, name: 'Pre-Check Evaluation', description: 'Check auto-close eligibility: similar case within 180d, ML score deviation ≤3%', decision: 'Auto-Close/Proceed' },
      { id: 2, name: 'ML Push Factors Review', description: 'Review each push factor: Agree/Disagree. Document rationale for each', decision: 'Agree/Disagree' },
      { id: 3, name: 'Transaction Pattern Analysis', description: 'Review AI-generated summary and checklist of transaction patterns', decision: 'Pass/Flag' },
      { id: 4, name: 'On-chain Exposure Analysis', description: 'Assess Elliptic exposure: category, direction, significance. Flag if >10% high-risk', decision: 'Pass/Flag' },
      { id: 5, name: 'Full Review (if triggered)', description: 'Additional risk factors: Elliptic screening, OSINT, device sharing, LE requests', decision: 'Pass/Flag' },
      { id: 6, name: 'Final Decision', description: 'Retain & Monitor / Escalate / Offboard based on aggregated findings', decision: 'Retain/Escalate/Offboard' },
    ],
  },
  {
    id: 'skill-l1-screening',
    name: 'Name Screening L1',
    description: 'L1 Maker role for name screening alerts: initial review of PEP, sanctions, adverse media per L1/L2 SOP v2.0',
    assignedAgents: 1,
    lastUpdated: '31 Jul 2025',
    steps: [
      { id: 1, name: 'Basic KYC Checks', description: 'Verify client identity, photo comparison, ID document validity', decision: 'Pass/Fail' },
      { id: 2, name: 'Identifier Review', description: 'Check name, DOB, nationality, address against alert subject data', decision: 'Match/No-Match' },
      { id: 3, name: 'False Alert Adjudication', description: 'Apply false alert rules including CN adjudication rules. Document reasoning', decision: 'False/Possible/True' },
      { id: 4, name: 'GPT OSINT Check', description: 'Use GPT-assisted OSINT via Haodesk. Apply country-specific approach', decision: 'Pass/Flag' },
      { id: 5, name: 'L1 Decision', description: 'Pass / Trigger RFI / Escalate to L2 / Escalate to L3 (Possible Sanctions/PEP)', decision: 'Pass/RFI/Escalate' },
    ],
  },
  {
    id: 'skill-l2-screening',
    name: 'Name Screening L2',
    description: 'L2 Checker role for vetting L1 decisions; final resolution authority per L1/L2 SOP v2.0',
    assignedAgents: 1,
    lastUpdated: '31 Jul 2025',
    steps: [
      { id: 1, name: 'L1 Decision Review', description: 'Review L1 analysis in full. Verify reasoning and documentation completeness', decision: 'Agree/Override' },
      { id: 2, name: 'Alert Re-adjudication', description: 'Independently assess: False / Possible / Potential True alert classification', decision: 'False/Possible/True' },
      { id: 3, name: 'RFI Trigger (if needed)', description: 'L2 has authority to directly trigger RFI to client', decision: 'Trigger/Skip' },
      { id: 4, name: 'L3/L4 Escalation', description: 'Escalate Possible Sanctions → L3, Potential True Sanctions/SSC cases → L4', decision: 'Pass/Escalate' },
      { id: 5, name: 'Final Resolution', description: 'L2 decision is final and overrides L1 in case of mismatch. Document override rationale', decision: 'Final' },
    ],
  },
]

export const DASHBOARD_DATA = {
  kpis: {
    todayCases: 58,
    avgProcessingTime: 4.2,
    interventionRate: 12,
    accuracy: 93.7,
  },
  casesPerAgent: [
    { agent: 'Wolverine', cases: 12 },
    { agent: 'Storm', cases: 18 },
    { agent: 'Cyclops', cases: 8 },
    { agent: 'Magneto', cases: 14 },
    { agent: 'Rogue', cases: 6 },
  ],
  hourlyVolume: Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, '0')}:00`,
    cases: i < 8 ? 0 : i < 10 ? Math.floor(Math.random() * 3 + 1) : i < 18 ? Math.floor(Math.random() * 6 + 2) : Math.floor(Math.random() * 3 + 1),
  })),
  outcomes: [
    { name: 'Approved', value: 65, color: '#22c55e' },
    { name: 'RFI Sent', value: 20, color: '#f59e0b' },
    { name: 'Escalated', value: 10, color: '#f97316' },
    { name: 'Rejected', value: 5, color: '#ef4444' },
  ],
  agentPerformance: [
    { name: 'Wolverine',  cases: 12, accuracy: 94.2, escalationRate: 8.3,  avgTime: '5.1 min' },
    { name: 'Storm',      cases: 18, accuracy: 96.5, escalationRate: 5.5,  avgTime: '3.2 min' },
    { name: 'Cyclops',    cases: 8,  accuracy: 91.8, escalationRate: 12.5, avgTime: '6.8 min' },
    { name: 'Magneto',    cases: 14, accuracy: 93.1, escalationRate: 7.1,  avgTime: '4.9 min' },
    { name: 'Rogue',      cases: 6,  accuracy: 95.0, escalationRate: 16.7, avgTime: '3.5 min' },
  ],
}
