<script setup lang="ts">
import { ref } from 'vue'

const plans = ref([
  {
    id: 1,
    storeName: '銀座本店',
    planName: 'プレミアムコース',
    score: 88,
    status: 'good',
    price: 15000,
    popularity: 92,
    profitability: 85,
    issues: ['価格設定の見直し検討'],
    lastUpdate: '2024-03-15',
    metrics: {
      description: 90,
      pricing: 82,
      appeal: 95,
      competition: 88,
      seasonality: 85
    }
  },
  {
    id: 2,
    storeName: '渋谷店',
    planName: 'スタンダードコース',
    score: 72,
    status: 'needs_improvement',
    price: 8000,
    popularity: 68,
    profitability: 75,
    issues: ['プラン説明の充実が必要', '競合との差別化不足'],
    lastUpdate: '2024-03-14',
    metrics: {
      description: 65,
      pricing: 78,
      appeal: 70,
      competition: 60,
      seasonality: 85
    }
  },
  {
    id: 3,
    storeName: '新宿店',
    planName: 'ライトコース',
    score: 58,
    status: 'poor',
    price: 5000,
    popularity: 45,
    profitability: 52,
    issues: ['プラン内容の大幅見直し必要', '価格競争力不足', '魅力度向上が急務'],
    lastUpdate: '2024-03-13',
    metrics: {
      description: 50,
      pricing: 55,
      appeal: 45,
      competition: 65,
      seasonality: 75
    }
  }
])

const getStatusBadge = (status: string) => {
  const badges = {
    'excellent': 'bg-success',
    'good': 'bg-primary',
    'needs_improvement': 'bg-warning',
    'poor': 'bg-danger'
  }
  return badges[status as keyof typeof badges] || 'bg-secondary'
}

const getStatusText = (status: string) => {
  const texts = {
    'excellent': '優秀',
    'good': '良好',
    'needs_improvement': '要改善',
    'poor': '不良'
  }
  return texts[status as keyof typeof texts] || '不明'
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-success'
  if (score >= 80) return 'text-primary'
  if (score >= 70) return 'text-warning'
  return 'text-danger'
}

const getMetricName = (key: string) => {
  const names = {
    description: 'プラン説明',
    pricing: '価格設定',
    appeal: '魅力度',
    competition: '競合優位性',
    seasonality: '季節適応性'
  }
  return names[key as keyof typeof names] || key
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0
  }).format(amount)
}
</script>

