<script setup lang="ts">
import { ref, computed } from 'vue'
import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)

// アコーディオンの開閉状態
const expandedRanks = ref<Set<string>>(new Set())

// 店舗データ
const stores = ref([
  // Aランク
  { id: 'A001', name: '銀座本店', area: '東京', rank: 'A', score: 95, monthlyGrowth: 15, yearlyGrowth: 25, issues: '特になし', lastUpdate: '2024-03-15' },
  { id: 'A002', name: '表参道店', area: '東京', rank: 'A', score: 92, monthlyGrowth: 12, yearlyGrowth: 22, issues: '特になし', lastUpdate: '2024-03-15' },
  { id: 'A003', name: '六本木店', area: '東京', rank: 'A', score: 90, monthlyGrowth: 8, yearlyGrowth: 18, issues: '特になし', lastUpdate: '2024-03-14' },
  { id: 'A004', name: '新宿高島屋店', area: '東京', rank: 'A', score: 88, monthlyGrowth: 10, yearlyGrowth: 20, issues: '特になし', lastUpdate: '2024-03-14' },
  { id: 'A005', name: '渋谷スクランブル店', area: '東京', rank: 'A', score: 87, monthlyGrowth: 7, yearlyGrowth: 16, issues: '特になし', lastUpdate: '2024-03-13' },
  
  // Bランク
  { id: 'B001', name: '池袋店', area: '東京', rank: 'B', score: 82, monthlyGrowth: 5, yearlyGrowth: 12, issues: 'プラン見直し必要', lastUpdate: '2024-03-15' },
  { id: 'B002', name: '上野店', area: '東京', rank: 'B', score: 80, monthlyGrowth: 3, yearlyGrowth: 10, issues: '在庫管理改善', lastUpdate: '2024-03-14' },
  { id: 'B003', name: '品川店', area: '東京', rank: 'B', score: 78, monthlyGrowth: 2, yearlyGrowth: 8, issues: 'スタッフ研修', lastUpdate: '2024-03-13' },
  { id: 'B004', name: '秋葉原店', area: '東京', rank: 'B', score: 76, monthlyGrowth: 1, yearlyGrowth: 6, issues: '設備更新', lastUpdate: '2024-03-12' },
  { id: 'B005', name: '錦糸町店', area: '東京', rank: 'B', score: 75, monthlyGrowth: 0, yearlyGrowth: 5, issues: 'マーケティング強化', lastUpdate: '2024-03-11' },
  
  // Cランク
  { id: 'C001', name: '吉祥寺店', area: '東京', rank: 'C', score: 68, monthlyGrowth: -2, yearlyGrowth: 2, issues: '売上改善必要', lastUpdate: '2024-03-15' },
  { id: 'C002', name: '立川店', area: '東京', rank: 'C', score: 65, monthlyGrowth: -5, yearlyGrowth: 0, issues: '顧客満足度向上', lastUpdate: '2024-03-14' },
  { id: 'C003', name: '町田店', area: '東京', rank: 'C', score: 62, monthlyGrowth: -3, yearlyGrowth: -2, issues: 'プラン刷新', lastUpdate: '2024-03-13' },
  { id: 'C004', name: '八王子店', area: '東京', rank: 'C', score: 60, monthlyGrowth: -8, yearlyGrowth: -5, issues: '総合改善', lastUpdate: '2024-03-12' },
  { id: 'C005', name: '府中店', area: '東京', rank: 'C', score: 58, monthlyGrowth: -10, yearlyGrowth: -8, issues: '緊急対応必要', lastUpdate: '2024-03-11' },
  
  // Dランク
  { id: 'D001', name: '調布店', area: '東京', rank: 'D', score: 52, monthlyGrowth: -15, yearlyGrowth: -12, issues: '抜本的改革必要', lastUpdate: '2024-03-15' },
  { id: 'D002', name: '三鷹店', area: '東京', rank: 'D', score: 50, monthlyGrowth: -18, yearlyGrowth: -15, issues: '経営見直し', lastUpdate: '2024-03-14' },
  { id: 'D003', name: '小金井店', area: '東京', rank: 'D', score: 48, monthlyGrowth: -20, yearlyGrowth: -18, issues: '店舗改装検討', lastUpdate: '2024-03-13' },
  { id: 'D004', name: '国分寺店', area: '東京', rank: 'D', score: 45, monthlyGrowth: -22, yearlyGrowth: -20, issues: '人員配置見直し', lastUpdate: '2024-03-12' },
  { id: 'D005', name: '国立店', area: '東京', rank: 'D', score: 42, monthlyGrowth: -25, yearlyGrowth: -22, issues: '閉店検討', lastUpdate: '2024-03-11' },
  
  // Eランク
  { id: 'E001', name: '東村山店', area: '東京', rank: 'E', score: 38, monthlyGrowth: -30, yearlyGrowth: -28, issues: '即座の対応必要', lastUpdate: '2024-03-15' },
  { id: 'E002', name: '清瀬店', area: '東京', rank: 'E', score: 35, monthlyGrowth: -32, yearlyGrowth: -30, issues: '緊急事態', lastUpdate: '2024-03-14' },
  { id: 'E003', name: '東久留米店', area: '東京', rank: 'E', score: 32, monthlyGrowth: -35, yearlyGrowth: -32, issues: '閉店準備', lastUpdate: '2024-03-13' },
  { id: 'E004', name: '西東京店', area: '東京', rank: 'E', score: 30, monthlyGrowth: -38, yearlyGrowth: -35, issues: '最終警告', lastUpdate: '2024-03-12' },
  { id: 'E005', name: '武蔵野店', area: '東京', rank: 'E', score: 28, monthlyGrowth: -40, yearlyGrowth: -38, issues: '閉店決定', lastUpdate: '2024-03-11' }
])

