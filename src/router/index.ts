import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import StoreList from '../views/StoreList.vue'
import StoreDetail from '../views/StoreDetail.vue'
import FacilityDiagnosis from '../views/FacilityDiagnosis.vue'
import PlanDiagnosis from '../views/PlanDiagnosis.vue'
import Analysis from '../views/Analysis.vue'
import Planning from '../views/Planning.vue'
import Settings from '../views/Settings.vue'
import AIHistory from '../views/AIHistory.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // 新しいページに遷移する場合は常にトップへ
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: { title: 'TOP' }
    },
    {
      path: '/stores',
      name: 'StoreList',
      component: StoreList,
      meta: { title: '店舗一覧' }
    },
    {
      path: '/store/:id',
      name: 'StoreDetail',
      component: StoreDetail,
      meta: { title: '店舗詳細' }
    },
    {
      path: '/facility-diagnosis',
      name: 'FacilityDiagnosis',
      component: FacilityDiagnosis,
      meta: { title: '施設情報診断' }
    },
    {
      path: '/plan-diagnosis',
      name: 'PlanDiagnosis',
      component: PlanDiagnosis,
      meta: { title: 'プラン情報診断' }
    },
    {
      path: '/analysis',
      name: 'Analysis',
      component: Analysis,
      meta: { title: 'データ分析' }
    },
    {
      path: '/planning',
      name: 'Planning',
      component: Planning,
      meta: { title: '企画立案' }
    },
    {
      path: '/ai-history',
      name: 'AIHistory',
      component: AIHistory,
      meta: { title: 'AI相談履歴' }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: { title: '設定' }
    }
  ]
})

export default router