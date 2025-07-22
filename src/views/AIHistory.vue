<script setup lang="ts">
import { ref } from 'vue'

const conversations = ref([
  {
    id: 1,
    title: '銀座本店の売上分析について',
    date: '2024-03-15 14:30',
    summary: 'Aランク店舗の売上推移と改善提案について相談',
    messageCount: 8,
    status: 'completed',
    tags: ['売上分析', 'Aランク', '銀座本店']
  },
  {
    id: 2,
    title: 'Bランク店舗の課題解決策',
    date: '2024-03-14 16:45',
    summary: '池袋店と上野店の共通課題と対策について議論',
    messageCount: 12,
    status: 'completed',
    tags: ['課題解決', 'Bランク', '改善提案']
  },
  {
    id: 3,
    title: '春季キャンペーンの企画相談',
    date: '2024-03-13 10:20',
    summary: '4月からの春季特別キャンペーンの戦略立案',
    messageCount: 15,
    status: 'completed',
    tags: ['企画立案', 'キャンペーン', '戦略']
  },
  {
    id: 4,
    title: 'Eランク店舗の緊急対応',
    date: '2024-03-12 09:15',
    summary: '危機的状況の店舗に対する緊急改善策の検討',
    messageCount: 20,
    status: 'urgent',
    tags: ['緊急対応', 'Eランク', '改善策']
  },
  {
    id: 5,
    title: 'データ分析レポートの解釈',
    date: '2024-03-11 13:50',
    summary: '月次レポートの数値解釈と次月の戦略について',
    messageCount: 6,
    status: 'completed',
    tags: ['データ分析', 'レポート', '戦略']
  }
])

const selectedConversation = ref(null)

const getStatusBadge = (status: string) => {
  const badges = {
    'completed': 'bg-success',
    'urgent': 'bg-danger',
    'in_progress': 'bg-warning'
  }
  return badges[status as keyof typeof badges] || 'bg-secondary'
}

const getStatusText = (status: string) => {
  const texts = {
    'completed': '完了',
    'urgent': '緊急',
    'in_progress': '進行中'
  }
  return texts[status as keyof typeof texts] || '不明'
}

const viewConversation = (conversation: any) => {
  selectedConversation.value = conversation
  // ここで詳細な会話履歴を表示するモーダルを開く
}

const deleteConversation = (id: number) => {
  if (confirm('この相談履歴を削除しますか？')) {
    conversations.value = conversations.value.filter(conv => conv.id !== id)
  }
}