// ランク別店舗数
const storesByRank = computed(() => {
  const ranks = ['A', 'B', 'C', 'D', 'E']
  return ranks.reduce((acc, rank) => {
    acc[rank] = stores.value.filter(store => store.rank === rank)
    return acc
  }, {} as Record<string, typeof stores.value>)
})

// ランク別店舗数グラフデータ
const rankChartData = computed(() => ({
  labels: ['Aランク', 'Bランク', 'Cランク', 'Dランク', 'Eランク'],
  datasets: [{
    label: '店舗数',
    data: [45, 128, 89, 67, 23], // 実際の全店舗数（表示は各5店舗のみ）
    backgroundColor: [
      '#059669', // A: 緑
      '#3b82f6', // B: 青
      '#d97706', // C: オレンジ
      '#dc2626', // D: 赤
      '#7c2d12'  // E: 濃い赤
    ],
    borderWidth: 0,
    borderRadius: 4
  }]
}))

// 売上比較グラフデータ
const salesTrendData = computed(() => ({
  labels: ['1月前', '2月前', '今月'],
  datasets: [{
    type: 'bar' as const,
    label: '今年売上 (百万円)',
    data: [920, 950, 980],
    backgroundColor: '#3b82f6',
    borderWidth: 0,
    borderRadius: 6,
    yAxisID: 'y',
    order: 2
  }, {
    type: 'line' as const,
    label: '前年売上 (百万円)',
    data: [850, 880, 920],
    borderColor: '#dc2626',
    backgroundColor: 'transparent',
    borderWidth: 4,
    pointBackgroundColor: '#dc2626',
    pointBorderColor: '#ffffff',
    pointBorderWidth: 3,
    pointRadius: 6,
    pointHoverRadius: 8,
    tension: 0.4,
    yAxisID: 'y',
    order: 1
  }]
}))

const salesChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 13,
          weight: '500',
          family: 'Inter'
        },
        color: '#374151'
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f3f4f6',
        borderColor: '#e5e7eb'
      },
      ticks: {
        font: {
          size: 12,
          family: 'Inter'
        },
        color: '#6b7280'
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 12,
          family: 'Inter'
        },
        color: '#6b7280'
      }
    }
  }
}

const rankChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 13,
          weight: '500',
          family: 'Inter'
        },
        color: '#374151'
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f3f4f6',
        borderColor: '#e5e7eb'
      },
      ticks: {
        font: {
          size: 12,
          family: 'Inter'
        },
        color: '#6b7280'
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 12,
          family: 'Inter'
        },
        color: '#6b7280'
      }
    }
  }
}
const toggleRank = (rank: string) => {
  if (expandedRanks.value.has(rank)) {
    expandedRanks.value.delete(rank)
  } else {
    expandedRanks.value.add(rank)
  }
}

