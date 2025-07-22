<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const storeId = route.params.id

// 店舗データ（実際のアプリケーションではAPIから取得）
const storeData = ref({
  'A001': {
    id: 'A001',
    name: '銀座本店',
    rank: 'A',
    score: 95,
    address: '東京都中央区銀座1-1-1',
    phone: '03-1234-5678',
    hours: '11:00-22:00',
    closedDays: '年中無休',
    capacity: 120,
    parking: '有り（20台）',
    access: 'JR山手線 有楽町駅 徒歩3分',
    monthlyGrowth: 15,
    yearlyGrowth: 25,
    issues: [],
    lastUpdate: '2024-03-15',
    description: '銀座の中心地に位置する当店の旗艦店。洗練された空間で最高級の料理とサービスをご提供いたします。',
    features: ['個室あり', 'カード利用可', '禁煙席あり', 'Wi-Fi完備'],
    reviewScores: {
      overall: 4.53,
      plan: 4.58,
      atmosphere: 4.62,
      food: 4.64,
      cost: 4.37,
      service: 4.46,
      reviewCount: 1247
    },
    salesData: {
      current: 2800000,
      previous: 2650000,
      target: 2900000
    },
    popularPlans: [
      { name: 'プレミアムコース', price: 15000, popularity: 95 },
      { name: 'スタンダードコース', price: 8000, popularity: 88 },
      { name: 'ライトコース', price: 5000, popularity: 72 }
    ]
  },
  'B001': {
    id: 'B001',
    name: '池袋店',
    rank: 'B',
    score: 82,
    address: '東京都豊島区池袋2-2-2',
    phone: '03-2345-6789',
    hours: '11:30-21:30',
    closedDays: '月曜日',
    capacity: 80,
    parking: '無し',
    access: 'JR山手線 池袋駅 徒歩5分',
    monthlyGrowth: 5,
    yearlyGrowth: 12,
    issues: ['プラン見直し必要'],
    lastUpdate: '2024-03-15',
    description: '池袋の賑やかな街に位置する店舗。アクセス抜群で幅広い年齢層のお客様にご利用いただいています。',
    features: ['カード利用可', '禁煙席あり', 'テイクアウト可'],
    reviewScores: {
      overall: 4.12,
      plan: 4.05,
      atmosphere: 4.18,
      food: 4.25,
      cost: 3.95,
      service: 4.08,
      reviewCount: 892
    },
    salesData: {
      current: 1650000,
      previous: 1580000,
      target: 1750000
    },
    popularPlans: [
      { name: 'スタンダードコース', price: 7000, popularity: 82 },
      { name: 'ライトコース', price: 4500, popularity: 75 },
      { name: 'ファミリーコース', price: 6000, popularity: 68 }
    ]
  }
})

const currentStoreData = computed(() => {
  return storeData.value[storeId as keyof typeof storeData.value] || storeData.value['A001']
})

const getRankBadge = (rank: string) => {
  const badges = {
    'S': 'bg-success',
    'A': 'bg-primary',
    'B': 'bg-warning',
    'C': 'bg-danger',
    'D': 'bg-dark',
    'E': 'bg-secondary'
  }
  return badges[rank as keyof typeof badges] || 'bg-secondary'
}

const getGrowthColor = (growth: number) => {
  if (growth > 0) return 'text-success'
  if (growth < 0) return 'text-danger'
  return 'text-secondary'
}

const getGrowthIcon = (growth: number) => {
  if (growth > 0) return 'M23 6l-9.5 9.5-5-5L1 18'
  if (growth < 0) return 'M23 18l-9.5-9.5-5 5L1 6'
  return 'M5 12h14'
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0
  }).format(amount)
}

const getScoreColor = (score: number) => {
  if (score >= 4.5) return 'text-success'
  if (score >= 4.0) return 'text-primary'
  if (score >= 3.5) return 'text-warning'
  return 'text-danger'
}

const reviewCategories = [
  { key: 'plan', label: 'プラン' },
  { key: 'atmosphere', label: '雰囲気' },
  { key: 'food', label: '料理' },
  { key: 'cost', label: 'コストパフォーマンス' },
  { key: 'service', label: 'サービス' }
]
</script>