const exportConversations = () => {
  const dataStr = JSON.stringify(conversations.value, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'ai-consultation-history.json'
  link.click()
}
</script>

<template>
  <div class="ai-history-page">
    <div class="page-header">
      <div class="header-content">
        <div>
          <h1 class="page-title">AI相談履歴</h1>
          <p class="page-subtitle">過去のAIアシスタントとの相談記録</p>
        </div>
        <div class="header-actions">
          <button @click="exportConversations" class="btn btn-outline-primary">
            <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-15M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            履歴をエクスポート
          </button>
          <button class="btn btn-primary">
            <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2"/>
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2"/>
            </svg>
            新規相談開始
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics -->
    <div class="row mb-4">
      <div class="col-md-3 mb-3">
        <div class="card metric-card fade-in-up">
          <div class="card-body text-center">
            <div class="metric-value text-primary">{{ conversations.length }}</div>
            <div class="metric-label">総相談数</div>
            <div class="metric-change neutral">
              <svg class="me-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              記録済み
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card metric-card fade-in-up">
          <div class="card-body text-center">
            <div class="metric-value text-success">{{ conversations.filter(c => c.status === 'completed').length }}</div>
            <div class="metric-label">完了済み</div>
            <div class="metric-change positive">
              <svg class="me-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="20,6 9,17 4,12" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              解決済み
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card metric-card fade-in-up">
          <div class="card-body text-center">
            <div class="metric-value text-danger">{{ conversations.filter(c => c.status === 'urgent').length }}</div>
            <div class="metric-label">緊急対応</div>
            <div class="metric-change negative">
              <svg class="me-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              要注意
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card metric-card fade-in-up">
          <div class="card-body text-center">
            <div class="metric-value text-info">{{ Math.round(conversations.reduce((sum, c) => sum + c.messageCount, 0) / conversations.length) }}</div>
            <div class="metric-label">平均メッセージ数</div>
            <div class="metric-change neutral">
              <svg class="me-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M13 8H7M13 12H7" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              やり取り
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Conversation List -->
    <div class="conversations-list">
      <div class="row">
        <div v-for="conversation in conversations" :key="conversation.id" class="col-lg-6 mb-4">
          <div class="conversation-card">
            <div class="conversation-header">
              <div class="conversation-info">
                <h5 class="conversation-title">{{ conversation.title }}</h5>
                <div class="conversation-meta">
                  <span :class="['badge', 'me-2', getStatusBadge(conversation.status)]">
                    {{ getStatusText(conversation.status) }}
                  </span>
                  <span class="conversation-date">{{ conversation.date }}</span>
                </div>
              </div>
              <div class="conversation-stats">
                <div class="stat-item">
                  <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                  {{ conversation.messageCount }}
                </div>
              </div>
            </div>

            <div class="conversation-content">
              <p class="conversation-summary">{{ conversation.summary }}</p>
              
              <div class="conversation-tags">
                <span v-for="tag in conversation.tags" :key="tag" class="tag">
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="conversation-actions">
              <button @click="viewConversation(conversation)" class="btn btn-outline-primary btn-sm">
                <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" fill="none"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                詳細表示
              </button>
              <button class="btn btn-outline-success btn-sm">
                <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" fill="none"/>
                  <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2"/>
                  <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2"/>
                </svg>
                続きを相談
              </button>
              <button @click="deleteConversation(conversation.id)" class="btn btn-outline-danger btn-sm">
                <svg class="me-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2" fill="none"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                削除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Assistant Info -->
    <div class="row mt-4">
      <div class="col-12">
        <div class="card fade-in-up">
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <h5 class="card-title">AIアシスタントについて</h5>
                <p class="mb-3">営業分析に特化したAIアシスタントが、データ解釈から改善提案まで幅広くサポートします。</p>
                <div class="ai-features">
                  <div class="row">
                    <div class="col-md-6">
                      <ul class="feature-list">
                        <li>売上データの詳細分析</li>
                        <li>店舗ランキングの解釈</li>
                        <li>課題の優先順位付け</li>
                      </ul>
                    </div>
                    <div class="col-md-6">
                      <ul class="feature-list">
                        <li>改善策の具体的提案</li>
                        <li>競合分析とベンチマーク</li>
                        <li>キャンペーン企画のサポート</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 text-center">
                <div class="ai-avatar">
                  <div class="ai-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22h5a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 14.5 2h-5z" stroke="currentColor" stroke-width="2" fill="none"/>
                      <path d="M9 6h6M9 10h6M9 14h4" stroke="currentColor" stroke-width="2" fill="none"/>
                      <circle cx="12" cy="18" r="1" fill="currentColor"/>
                    </svg>
                  </div>
                  <div class="ai-pulse-ring"></div>
                </div>
                <h6 class="mt-3">営業分析AI</h6>
                <p class="text-muted">24時間対応</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-history-page {
  padding: 2rem;
  background-color: var(--bg-secondary);
  min-height: 100vh;
}

.page-header {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 0;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.conversation-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  height: 100%;
  transition: var(--transition-normal);
}

.conversation-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--border-medium);
}

.conversation-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.conversation-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.4;
}

.conversation-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.conversation-date {
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.conversation-stats {
  display: flex;
  align-items: center;
}

.stat-item {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
}

.conversation-content {
  margin-bottom: 1.5rem;
}

.conversation-summary {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.conversation-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
}

.conversation-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.conversation-actions .btn {
  flex: 1;
  min-width: 0;
}

.ai-features {
  margin-top: 1rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: 0.5rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  position: relative;
  padding-left: 1.5rem;
}

.feature-list li:before {
  content: '✓';
  color: var(--success-color);
  font-weight: bold;
  position: absolute;
  left: 0;
}

.ai-avatar {
  position: relative;
  display: inline-block;
}

.ai-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-color), var(--success-color));
  color: var(--text-white);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.ai-pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 2px solid var(--accent-color);
  border-radius: 50%;
  opacity: 0.3;
  animation: aiPulseRing 2s ease-in-out infinite;
}

@keyframes aiPulseRing {
  0% { 
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.8;
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.3;
  }
  100% { 
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.8;
  }
}

@media (max-width: 768px) {
  .ai-history-page {
    padding: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .conversation-actions {
    flex-direction: column;
  }
  
  .conversation-actions .btn {
    flex: none;
  }
}
</style>