const getRankBadge = (rank: string) => {
  const badges = {
    'A': 'bg-success',
    'B': 'bg-primary',
    'C': 'bg-warning',
    'D': 'bg-danger',
    'E': 'bg-dark'
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
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div>
        <h1 class="dashboard-title">営業ダッシュボード</h1>
        <p class="dashboard-subtitle">店舗パフォーマンスの概要と課題分析</p>
      </div>
      <div class="dashboard-actions">
        <button class="btn btn-outline-primary">
          <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" fill="none"/>
            <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
          レポート出力
        </button>
        <button class="btn btn-primary">
          <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 4v6h-6M1 20v-6h6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
          データ更新
        </button>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="row mb-4">
      <div class="col-lg-6 mb-4">
        <div class="card fade-in-up">
          <div class="card-body">
            <h5 class="card-title mb-3">ランク別店舗数</h5>
            <div style="height: 300px;">
              <Bar :data="rankChartData" :options="rankChartOptions" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 mb-4">
        <div class="card fade-in-up">
          <div class="card-body">
            <h5 class="card-title mb-3">売上比較</h5>
            <div style="height: 300px;">
              <Bar :data="salesTrendData" :options="salesChartOptions" />
            </div>
            <div class="row mt-3">
              <div class="col-4 text-center">
                <div class="metric-value text-primary">¥920M</div>
                <div class="metric-label">1月前</div>
              </div>
              <div class="col-4 text-center">
                <div class="metric-value text-primary">¥950M</div>
                <div class="metric-label">2月前</div>
              </div>
              <div class="col-4 text-center">
                <div class="metric-value text-primary">¥980M</div>
                <div class="metric-label">今月</div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-12 text-center">
                <div class="metric-change positive">
                  <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                  前年同月比 +6.5% 成長
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Store Rankings Accordion -->
    <div class="stores-accordion">
      <div v-for="rank in ['A', 'B', 'C', 'D', 'E']" :key="rank" class="rank-section mb-3">
        <div class="rank-header" @click="toggleRank(rank)">
          <div class="d-flex align-items-center">
            <span :class="['badge', 'me-3', getRankBadge(rank)]">{{ rank }}ランク</span>
            <span class="rank-count">{{ storesByRank[rank]?.length || 0 }}店舗</span>
          </div>
          <svg 
            class="accordion-arrow" 
            :class="{ 'rotated': expandedRanks.has(rank) }"
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="6,9 12,15 18,9" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        </div>
        
        <div v-if="expandedRanks.has(rank)" class="rank-content">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>店舗ID</th>
                  <th>店舗名</th>
                  <th>エリア</th>
                  <th>スコア</th>
                  <th>前月比</th>
                  <th>前年比</th>
                  <th>課題内容</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="store in storesByRank[rank]" :key="store.id">
                  <td>
                    <code class="store-id">{{ store.id }}</code>
                  </td>
                  <td>
                    <strong>{{ store.name }}</strong>
                  </td>
                  <td>
                    <span class="area-tag">{{ store.area }}</span>
                  </td>
                  <td>
                    <div class="score-display">
                      <span class="score-value">{{ store.score }}</span>
                      <div class="score-bar">
                        <div class="score-fill" :style="{ width: store.score + '%' }"></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div :class="['growth-indicator', getGrowthColor(store.monthlyGrowth)]">
                      <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline :points="getGrowthIcon(store.monthlyGrowth)" stroke="currentColor" stroke-width="2" fill="none"/>
                      </svg>
                      {{ store.monthlyGrowth > 0 ? '+' : '' }}{{ store.monthlyGrowth }}%
                    </div>
                  </td>
                  <td>
                    <div :class="['growth-indicator', getGrowthColor(store.yearlyGrowth)]">
                      <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline :points="getGrowthIcon(store.yearlyGrowth)" stroke="currentColor" stroke-width="2" fill="none"/>
                      </svg>
                      {{ store.yearlyGrowth > 0 ? '+' : '' }}{{ store.yearlyGrowth }}%
                    </div>
                  </td>
                  <td>
                    <span class="issues-text">{{ store.issues }}</span>
                  </td>
                  <td>
                    <router-link :to="`/store/${store.id}`" class="btn btn-outline-primary btn-sm">
                      <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" fill="none"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
                      </svg>
                      詳細
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 2rem;
  background-color: var(--bg-secondary);
  min-height: 100vh;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.dashboard-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
}

.dashboard-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 0;
}

.dashboard-actions {
  display: flex;
  gap: 0.75rem;
}

.stores-accordion {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  overflow: hidden;
}

.rank-section {
  border-bottom: 1px solid var(--border-light);
}

.rank-section:last-child {
  border-bottom: none;
}

.rank-header {
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: var(--transition-fast);
  background: var(--bg-primary);
}

.rank-header:hover {
  background: var(--bg-secondary);
}

.rank-count {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1rem;
}

.accordion-arrow {
  transition: transform 0.3s ease;
  color: var(--text-secondary);
}

.accordion-arrow.rotated {
  transform: rotate(180deg);
}

.rank-content {
  border-top: 1px solid var(--border-light);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 1000px;
  }
}

.table {
  margin-bottom: 0;
  font-size: 0.875rem;
}

.table th {
  font-weight: 600;
  color: var(--text-primary);
  border-bottom: 2px solid var(--border-light);
  padding: 1rem 0.75rem;
  background: var(--bg-secondary);
}

.table td {
  padding: 1rem 0.75rem;
  border-bottom: 1px solid var(--border-light);
  vertical-align: middle;
}

.store-id {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
  font-weight: 500;
}

.area-tag {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
  font-weight: 500;
}

.score-display {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.score-value {
  font-weight: 600;
  color: var(--text-primary);
  min-width: 2rem;
}

.score-bar {
  flex: 1;
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
  max-width: 60px;
}

.score-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--danger-color), var(--warning-color), var(--success-color));
  border-radius: 3px;
  transition: width 0.6s ease;
}

.growth-indicator {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.issues-text {
  color: var(--text-secondary);
  font-size: 0.875rem;
  max-width: 150px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.metric-label {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
  }
  
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .dashboard-actions {
    width: 100%;
  }
  
  .dashboard-actions .btn {
    flex: 1;
  }
  
  .dashboard-title {
    font-size: 1.5rem;
  }
  
  .rank-header {
    padding: 1rem;
  }
  
  .table-responsive {
    font-size: 0.8125rem;
  }
  
  .score-display {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .score-bar {
    max-width: 80px;
  }
}
</style>