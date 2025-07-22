<script setup lang="ts">
import { ref, nextTick } from 'vue'

const messages = ref([
  { text: 'こんにちは！営業分析のお手伝いをさせていただきます。どのようなことをお聞きになりたいですか？', isAI: true, timestamp: new Date() }
])
const newMessage = ref('')
const isTyping = ref(false)
const chatMessages = ref<HTMLElement>()

const emit = defineEmits(['close'])

const sendMessage = async () => {
  if (newMessage.value.trim()) {
    // ユーザーメッセージを追加
    messages.value.push({ 
      text: newMessage.value, 
      isAI: false, 
      timestamp: new Date() 
    })
    
    const userMessage = newMessage.value
    newMessage.value = ''
    
    // スクロールを下に
    await nextTick()
    scrollToBottom()
    
    // AI応答をシミュレート
    isTyping.value = true
    
    setTimeout(() => {
      const responses = [
        '分析結果を確認いたします。どの店舗の詳細をご覧になりたいですか？',
        'その課題について、過去のデータから類似のケースを見つけました。',
        '売上向上のための具体的な施策をいくつか提案させていただきます。',
        'データを分析した結果、以下の改善点が見つかりました。',
        'その店舗の傾向を分析して、最適な解決策をご提案いたします。'
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      messages.value.push({ 
        text: randomResponse, 
        isAI: true, 
        timestamp: new Date() 
      })
      
      isTyping.value = false
      nextTick(() => scrollToBottom())
    }, 1500)
  }
}

const scrollToBottom = () => {
  if (chatMessages.value) {
    chatMessages.value.scrollTop = chatMessages.value.scrollHeight
  }
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('ja-JP', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const clearChat = () => {
  messages.value = [
    { text: 'こんにちは！営業分析のお手伝いをさせていただきます。どのようなことをお聞きになりたいですか？', isAI: true, timestamp: new Date() }
  ]
}

const quickActions = [
  { text: '売上が低い店舗を教えて', icon: 'M18 20V10M12 20V4M6 20v-6' },
  { text: '改善提案をお願いします', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { text: 'レポートを作成して', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
]
</script>

<template>
  <div class="chat-window">
    <div class="chat-header">
      <div class="d-flex align-items-center">
        <div class="chat-avatar me-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M13 8H7M13 12H7" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        </div>
        <div>
          <h6 class="mb-0">AIアシスタント</h6>
          <small class="text-muted">オンライン</small>
        </div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button @click="clearChat" class="btn btn-outline-light btn-sm" title="チャットをクリア">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        </button>
        <button @click="$emit('close')" class="btn-close btn-close-white"></button>
      </div>
    </div>
    
    <div class="chat-messages" ref="chatMessages">
      <div v-for="(message, index) in messages" 
           :key="index"
           :class="['message-wrapper', message.isAI ? 'ai-message' : 'user-message']">
        <div class="message-avatar" v-if="message.isAI">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        </div>
        <div :class="['message', message.isAI ? 'ai' : 'user']">
          <div class="message-text">{{ message.text }}</div>
          <div class="message-time">{{ formatTime(message.timestamp) }}</div>
        </div>
        <div class="message-avatar" v-if="!message.isAI">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        </div>
      </div>
      
      <!-- Typing Indicator -->
      <div v-if="isTyping" class="message-wrapper ai-message">
        <div class="message-avatar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        </div>
        <div class="message ai typing">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="chat-input">
      <div class="chat-suggestions mb-3">
        <button 
          v-for="action in quickActions" 
          :key="action.text"
          class="btn btn-outline-secondary btn-sm me-2 mb-2" 
          @click="newMessage = action.text"
        >
          <svg class="me-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path :d="action.icon" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
          {{ action.text }}
        </button>
      </div>
      <div class="input-group">
        <input 
          v-model="newMessage" 
          @keyup.enter="sendMessage"
          placeholder="メッセージを入力..."
          class="form-control"
          :disabled="isTyping" 
        />
        <button 
          @click="sendMessage" 
          class="btn btn-primary"
          :disabled="!newMessage.trim() || isTyping"
        >
          <svg v-if="!isTyping" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2"/>
            <polygon points="22,2 15,22 11,13 2,9 22,2" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
          <div v-else class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-window {
  position: fixed;
  bottom: 90px;
  right: 24px;
  width: 400px;
  height: 600px;
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  border: 1px solid var(--border-light);
  overflow: hidden;
}

.chat-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--accent-color);
  color: var(--text-white);
}

.chat-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  background: var(--bg-secondary);
}

.message-wrapper {
  display: flex;
  margin-bottom: 1rem;
  align-items: flex-end;
  gap: 0.5rem;
}

.ai-message {
  justify-content: flex-start;
}

.user-message {
  justify-content: flex-end;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--text-secondary);
}

.message {
  max-width: 75%;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-lg);
  position: relative;
  box-shadow: var(--shadow-sm);
}

.ai {
  background: var(--bg-primary);
  color: var(--text-primary);
  border-bottom-left-radius: var(--radius-sm);
  border: 1px solid var(--border-light);
}

.user {
  background: var(--accent-color);
  color: var(--text-white);
  border-bottom-right-radius: var(--radius-sm);
}

.message-text {
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 0.25rem;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
}

.typing {
  padding: 1rem;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-secondary);
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.chat-input {
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--border-light);
  background: var(--bg-primary);
}

.input-group {
  display: flex;
  gap: 0.5rem;
}

.form-control {
  flex: 1;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-medium);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
}

.form-control:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-primary {
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;
}

.chat-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.btn-outline-secondary {
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-lg);
  border-color: var(--border-medium);
  color: var(--text-secondary);
  background: var(--bg-primary);
  transition: var(--transition-fast);
}

.btn-outline-secondary:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-dark);
  color: var(--text-primary);
}

/* Scrollbar Styling */
.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: var(--border-medium);
  border-radius: 2px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: var(--border-dark);
}

@media (max-width: 480px) {
  .chat-window {
    width: calc(100vw - 40px);
    right: 20px;
    left: 20px;
    height: 500px;
  }
  
  .chat-suggestions {
    flex-direction: column;
  }
  
  .chat-suggestions .btn {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>