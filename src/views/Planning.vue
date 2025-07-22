<script setup lang="ts">
import { ref } from 'vue'

const campaigns = ref([
  {
    id: 1,
    title: '春の特別キャンペーン',
    status: '計画中',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    target: 'Bランク以下の店舗',
    description: '春季メニューの販促強化により売上向上を目指す',
    priority: 'high',
    budget: '¥500,000',
    expectedROI: '150%'
  },
  {
    id: 2,
    title: 'ゴールデンウィーク特集',
    status: '承認待ち',
    startDate: '2024-05-01',
    endDate: '2024-05-07',
    target: '全店舗',
    description: '連休期間の集客施策と特別メニューの展開',
    priority: 'medium',
    budget: '¥800,000',
    expectedROI: '120%'
  },
  {
    id: 3,
    title: '夏季限定プラン',
    status: '実行中',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    target: 'Aランク以上の店舗',
    description: '夏の特別メニューと冷たいドリンクの販促',
    priority: 'low',
    budget: '¥300,000',
    expectedROI: '110%'
  }
])

const newCampaign = ref({
  title: '',
  startDate: '',
  endDate: '',
  target: '',
  description: '',
  priority: 'medium',
  budget: '',
  expectedROI: ''
})

const showNewCampaignForm = ref(false)

const submitCampaign = () => {
  campaigns.value.push({
    id: campaigns.value.length + 1,
    status: '計画中',
    ...newCampaign.value
  })
  showNewCampaignForm.value = false
  newCampaign.value = {
    title: '',
    startDate: '',
    endDate: '',
    target: '',
    description: '',
    priority: 'medium',
    budget: '',
    expectedROI: ''
  }
}

const getStatusBadge = (status: string) => {
  const badges = {
    '計画中': 'bg-warning',
    '承認待ち': 'bg-info',
    '実行中': 'bg-success',
    '完了': 'bg-secondary',
    '中止': 'bg-danger'
  }
  return badges[status as keyof typeof badges] || 'bg-secondary'
}

const getPriorityBadge = (priority: string) => {
  const badges = {
    'high': 'bg-danger',
    'medium': 'bg-warning',
    'low': 'bg-success'
  }
  return badges[priority as keyof typeof badges] || 'bg-secondary'
}

const getPriorityText = (priority: string) => {
  const texts = {
    'high': '高',
    'medium': '中',
    'low': '低'
  }
  return texts[priority as keyof typeof texts] || '不明'
}

const getStatusIcon = (status: string) => {
  const icons = {
    '計画中': 'M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    '承認待ち': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    '実行中': 'M13 10V3L4 14h7v7l9-11h-7z',
    '完了': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    '中止': 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
  }
  return icons[status as keyof typeof icons] || icons['計画中']
}

const getPriorityIcon = (priority: string) => {
  const icons = {
    'high': 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z',
    'medium': 'M13 10V3L4 14h7v7l9-11h-7z',
    'low': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  }
  return icons[priority as keyof typeof icons] || icons['medium']
}

const calculateDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}
</script>

