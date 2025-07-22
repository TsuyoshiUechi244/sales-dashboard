<script setup lang="ts">
import { ref } from 'vue'

const facilities = ref([
  {
    id: 1,
    name: '銀座本店',
    score: 92,
    status: 'excellent',
    issues: [],
    lastCheck: '2024-03-15',
    categories: {
      cleanliness: 95,
      equipment: 90,
      accessibility: 88,
      safety: 96,
      atmosphere: 92
    }
  },
  {
    id: 2,
    name: '渋谷店',
    score: 78,
    status: 'good',
    issues: ['照明の一部が暗い', '待合エリアの椅子が古い'],
    lastCheck: '2024-03-14',
    categories: {
      cleanliness: 85,
      equipment: 75,
      accessibility: 80,
      safety: 82,
      atmosphere: 70
    }
  },
  {
    id: 3,
    name: '新宿店',
    score: 65,
    status: 'needs_improvement',
    issues: ['エアコンの効きが悪い', '床材の劣化', '音響設備の不具合'],
    lastCheck: '2024-03-13',
    categories: {
      cleanliness: 70,
      equipment: 55,
      accessibility: 75,
      safety: 68,
      atmosphere: 60
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

const getCategoryName = (key: string) => {
  const names = {
    cleanliness: '清潔性',
    equipment: '設備',
    accessibility: 'アクセス性',
    safety: '安全性',
    atmosphere: '雰囲気'
  }
  return names[key as keyof typeof names] || key
}
</script>

<template>
  <div class="facility-diagnosis-page">
    <div class="page-header">
      <div class="header-content">
        <div class="header-stats">
          <div class="stat-item">
            <div class="stat-value">{{ facilities.length }}</div>
            <div class="stat-label">診断済み店舗</div>
          </div>
          <div class="stat-item">
            <div class="stat-value text-success">{{ facilities.filter(f => f.status === 'excellent').length }}</div>
            <div class="stat-label">優秀店舗</div>
          </div>
          <div class="stat-item">
            <div class="stat-value text-warning">{{ facilities.filter(f => f.status === 'needs_improvement').length }}</div>
            <div class="stat-label">要改善店舗</div>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary">
            <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 4v6h-6M1 20v-6h6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            診断実行
          </button>
        </div>
      </div>
    </div>

    <div class="facilities-grid">
      <div class="row">
        <div v-for="facility in facilities" :key="facility.id" class="col-lg-6 mb-4">
          <div class="facility-card">
            <div class="facility-header">
              <div class="facility-info">
                <h5 class="facility-name">{{ facility.name }}</h5>
                <div class="facility-meta">
                  <span :class="['badge', 'me-2', getStatusBadge(facility.status)]">
                    {{ getStatusText(facility.status) }}
                  </span>
                  <span class="last-check">最終診断: {{ facility.lastCheck }}</span>
                </div>
              </div>
              <div class="facility-score">
                <div :class="['score-value', getScoreColor(facility.score)]">{{ facility.score }}</div>
                <div class="score-label">総合スコア</div>
              </div>
            </div>

            <div class="categories-section">
              <h6 class="section-title">カテゴリ別評価</h6>
              <div class="categories-grid">
                <div v-for="(score, key) in facility.categories" :key="key" class="category-item">
                  <div class="category-header">
                    <span class="category-name">{{ getCategoryName(key) }}</span>
                    <span :class="['category-score', getScoreColor(score)]">{{ score }}</span>
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

            <div v-if="facility.issues.length > 0" class="issues-section">
              <h6 class="section-title">
                <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" stroke-width="2" fill="none"/>
                  <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2"/>
                  <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" stroke-width="2"/>
                </svg>
                改善が必要な項目
              </h6>
              <ul class="issues-list">
                <li v-for="(issue, index) in facility.issues" :key="index" class="issue-item">
                  {{ issue }}
                </li>
              </ul>
            </div>

            <div class="facility-actions">
              <button class="btn btn-outline-primary btn-sm">
                <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" fill="none"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                詳細レポート
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

    <!-- Diagnosis Summary -->
    <div class="summary-section">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">診断サマリー</h5>
          <div class="row">
            <div class="col-md-8">
              <div class="summary-chart">
                <h6>全店舗平均スコア</h6>
                <div class="average-score">
                  <div class="score-circle">
                    <div class="score-value">{{ Math.round(facilities.reduce((sum, f) => sum + f.score, 0) / facilities.length) }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="recommendations">
                <h6>推奨アクション</h6>
                <ul class="recommendation-list">
                  <li>設備の定期メンテナンス強化</li>
                  <li>清潔性チェックリストの導入</li>
                  <li>スタッフ向け施設管理研修</li>
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
.facility-diagnosis-page {
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

.facility-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  height: 100%;
  transition: var(--transition-normal);
}

.facility-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--border-medium);
}

.facility-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.facility-name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
}

.facility-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.last-check {
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.facility-score {
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

.categories-section {
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

.categories-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.category-item {
  background: var(--bg-secondary);
  padding: 0.75rem;
  border-radius: var(--radius-md);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.category-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.category-score {
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

.facility-actions {
  display: flex;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-light);
}

.summary-section {
  margin-top: 2rem;
}

.summary-chart {
  text-align: center;
}

.average-score {
  margin-top: 1rem;
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-color), var(--success-color));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
}

.score-circle::before {
  content: '';
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--bg-primary);
}

.score-circle .score-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  z-index: 1;
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
}

.recommendation-list li:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .facility-diagnosis-page {
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
  
  .facility-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .facility-actions {
    flex-direction: column;
  }
}
</style>