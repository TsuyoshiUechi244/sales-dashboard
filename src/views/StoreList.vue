<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedRank = ref('')
const selectedRegion = ref('')

const stores = ref([
  { id: 1, name: '銀座本店', rank: 'S', region: '東京', sales: 2500000, issues: 0, lastUpdate: '2024-03-15' },
  { id: 2, name: '渋谷店', rank: 'A', region: '東京', sales: 2100000, issues: 2, lastUpdate: '2024-03-14' },
  { id: 3, name: '新宿店', rank: 'A', region: '東京', sales: 1950000, issues: 1, lastUpdate: '2024-03-13' },
  { id: 4, name: '池袋店', rank: 'B', region: '東京', sales: 1650000, issues: 3, lastUpdate: '2024-03-12' },
  { id: 5, name: '品川店', rank: 'B', region: '東京', sales: 1580000, issues: 2, lastUpdate: '2024-03-11' },
  { id: 6, name: '大阪梅田店', rank: 'S', region: '大阪', sales: 2300000, issues: 0, lastUpdate: '2024-03-15' },
  { id: 7, name: '心斎橋店', rank: 'A', region: '大阪', sales: 1850000, issues: 1, lastUpdate: '2024-03-14' },
  { id: 8, name: '天王寺店', rank: 'B', region: '大阪', sales: 1420000, issues: 4, lastUpdate: '2024-03-13' },
  { id: 9, name: '名古屋栄店', rank: 'A', region: '愛知', sales: 1780000, issues: 2, lastUpdate: '2024-03-12' },
  { id: 10, name: '福岡天神店', rank: 'B', region: '福岡', sales: 1350000, issues: 3, lastUpdate: '2024-03-11' }
])

const filteredStores = computed(() => {
  return stores.value.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRank = !selectedRank.value || store.rank === selectedRank.value
    const matchesRegion = !selectedRegion.value || store.region === selectedRegion.value
    return matchesSearch && matchesRank && matchesRegion
  })
})

const getRankBadge = (rank: string) => {
  const badges = {
    'S': 'bg-success',
    'A': 'bg-primary',
    'B': 'bg-warning',
    'C': 'bg-danger'
  }
  return badges[rank as keyof typeof badges] || 'bg-secondary'
}

const getIssuesBadge = (issues: number) => {
  if (issues === 0) return 'bg-success'
  if (issues <= 2) return 'bg-warning'
  return 'bg-danger'
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
  <div class="store-list-page">
    <div class="page-header">
      <div class="header-content">
        <div class="header-stats">
          <div class="stat-item">
            <div class="stat-value">{{ stores.length }}</div>
            <div class="stat-label">総店舗数</div>
          </div>
          <div class="stat-item">
            <div class="stat-value text-success">{{ stores.filter(s => s.rank === 'S').length }}</div>
            <div class="stat-label">Sランク店舗</div>
          </div>
          <div class="stat-item">
            <div class="stat-value text-danger">{{ stores.filter(s => s.issues > 0).length }}</div>
            <div class="stat-label">要対応店舗</div>
          </div>
        </div>
      </div>
    </div>

    <div class="filters-section">
      <div class="row">
        <div class="col-md-4 mb-3">
          <label class="form-label">店舗名検索</label>
          <div class="input-group">
            <span class="input-group-text">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
            </span>
            <input v-model="searchQuery" type="text" class="form-control" placeholder="店舗名を入力">
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <label class="form-label">ランク</label>
          <select v-model="selectedRank" class="form-select">
            <option value="">すべて</option>
            <option value="S">Sランク</option>
            <option value="A">Aランク</option>
            <option value="B">Bランク</option>
            <option value="C">Cランク</option>
          </select>
        </div>
        <div class="col-md-3 mb-3">
          <label class="form-label">地域</label>
          <select v-model="selectedRegion" class="form-select">
            <option value="">すべて</option>
            <option value="東京">東京</option>
            <option value="大阪">大阪</option>
            <option value="愛知">愛知</option>
            <option value="福岡">福岡</option>
          </select>
        </div>
        <div class="col-md-2 mb-3">
          <label class="form-label">&nbsp;</label>
          <button class="btn btn-outline-secondary w-100">
            <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 4v6h-6M1 20v-6h6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            リセット
          </button>
        </div>
      </div>
    </div>

    <div class="stores-grid">
      <div class="row">
        <div v-for="store in filteredStores" :key="store.id" class="col-lg-4 col-md-6 mb-4">
          <div class="store-card">
            <div class="store-header">
              <div class="store-info">
                <h5 class="store-name">{{ store.name }}</h5>
                <div class="store-meta">
                  <span :class="['badge', 'me-2', getRankBadge(store.rank)]">
                    ランク {{ store.rank }}
                  </span>
                  <span class="region-tag">{{ store.region }}</span>
                </div>
              </div>
            </div>

            <div class="store-metrics">
              <div class="metric-row">
                <div class="metric-item">
                  <div class="metric-label">月間売上</div>
                  <div class="metric-value">{{ formatCurrency(store.sales) }}</div>
                </div>
                <div class="metric-item">
                  <div class="metric-label">課題数</div>
                  <div class="metric-value">
                    <span :class="['badge', getIssuesBadge(store.issues)]">
                      {{ store.issues }}件
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="store-footer">
              <div class="last-update">
                <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                最終更新: {{ store.lastUpdate }}
              </div>
              <div class="store-actions">
                <router-link :to="`/store/${store.id}`" class="btn btn-outline-primary btn-sm">
                  <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" fill="none"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                  詳細
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredStores.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
          <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
      </div>
      <h4 class="empty-title">店舗が見つかりません</h4>
      <p class="empty-description">検索条件を変更してお試しください</p>
    </div>
  </div>
</template>

<style scoped>
.store-list-page {
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
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

.filters-section {
  background: var(--bg-primary);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  margin-bottom: 2rem;
  border: 1px solid var(--border-light);
}

.store-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  height: 100%;
  transition: var(--transition-normal);
}

.store-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--border-medium);
}

.store-header {
  margin-bottom: 1.5rem;
}

.store-name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
}

.store-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.region-tag {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
}

.store-metrics {
  margin-bottom: 1.5rem;
}

.metric-row {
  display: flex;
  justify-content: space-between;
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
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.store-footer {
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
}

@media (max-width: 768px) {
  .store-list-page {
    padding: 1rem;
  }
  
  .header-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .metric-row {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .store-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
}
</style>