<template>
  <div class="plan-diagnosis-page">
    <div class="page-header">
      <div class="header-content">
        <div class="header-stats">
          <div class="stat-item">
            <div class="stat-value">{{ plans.length }}</div>
            <div class="stat-label">診断済みプラン</div>
          </div>
          <div class="stat-item">
            <div class="stat-value text-success">{{ plans.filter(p => p.status === 'good').length }}</div>
            <div class="stat-label">良好プラン</div>
          </div>
          <div class="stat-item">
            <div class="stat-value text-danger">{{ plans.filter(p => p.status === 'poor').length }}</div>
            <div class="stat-label">要改善プラン</div>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary">
            <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 4v6h-6M1 20v-6h6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            プラン診断実行
          </button>
        </div>
      </div>
    </div>

    <div class="plans-grid">
      <div class="row">
        <div v-for="plan in plans" :key="plan.id" class="col-lg-6 mb-4">
          <div class="plan-card">
            <div class="plan-header">
              <div class="plan-info">
                <h5 class="plan-name">{{ plan.planName }}</h5>
                <div class="store-name">{{ plan.storeName }}</div>
                <div class="plan-meta">
                  <span :class="['badge', 'me-2', getStatusBadge(plan.status)]">
                    {{ getStatusText(plan.status) }}
                  </span>
                  <span class="plan-price">{{ formatCurrency(plan.price) }}</span>
                </div>
              </div>
              <div class="plan-score">
                <div :class="['score-value', getScoreColor(plan.score)]">{{ plan.score }}</div>
                <div class="score-label">総合スコア</div>
              </div>
            </div>

            <div class="plan-metrics">
              <div class="metrics-row">
                <div class="metric-item">
                  <div class="metric-label">人気度</div>
                  <div :class="['metric-value', getScoreColor(plan.popularity)]">{{ plan.popularity }}%</div>
                </div>
                <div class="metric-item">
                  <div class="metric-label">収益性</div>
                  <div :class="['metric-value', getScoreColor(plan.profitability)]">{{ plan.profitability }}%</div>
                </div>
              </div>
            </div>

            <div class="detailed-metrics">
              <h6 class="section-title">詳細評価</h6>
              <div class="metrics-grid">
                <div v-for="(score, key) in plan.metrics" :key="key" class="metric-detail">
                  <div class="metric-header">
                    <span class="metric-name">{{ getMetricName(key) }}</span>
                    <span :class="['metric-score', getScoreColor(score)]">{{ score }}</span>
                  </div>
                  <div class="progress">
                    <div 
                      class="progress-bar" 
                      :class="getScoreColor(score).replace('text-', 'bg-')"
                      :style="{ width: score + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="plan.issues.length > 0" class="issues-section">
              <h6 class="section-title">
                <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" stroke-width="2" fill="none"/>
                  <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2"/>
                  <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" stroke-width="2"/>
                </svg>
                改善が必要な項目
              </h6>
              <ul class="issues-list">
                <li v-for="(issue, index) in plan.issues" :key="index" class="issue-item">
                  {{ issue }}
                </li>
              </ul>
            </div>

            <div class="plan-footer">
              <div class="last-update">
                <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                最終更新: {{ plan.lastUpdate }}
              </div>
              <div class="plan-actions">
                <button class="btn btn-outline-primary btn-sm">
                  <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" fill="none"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                  編集
                </button>
                <button class="btn btn-outline-success btn-sm">
                  <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 4v6h-6M1 20v-6h6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                  再診断
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Analysis Summary -->
    <div class="summary-section">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">プラン分析サマリー</h5>
          <div class="row">
            <div class="col-md-4">
              <div class="summary-metric">
                <div class="metric-icon text-primary">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                </div>
                <div class="metric-content">
                  <div class="metric-value">{{ Math.round(plans.reduce((sum, p) => sum + p.popularity, 0) / plans.length) }}%</div>
                  <div class="metric-label">平均人気度</div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="summary-metric">
                <div class="metric-icon text-success">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                </div>
                <div class="metric-content">
                  <div class="metric-value">{{ Math.round(plans.reduce((sum, p) => sum + p.profitability, 0) / plans.length) }}%</div>
                  <div class="metric-label">平均収益性</div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="summary-metric">
                <div class="metric-icon text-warning">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                </div>
                <div class="metric-content">
                  <div class="metric-value">{{ formatCurrency(Math.round(plans.reduce((sum, p) => sum + p.price, 0) / plans.length)) }}</div>
                  <div class="metric-label">平均価格</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="recommendations mt-4">
            <h6>推奨改善アクション</h6>
            <div class="row">
              <div class="col-md-6">
                <ul class="recommendation-list">
                  <li>プラン説明文の充実化</li>
                  <li>競合分析に基づく差別化</li>
                  <li>季節性を考慮したプラン調整</li>
                </ul>
              </div>
              <div class="col-md-6">
                <ul class="recommendation-list">
                  <li>価格設定の最適化</li>
                  <li>顧客ニーズに基づく魅力度向上</li>
                  <li>定期的なプラン見直し体制構築</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.plan-diagnosis-page {
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.plan-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  height: 100%;
  transition: var(--transition-normal);
}

.plan-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--border-medium);
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.plan-name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
}

.store-name {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.plan-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.plan-price {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1rem;
}

.plan-score {
  text-align: center;
}

.score-value {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.score-label {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.plan-metrics {
  margin-bottom: 1.5rem;
}

.metrics-row {
  display: flex;
  gap: 1rem;
}

.metric-item {
  flex: 1;
  text-align: center;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.metric-label {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 600;
}

.detailed-metrics {
  margin-bottom: 1.5rem;
}

.section-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
}

.metrics-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.metric-detail {
  background: var(--bg-secondary);
  padding: 0.75rem;
  border-radius: var(--radius-md);
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.metric-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.metric-score {
  font-size: 0.875rem;
  font-weight: 600;
}

.progress {
  height: 6px;
  border-radius: 3px;
  background-color: var(--bg-tertiary);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s ease;
}

.issues-section {
  margin-bottom: 1.5rem;
}

.issues-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.issue-item {
  padding: 0.5rem 0.75rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: var(--radius-md);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #991b1b;
}

.plan-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border-light);
}

.last-update {
  font-size: 0.8125rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
}

.plan-actions {
  display: flex;
  gap: 0.5rem;
}

.summary-section {
  margin-top: 2rem;
}

.summary-metric {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  margin-bottom: 1rem;
}

.metric-icon {
  flex-shrink: 0;
}

.metric-content .metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: 0.25rem;
}

.metric-content .metric-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.recommendations h6 {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.recommendation-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recommendation-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-light);
  font-size: 0.875rem;
  color: var(--text-secondary);
  position: relative;
  padding-left: 1.5rem;
}

.recommendation-list li:before {
  content: '•';
  color: var(--accent-color);
  font-weight: bold;
  position: absolute;
  left: 0;
}

.recommendation-list li:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .plan-diagnosis-page {
    padding: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .header-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .plan-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .metrics-row {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .plan-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .plan-actions {
    justify-content: stretch;
  }
  
  .plan-actions .btn {
    flex: 1;
  }
}
</style>