<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('general')

const settings = ref({
  general: {
    companyName: '株式会社サンプル',
    department: '営業部',
    timezone: 'Asia/Tokyo',
    language: 'ja',
    dateFormat: 'YYYY/MM/DD'
  },
  notifications: {
    emailAlerts: true,
    pushNotifications: true,
    weeklyReports: true,
    urgentIssues: true,
    systemMaintenance: false
  },
  dashboard: {
    defaultView: 'dashboard',
    refreshInterval: 300,
    showAnimations: true,
    compactMode: false,
    darkMode: false
  },
  data: {
    autoBackup: true,
    backupFrequency: 'daily',
    dataRetention: 365,
    exportFormat: 'xlsx'
  }
})

const tabs = [
  { id: 'general', name: '基本設定', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4' },
  { id: 'notifications', name: '通知設定', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  { id: 'dashboard', name: 'ダッシュボード', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' },
  { id: 'data', name: 'データ管理', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' }
]

const saveSettings = () => {
  // 設定保存のロジック
  console.log('Settings saved:', settings.value)
  // 成功メッセージを表示
}

const resetSettings = () => {
  // 設定リセットのロジック
  if (confirm('設定をリセットしますか？この操作は元に戻せません。')) {
    // デフォルト値に戻す
    console.log('Settings reset')
  }
}

const exportSettings = () => {
  // 設定エクスポートのロジック
  const dataStr = JSON.stringify(settings.value, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'dashboard-settings.json'
  link.click()
}
</script>

<template>
  <div class="settings-page">
    <div class="settings-container">
      <div class="settings-sidebar">
        <div class="sidebar-header">
          <h5>設定</h5>
        </div>
        <nav class="settings-nav">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="['nav-item', { active: activeTab === tab.id }]"
          >
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path :d="tab.icon" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            <span class="nav-text">{{ tab.name }}</span>
          </button>
        </nav>
      </div>

      <div class="settings-content">
        <!-- General Settings -->
        <div v-if="activeTab === 'general'" class="settings-section">
          <div class="section-header">
            <h4>基本設定</h4>
            <p>システムの基本的な設定を管理します</p>
          </div>

          <div class="settings-form">
            <div class="form-group">
              <label class="form-label">会社名</label>
              <input v-model="settings.general.companyName" type="text" class="form-control">
            </div>

            <div class="form-group">
              <label class="form-label">部署名</label>
              <input v-model="settings.general.department" type="text" class="form-control">
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">タイムゾーン</label>
                  <select v-model="settings.general.timezone" class="form-select">
                    <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">言語</label>
                  <select v-model="settings.general.language" class="form-select">
                    <option value="ja">日本語</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">日付形式</label>
              <select v-model="settings.general.dateFormat" class="form-select">
                <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div v-if="activeTab === 'notifications'" class="settings-section">
          <div class="section-header">
            <h4>通知設定</h4>
            <p>各種通知の設定を管理します</p>
          </div>

          <div class="settings-form">
            <div class="form-group">
              <div class="form-check form-switch">
                <input v-model="settings.notifications.emailAlerts" class="form-check-input" type="checkbox" id="emailAlerts">
                <label class="form-check-label" for="emailAlerts">
                  <strong>メール通知</strong>
                  <div class="form-description">重要な更新をメールで受信します</div>
                </label>
              </div>
            </div>

            <div class="form-group">
              <div class="form-check form-switch">
                <input v-model="settings.notifications.pushNotifications" class="form-check-input" type="checkbox" id="pushNotifications">
                <label class="form-check-label" for="pushNotifications">
                  <strong>プッシュ通知</strong>
                  <div class="form-description">ブラウザでリアルタイム通知を受信します</div>
                </label>
              </div>
            </div>

            <div class="form-group">
              <div class="form-check form-switch">
                <input v-model="settings.notifications.weeklyReports" class="form-check-input" type="checkbox" id="weeklyReports">
                <label class="form-check-label" for="weeklyReports">
                  <strong>週次レポート</strong>
                  <div class="form-description">毎週の分析レポートを受信します</div>
                </label>
              </div>
            </div>

            <div class="form-group">
              <div class="form-check form-switch">
                <input v-model="settings.notifications.urgentIssues" class="form-check-input" type="checkbox" id="urgentIssues">
                <label class="form-check-label" for="urgentIssues">
                  <strong>緊急課題通知</strong>
                  <div class="form-description">緊急度の高い課題について即座に通知します</div>
                </label>
              </div>
            </div>

            <div class="form-group">
              <div class="form-check form-switch">
                <input v-model="settings.notifications.systemMaintenance" class="form-check-input" type="checkbox" id="systemMaintenance">
                <label class="form-check-label" for="systemMaintenance">
                  <strong>システムメンテナンス通知</strong>
                  <div class="form-description">システムメンテナンスの予定を通知します</div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Dashboard Settings -->
        <div v-if="activeTab === 'dashboard'" class="settings-section">
          <div class="section-header">
            <h4>ダッシュボード設定</h4>
            <p>ダッシュボードの表示設定を管理します</p>
          </div>

          <div class="settings-form">
            <div class="form-group">
              <label class="form-label">デフォルト表示ページ</label>
              <select v-model="settings.dashboard.defaultView" class="form-select">
                <option value="dashboard">ダッシュボード</option>
                <option value="stores">店舗一覧</option>
                <option value="analysis">データ分析</option>
                <option value="planning">企画立案</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">データ更新間隔（秒）</label>
              <select v-model="settings.dashboard.refreshInterval" class="form-select">
                <option :value="60">1分</option>
                <option :value="300">5分</option>
                <option :value="600">10分</option>
                <option :value="1800">30分</option>
              </select>
            </div>

            <div class="form-group">
              <div class="form-check form-switch">
                <input v-model="settings.dashboard.showAnimations" class="form-check-input" type="checkbox" id="showAnimations">
                <label class="form-check-label" for="showAnimations">
                  <strong>アニメーション表示</strong>
                  <div class="form-description">画面遷移やデータ更新時のアニメーションを表示します</div>
                </label>
              </div>
            </div>

            <div class="form-group">
              <div class="form-check form-switch">
                <input v-model="settings.dashboard.compactMode" class="form-check-input" type="checkbox" id="compactMode">
                <label class="form-check-label" for="compactMode">
                  <strong>コンパクトモード</strong>
                  <div class="form-description">より多くの情報を画面に表示します</div>
                </label>
              </div>
            </div>

            <div class="form-group">
              <div class="form-check form-switch">
                <input v-model="settings.dashboard.darkMode" class="form-check-input" type="checkbox" id="darkMode">
                <label class="form-check-label" for="darkMode">
                  <strong>ダークモード</strong>
                  <div class="form-description">暗いテーマでダッシュボードを表示します</div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Management Settings -->
        <div v-if="activeTab === 'data'" class="settings-section">
          <div class="section-header">
            <h4>データ管理設定</h4>
            <p>データのバックアップと管理設定</p>
          </div>

          <div class="settings-form">
            <div class="form-group">
              <div class="form-check form-switch">
                <input v-model="settings.data.autoBackup" class="form-check-input" type="checkbox" id="autoBackup">
                <label class="form-check-label" for="autoBackup">
                  <strong>自動バックアップ</strong>
                  <div class="form-description">データを定期的に自動でバックアップします</div>
                </label>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">バックアップ頻度</label>
              <select v-model="settings.data.backupFrequency" class="form-select" :disabled="!settings.data.autoBackup">
                <option value="daily">毎日</option>
                <option value="weekly">毎週</option>
                <option value="monthly">毎月</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">データ保持期間（日）</label>
              <input v-model.number="settings.data.dataRetention" type="number" class="form-control" min="30" max="3650">
              <div class="form-text">30日から10年まで設定可能です</div>
            </div>

            <div class="form-group">
              <label class="form-label">エクスポート形式</label>
              <select v-model="settings.data.exportFormat" class="form-select">
                <option value="xlsx">Excel (.xlsx)</option>
                <option value="csv">CSV (.csv)</option>
                <option value="json">JSON (.json)</option>
              </select>
            </div>

            <div class="data-actions">
              <button @click="exportSettings" class="btn btn-outline-primary">
                <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                設定をエクスポート
              </button>
              <button class="btn btn-outline-warning">
                <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                データクリーンアップ
              </button>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="settings-actions">
          <button @click="saveSettings" class="btn btn-primary">
            <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" stroke-width="2" fill="none"/>
              <polyline points="17,21 17,13 7,13 7,21" stroke="currentColor" stroke-width="2" fill="none"/>
              <polyline points="7,3 7,8 15,8" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            設定を保存
          </button>
          <button @click="resetSettings" class="btn btn-outline-danger">
            <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 4v6h-6M1 20v-6h6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            リセット
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  padding: 2rem;
  background-color: var(--bg-secondary);
  min-height: 100vh;
}

.settings-container {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.settings-sidebar {
  width: 280px;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-light);
}

.sidebar-header h5 {
  margin: 0;
  font-weight: 600;
  color: var(--text-primary);
}

.settings-nav {
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  color: var(--text-secondary);
  text-align: left;
  transition: var(--transition-fast);
  cursor: pointer;
}

.nav-item:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

.nav-item.active {
  background-color: var(--accent-color);
  color: var(--text-white);
}

.nav-icon {
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.nav-text {
  font-weight: 500;
  font-size: 0.9375rem;
}

.settings-content {
  flex: 1;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 2rem;
}

.settings-section {
  margin-bottom: 2rem;
}

.section-header {
  margin-bottom: 2rem;
}

.section-header h4 {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.section-header p {
  color: var(--text-secondary);
  margin: 0;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 0.9375rem;
}

.form-control, .form-select {
  padding: 0.75rem;
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  transition: var(--transition-fast);
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.form-control:focus, .form-select:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-check {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.form-check-input {
  margin: 0;
  flex-shrink: 0;
}

.form-check-label {
  flex: 1;
  cursor: pointer;
}

.form-description {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.form-text {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
}

.data-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-light);
}

.settings-actions {
  display: flex;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-light);
  justify-content: flex-end;
}

.form-switch .form-check-input {
  width: 2.5rem;
  height: 1.25rem;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-medium);
  border-radius: 1rem;
  transition: var(--transition-fast);
  cursor: pointer;
  position: relative;
}

.form-switch .form-check-input:checked {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}

.form-switch .form-check-input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

@media (max-width: 768px) {
  .settings-page {
    padding: 1rem;
  }
  
  .settings-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .settings-sidebar {
    width: 100%;
    position: static;
  }
  
  .settings-nav {
    display: flex;
    overflow-x: auto;
    padding: 0.5rem;
    gap: 0.5rem;
  }
  
  .nav-item {
    flex-shrink: 0;
    border-radius: var(--radius-md);
    padding: 0.5rem 1rem;
  }
  
  .settings-content {
    padding: 1.5rem;
  }
  
  .data-actions {
    flex-direction: column;
  }
  
  .settings-actions {
    flex-direction: column;
  }
}
</style>