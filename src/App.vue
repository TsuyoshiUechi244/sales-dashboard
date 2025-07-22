<script setup lang="ts">
import { ref } from 'vue'
import AIChat from './components/AIChat.vue'

const showChat = ref(false)
const sidebarCollapsed = ref(false)
const showStoreSubmenu = ref(false)

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const toggleStoreSubmenu = () => {
  showStoreSubmenu.value = !showStoreSubmenu.value
}
</script>

<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <nav class="sidebar" :class="{ 'collapsed': sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo" v-if="!sidebarCollapsed">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor"/>
            <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor"/>
            <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor"/>
            <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor"/>
          </svg>
          <span class="logo-text">営業ダッシュボード</span>
        </div>
        <button class="sidebar-toggle" @click="toggleSidebar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"/>
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"/>
            <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </div>

      <div class="sidebar-menu">
        <ul class="menu-list">
          <li class="menu-item">
            <router-link to="/" class="menu-link">
              <svg class="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              <span class="menu-text" v-if="!sidebarCollapsed">TOP</span>
            </router-link>
          </li>
          
          <li class="menu-item has-submenu">
            <div class="menu-link" @click="toggleStoreSubmenu">
              <svg class="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              <span class="menu-text" v-if="!sidebarCollapsed">店舗一覧</span>
              <svg 
                v-if="!sidebarCollapsed" 
                class="submenu-arrow" 
                :class="{ 'rotated': showStoreSubmenu }"
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="6,9 12,15 18,9" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
            </div>
            <ul class="submenu" v-if="!sidebarCollapsed && showStoreSubmenu">
              <li class="submenu-item">
                <router-link to="/stores" class="submenu-link">店舗一覧</router-link>
              </li>
              <li class="submenu-item">
                <router-link to="/facility-diagnosis" class="submenu-link">施設情報診断</router-link>
              </li>
              <li class="submenu-item">
                <router-link to="/plan-diagnosis" class="submenu-link">プラン情報診断</router-link>
              </li>
            </ul>
          </li>

          <li class="menu-item">
            <router-link to="/analysis" class="menu-link">
              <svg class="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              <span class="menu-text" v-if="!sidebarCollapsed">データ分析</span>
            </router-link>
          </li>

          <li class="menu-item">
            <router-link to="/planning" class="menu-link">
              <svg class="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4M9 11V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M9 11h6" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              <span class="menu-text" v-if="!sidebarCollapsed">企画立案</span>
            </router-link>
          </li>

          <li class="menu-item">
            <router-link to="/ai-history" class="menu-link">
              <svg class="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M13 8H7M13 12H7" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="17" cy="8" r="1" fill="currentColor"/>
                <circle cx="17" cy="12" r="1" fill="currentColor"/>
              </svg>
              <span class="menu-text" v-if="!sidebarCollapsed">AI相談履歴</span>
            </router-link>
          </li>

          <li class="menu-item">
            <router-link to="/settings" class="menu-link">
              <svg class="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              <span class="menu-text" v-if="!sidebarCollapsed">設定</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="sidebar-footer" v-if="!sidebarCollapsed">
        <div class="user-info">
          <div class="user-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
          </div>
          <div class="user-details">
            <div class="user-name">営業担当者</div>
            <div class="user-role">管理者</div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="main-wrapper" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <header class="top-header">
        <div class="header-left">
          <h1 class="page-title">{{ $route.meta.title || 'ダッシュボード' }}</h1>
        </div>
        <div class="header-right">
          <button class="btn btn-outline-primary btn-sm">
            <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 4v6h-6M1 20v-6h6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            データ更新
          </button>
        </div>
      </header>

      <main class="main-content">
        <router-view></router-view>
      </main>
    </div>

    <!-- AIチャット -->
    <AIChat v-if="showChat" @close="showChat = false" />

    <!-- AIチャットボタン（右下固定） -->
    <button 
      @click="showChat = !showChat"
      class="ai-chat-button"
      :class="{ 'active': showChat }"
    >
      <div class="chat-btn-content">
        <div class="ai-indicator" v-if="!showChat">
          <div class="ai-brain">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22h5a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 14.5 2h-5z" stroke="currentColor" stroke-width="2" fill="none"/>
              <path d="M9 6h6M9 10h6M9 14h4" stroke="currentColor" stroke-width="2" fill="none"/>
              <circle cx="12" cy="18" r="1" fill="currentColor"/>
            </svg>
          </div>
          <div class="ai-pulse"></div>
        </div>
        <svg v-if="showChat" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
          <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <div class="ai-label" v-if="!showChat">AI相談</div>
    </button>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  background-color: var(--bg-secondary);
  position: relative;
}

.sidebar {
  width: 280px;
  background-color: var(--bg-primary);
  border-right: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: relative;
  z-index: 100;
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-primary);
}

.logo-text {
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: -0.025em;
}

.sidebar-toggle {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}

.sidebar-toggle:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

.sidebar-menu {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  margin-bottom: 0.25rem;
}

.menu-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition-fast);
  border-radius: 0;
  margin: 0 0.5rem;
  border-radius: var(--radius-md);
}

.has-submenu .menu-link {
  cursor: pointer;
}

.menu-link:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

.menu-link.router-link-active {
  background-color: var(--accent-color);
  color: var(--text-white);
}

.menu-icon {
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.menu-text {
  font-weight: 500;
  font-size: 0.9375rem;
}

.submenu-arrow {
  margin-left: auto;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.submenu-arrow.rotated {
  transform: rotate(180deg);
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 200px;
  }
}

.submenu-item {
  margin-bottom: 0.125rem;
}

.submenu-link {
  display: block;
  padding: 0.5rem 1rem 0.5rem 3.5rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  transition: var(--transition-fast);
  border-radius: var(--radius-md);
  margin: 0 0.5rem;
}

.submenu-link:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

.submenu-link.router-link-active {
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--accent-color);
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid var(--border-light);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 0.75rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
}

.top-header {
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 70px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.025em;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  background-color: var(--bg-secondary);
}

.ai-chat-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 72px;
  height: 72px;
  border-radius: 16px;
  background-color: var(--accent-color);
  color: var(--text-white);
  border: none;
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  transition: var(--transition-normal);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  overflow: hidden;
  position: relative;
}

.ai-chat-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, 
    rgba(255,255,255,0.1) 0%, 
    rgba(255,255,255,0.05) 50%, 
    rgba(255,255,255,0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.ai-chat-button:hover::before {
  opacity: 1;
}

.ai-chat-button:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.chat-btn-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-indicator {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-brain {
  position: relative;
  z-index: 2;
  animation: aiThinking 2s ease-in-out infinite;
}

.ai-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: aiPulse 2s ease-in-out infinite;
}

.ai-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

@keyframes aiThinking {
  0%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(2deg); }
  50% { transform: scale(1.05) rotate(-1deg); }
  75% { transform: scale(1.1) rotate(1deg); }
}

@keyframes aiPulse {
  0% { 
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.5;
  }
  100% { 
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
}

.ai-chat-button.active {
  background-color: var(--danger-color);
  border-radius: 50%;
  width: 56px;
  height: 56px;
}

.ai-chat-button.active:hover {
  background-color: #b91c1c;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    transform: translateX(-100%);
  }
  
  .sidebar:not(.collapsed) {
    transform: translateX(0);
  }
  
  .main-wrapper {
    margin-left: 0;
  }
  
  .top-header {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 1.25rem;
  }
}
</style>