<template>
  <div class="store-detail-page">
    <!-- Store Header -->
    <div class="store-header">
      <div class="header-content">
        <div class="store-info">
          <div class="store-title-section">
            <h1 class="store-name">{{ currentStoreData.name }}</h1>
            <div class="store-badges">
              <span :class="['badge', 'me-2', getRankBadge(currentStoreData.rank)]">
                {{ currentStoreData.rank }}ランク
              </span>
              <span class="badge bg-info">スコア {{ currentStoreData.score }}</span>
            </div>
          </div>
          <p class="store-description">{{ currentStoreData.description }}</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-outline-primary">
            <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" fill="none"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            編集
          </button>
          <button class="btn btn-primary">
            <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" fill="none"/>
              <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            レポート出力
          </button>
        </div>
      </div>
    </div>


    <!-- Review Scores -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="card fade-in-up">
          <div class="card-body">
            <h5 class="card-title mb-4">口コミ評価</h5>
            <div class="review-scores-container">
              <!-- 総合評価 -->
              <div class="review-score-item overall">
                <div class="score-label">総合評価</div>
                <div class="score-display">
                  <div class="stars">
                    {{ '★'.repeat(Math.floor(currentStoreData.reviewScores.overall)) }}{{ '☆'.repeat(5 - Math.floor(currentStoreData.reviewScores.overall)) }}
                  </div>
                  <div class="score-value">{{ currentStoreData.reviewScores.overall }}</div>
                </div>
                <div class="review-count">{{ currentStoreData.reviewScores.reviewCount }}件のレビュー</div>
              </div>
              
              <!-- その他の評価項目 -->
              <div v-for="category in reviewCategories" :key="category.key" class="review-score-item">
                <div class="score-label">{{ category.label }}</div>
                <div class="score-display">
                  <div class="stars">
                    {{ '★'.repeat(Math.floor(currentStoreData.reviewScores[category.key])) }}{{ '☆'.repeat(5 - Math.floor(currentStoreData.reviewScores[category.key])) }}
                  </div>
                  <div class="score-value">{{ currentStoreData.reviewScores[category.key] }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Store Information -->
    <div class="row mb-4">
      <div class="col-lg-8 mb-4">
        <div class="card fade-in-up">
          <div class="card-body">
            <h5 class="card-title mb-4">店舗情報</h5>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">
                  <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2" fill="none"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                  住所
                </div>
                <div class="info-value">{{ currentStoreData.address }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                  電話番号
                </div>
                <div class="info-value">{{ currentStoreData.phone }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                  営業時間
                </div>
                <div class="info-value">{{ currentStoreData.hours }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  定休日
                </div>
                <div class="info-value">{{ currentStoreData.closedDays }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                  収容人数
                </div>
                <div class="info-value">{{ currentStoreData.capacity }}席</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" stroke="currentColor" stroke-width="2" fill="none"/>
                    <circle cx="7" cy="17" r="2" stroke="currentColor" stroke-width="2" fill="none"/>
                    <circle cx="17" cy="17" r="2" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                  駐車場
                </div>
                <div class="info-value">{{ currentStoreData.parking }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4M9 11V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M9 11h6" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                  アクセス
                </div>
                <div class="info-value">{{ currentStoreData.access }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">
                  <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                  最終更新
                </div>
                <div class="info-value">{{ currentStoreData.lastUpdate }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4 mb-4">
        <div class="card fade-in-up">
          <div class="card-body">
            <h5 class="card-title mb-4">店舗特徴</h5>
            <div class="features-list">
              <div v-for="feature in currentStoreData.features" :key="feature" class="feature-item">
                <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20,6 9,17 4,12" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                {{ feature }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Popular Plans -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="card fade-in-up">
          <div class="card-body">
            <h5 class="card-title mb-4">人気プラン</h5>
            <div class="row">
              <div v-for="plan in currentStoreData.popularPlans" :key="plan.name" class="col-md-4 mb-3">
                <div class="plan-card">
                  <div class="plan-header">
                    <h6 class="plan-name">{{ plan.name }}</h6>
                    <div class="plan-price">{{ formatCurrency(plan.price) }}</div>
                  </div>
                  <div class="plan-popularity">
                    <div class="popularity-label">人気度</div>
                    <div class="popularity-bar">
                      <div class="popularity-fill" :style="{ width: plan.popularity + '%' }"></div>
                    </div>
                    <div class="popularity-value">{{ plan.popularity }}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Issues Section -->
    <div v-if="currentStoreData.issues.length > 0" class="row mb-4">
      <div class="col-12">
        <div class="card fade-in-up">
          <div class="card-body">
            <h5 class="card-title mb-4">
              <svg class="me-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" stroke-width="2" fill="none"/>
                <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2"/>
                <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" stroke-width="2"/>
              </svg>
              改善が必要な課題
            </h5>
            <div class="issues-list">
              <div v-for="(issue, index) in currentStoreData.issues" :key="index" class="issue-item">
                <div class="issue-priority">高</div>
                <div class="issue-content">
                  <div class="issue-title">{{ issue }}</div>
                  <div class="issue-date">発見日: {{ currentStoreData.lastUpdate }}</div>
                </div>
                <div class="issue-actions">
                  <button class="btn btn-outline-primary btn-sm">対応</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.store-detail-page {
  padding: 2rem;
  background-color: var(--bg-secondary);
  min-height: 100vh;
}

.store-header {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.store-title-section {
  margin-bottom: 1rem;
}

.store-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
}

.store-badges {
  display: flex;
  gap: 0.75rem;
}

.store-description {
  color: var(--text-secondary);
  font-size: 1.125rem;
  line-height: 1.6;
  margin: 0;
  max-width: 600px;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-label {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: 500;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-weight: 500;
}

.plan-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  height: 100%;
  transition: var(--transition-normal);
}

.plan-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-medium);
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.plan-name {
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.plan-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent-color);
}

.plan-popularity {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.popularity-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.popularity-bar {
  height: 8px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  overflow: hidden;
}

.popularity-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--success-color), var(--accent-color));
  border-radius: 4px;
  transition: width 0.6s ease;
}

.popularity-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  text-align: right;
}

.issues-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.issue-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: var(--radius-lg);
}

.issue-priority {
  background: var(--danger-color);
  color: var(--text-white);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
  font-weight: 600;
  flex-shrink: 0;
}

.issue-content {
  flex: 1;
}

.issue-title {
  font-weight: 600;
  color: #991b1b;
  margin-bottom: 0.25rem;
}

.issue-date {
  font-size: 0.8125rem;
  color: #7f1d1d;
}

.issue-actions {
  flex-shrink: 0;
}

.review-scores-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

.review-score-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 120px;
}

.review-score-item.overall {
  border-right: 1px solid var(--border-light);
  padding-right: 2rem;
  margin-right: 1rem;
}

.score-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.score-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stars {
  font-size: 1rem;
  color: #fbbf24;
  letter-spacing: 1px;
}

.score-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.review-count {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.sales-chart {
  padding: 1rem 0;
}

.chart-container {
  display: flex;
  justify-content: space-around;
  align-items: end;
  height: 200px;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
}

.chart-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.bar-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.bar-wrapper {
  height: 120px;
  width: 40px;
  display: flex;
  align-items: end;
  position: relative;
}

.bar {
  width: 100%;
  border-radius: 4px 4px 0 0;
  transition: height 0.6s ease;
  min-height: 10px;
}

.bar-previous {
  background: var(--warning-color);
}

.bar-current {
  background: var(--success-color);
}

.bar-target {
  background: var(--accent-color);
}

.bar-value {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
}

.analysis-metrics {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.analysis-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.analysis-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.analysis-value {
  font-size: 1.25rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  .store-detail-page {
    padding: 1rem;
  }
  
  .store-header {
    padding: 1.5rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .store-name {
    font-size: 2rem;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .header-actions .btn {
    flex: 1;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .review-scores-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .review-score-item.overall {
    border-right: none;
    border-bottom: 1px solid var(--border-light);
    padding-right: 0;
    padding-bottom: 1rem;
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .issue-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .chart-container {
    height: 150px;
  }
  
  .bar-wrapper {
    height: 80px;
    width: 30px;
  }
  
  .bar-value {
    font-size: 0.6875rem;
  }
}
</style>