<template>
  <div class="planning-page">
    <div class="planning-header">
      <div>
        <h1 class="planning-title">企画立案</h1>
        <p class="planning-subtitle">マーケティングキャンペーンの企画・管理</p>
      </div>
      <button 
        class="btn btn-primary" 
        @click="showNewCampaignForm = !showNewCampaignForm"
      >
        <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2"/>
          <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2"/>
        </svg>
        新規企画作成
      </button>
    </div>

    <!-- Summary Statistics -->
    <div class="row mb-4">
      <div class="col-md-3 mb-3">
        <div class="card metric-card fade-in-up">
          <div class="card-body text-center">
            <div class="metric-value text-primary">{{ campaigns.length }}</div>
            <div class="metric-label">総企画数</div>
            <div class="metric-change neutral">
              <svg class="me-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              管理中
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card metric-card fade-in-up">
          <div class="card-body text-center">
            <div class="metric-value text-success">{{ campaigns.filter(c => c.status === '実行中').length }}</div>
            <div class="metric-label">実行中</div>
            <div class="metric-change positive">
              <svg class="me-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              アクティブ
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card metric-card fade-in-up">
          <div class="card-body text-center">
            <div class="metric-value text-warning">{{ campaigns.filter(c => c.status === '承認待ち').length }}</div>
            <div class="metric-label">承認待ち</div>
            <div class="metric-change neutral">
              <svg class="me-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              待機中
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card metric-card fade-in-up">
          <div class="card-body text-center">
            <div class="metric-value text-info">¥1.6M</div>
            <div class="metric-label">総予算</div>
            <div class="metric-change positive">
              <svg class="me-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              予算内
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- New Campaign Form -->
    <div class="card mb-4 fade-in-up" v-if="showNewCampaignForm">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 class="card-title mb-1">新規企画の作成</h5>
            <p class="card-subtitle mb-0">新しいマーケティングキャンペーンを企画します</p>
          </div>
          <button type="button" class="btn-close" @click="showNewCampaignForm = false"></button>
        </div>
        <form @submit.prevent="submitCampaign">
          <div class="row">
            <div class="col-md-8 mb-3">
              <label class="form-label">企画タイトル</label>
              <input v-model="newCampaign.title" type="text" class="form-control" placeholder="企画名を入力してください" required>
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label">優先度</label>
              <select v-model="newCampaign.priority" class="form-select" required>
                <option value="high">高優先度</option>
                <option value="medium">中優先度</option>
                <option value="low">低優先度</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label">開始日</label>
              <input v-model="newCampaign.startDate" type="date" class="form-control" required>
            </div>
            <div class="col-md-6">
              <label class="form-label">終了日</label>
              <input v-model="newCampaign.endDate" type="date" class="form-control" required>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-4">
              <label class="form-label">対象店舗</label>
              <select v-model="newCampaign.target" class="form-select" required>
                <option value="">選択してください</option>
                <option value="全店舗">全店舗</option>
                <option value="Sランクの店舗">Sランクの店舗</option>
                <option value="Aランク以上の店舗">Aランク以上の店舗</option>
                <option value="Bランク以下の店舗">Bランク以下の店舗</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">予算</label>
              <input v-model="newCampaign.budget" type="text" class="form-control" placeholder="¥500,000" required>
            </div>
            <div class="col-md-4">
              <label class="form-label">期待ROI</label>
              <input v-model="newCampaign.expectedROI" type="text" class="form-control" placeholder="120%" required>
            </div>
          </div>
          <div class="mb-4">
            <label class="form-label">企画詳細</label>
            <textarea v-model="newCampaign.description" class="form-control" rows="3" placeholder="企画の詳細を入力してください" required></textarea>
          </div>
          <div class="d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-secondary" @click="showNewCampaignForm = false">キャンセル</button>
            <button type="submit" class="btn btn-primary">
              <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" stroke-width="2" fill="none"/>
                <polyline points="17,21 17,13 7,13 7,21" stroke="currentColor" stroke-width="2" fill="none"/>
                <polyline points="7,3 7,8 15,8" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              保存
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Campaign List -->
    <div class="row">
      <div class="col-lg-4 mb-4" v-for="campaign in campaigns" :key="campaign.id">
        <div class="card campaign-card fade-in-up">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div class="flex-grow-1">
                <h5 class="campaign-title">{{ campaign.title }}</h5>
                <div class="campaign-meta">
                  <span :class="['badge', 'me-2', getStatusBadge(campaign.status)]">
                    <svg class="me-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path :d="getStatusIcon(campaign.status)" stroke="currentColor" stroke-width="2" fill="none"/>
                    </svg>
                    {{ campaign.status }}
                  </span>
                  <span :class="['badge', getPriorityBadge(campaign.priority)]">
                    <svg class="me-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path :d="getPriorityIcon(campaign.priority)" stroke="currentColor" stroke-width="2" fill="none"/>
                    </svg>
                    {{ getPriorityText(campaign.priority) }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="campaign-metrics mb-3">
              <div class="row text-center">
                <div class="col-4">
                  <div class="metric-value text-primary">{{ campaign.budget }}</div>
                  <div class="metric-label">予算</div>
                </div>
                <div class="col-4">
                  <div class="metric-value text-success">{{ campaign.expectedROI }}</div>
                  <div class="metric-label">期待ROI</div>
                </div>
                <div class="col-4">
                  <div class="metric-value text-info">{{ calculateDuration(campaign.startDate, campaign.endDate) }}日</div>
                  <div class="metric-label">期間</div>
                </div>
              </div>
            </div>
            
            <div class="campaign-details mb-4">
              <div class="detail-item">
                <svg class="me-2" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
                </svg>
                <span class="detail-label">期間：</span>
                <span class="detail-value">{{ campaign.startDate }} 〜 {{ campaign.endDate }}</span>
              </div>
              <div class="detail-item">
                <svg class="me-2" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                <span class="detail-label">対象：</span>
                <span class="detail-value">{{ campaign.target }}</span>
              </div>
              <div class="detail-item">
                <svg class="me-2" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" fill="none"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" fill="none"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2"/>
                </svg>
                <span class="detail-label">詳細：</span>
                <span class="detail-value">{{ campaign.description }}</span>
              </div>
            </div>
            
            <div class="campaign-actions">
              <button class="btn btn-outline-primary btn-sm">
                <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" fill="none"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                編集
              </button>
              <button class="btn btn-outline-success btn-sm">
                <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" fill="none"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                詳細
              </button>
              <button v-if="campaign.status === '計画中'" class="btn btn-success btn-sm">
                <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" fill="none"/>
                  <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                承認申請
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="campaigns.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
      </div>
      <h4 class="empty-title">企画がありません</h4>
      <p class="empty-description">新しい企画を作成して始めましょう</p>
      <button class="btn btn-primary" @click="showNewCampaignForm = true">
        <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2"/>
          <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2"/>
        </svg>
        最初の企画を作成
      </button>
    </div>
  </div>
</template>

<style scoped>
.planning-page {
  padding: 2rem;
  background-color: var(--bg-secondary);
  min-height: 100vh;
}

.planning-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.planning-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
}

.planning-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 0;
}

.campaign-card {
  transition: var(--transition-normal);
  height: 100%;
}

.campaign-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.campaign-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
  line-height: 1.4;
}

.campaign-meta {
  margin-bottom: 1rem;
}

.campaign-metrics {
  padding: 1rem;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  margin-bottom: 1rem;
}

.campaign-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  font-size: 0.875rem;
  line-height: 1.4;
}

.detail-label {
  font-weight: 500;
  color: var(--text-secondary);
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.detail-value {
  color: var(--text-primary);
}

.campaign-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.campaign-actions .btn {
  flex: 1;
  min-width: 0;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.empty-title {
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.empty-description {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .planning-page {
    padding: 1rem;
  }
  
  .planning-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .planning-title {
    font-size: 1.5rem;
  }
  
  .campaign-actions {
    flex-direction: column;
  }
  
  .campaign-actions .btn {
    flex: none;
  }
}
</style>