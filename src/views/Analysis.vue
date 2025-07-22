<script setup lang="ts">
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// エリア別売上データ
const areas = ref([
  { id: 'ginza', name: '銀座・日比谷・有楽町', color: '#3b82f6', enabled: true },
  { id: 'tokyo', name: '東京・丸の内・日本橋', color: '#059669', enabled: true },
  { id: 'shibuya', name: '渋谷', color: '#dc2626', enabled: true },
  { id: 'harajuku', name: '原宿・表参道・青山', color: '#d97706', enabled: false },
  { id: 'akasaka', name: '赤坂・虎ノ門', color: '#7c3aed', enabled: false },
  { id: 'roppongi', name: '六本木・麻布十番・乃木坂', color: '#0891b2', enabled: false },
  { id: 'ebisu', name: '恵比寿・広尾・白金台', color: '#be185d', enabled: false },
  { id: 'daikanyama', name: '代官山・中目黒', color: '#059669', enabled: false },
  { id: 'shinjuku', name: '新宿・代々木', color: '#ea580c', enabled: false }
])

const areaSalesData = ref({
  ginza: [2800, 2950, 3100, 3200, 3050, 3300],
  tokyo: [2600, 2750, 2900, 2950, 2800, 3000],
  shibuya: [2200, 2350, 2500, 2600, 2450, 2700],
  harajuku: [1800, 1900, 2000, 2100, 1950, 2150],
  akasaka: [1600, 1700, 1800, 1850, 1750, 1900],
  roppongi: [2000, 2100, 2200, 2300, 2150, 2400],
  ebisu: [1900, 2000, 2100, 2200, 2050, 2250],
  daikanyama: [1500, 1600, 1700, 1750, 1650, 1800],
  shinjuku: [2400, 2500, 2600, 2700, 2550, 2800]
})

const areaChartData = computed(() => {
  const enabledAreas = areas.value.filter(area => area.enabled)
  return {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: enabledAreas.map(area => ({
      label: area.name,
      data: areaSalesData.value[area.id as keyof typeof areaSalesData.value],
      borderColor: area.color,
      backgroundColor: area.color + '20',
      tension: 0.4,
      fill: false,
      pointBackgroundColor: area.color,
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 3
    }))
  }
})

const areaChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 15,
        font: {
          size: 12,
          weight: '500',
          family: 'Inter'
        },
        color: '#374151'
      }
    },
    title: {
      display: false
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
        color: '#6b7280',
        callback: function(value: any) {
          return '¥' + (value / 1000) + 'K'
        }
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

// ジャンル別売上データ
const genres = ref([
  // 洋食・西洋料理
  { id: 'french', name: 'フレンチ', category: '洋食・西洋料理', color: '#3b82f6', enabled: true },
  { id: 'casual_french', name: 'カジュアルフレンチ', category: '洋食・西洋料理', color: '#1d4ed8', enabled: false },
  { id: 'bistro', name: 'ビストロ', category: '洋食・西洋料理', color: '#1e40af', enabled: false },
  { id: 'italian', name: 'イタリアン', category: '洋食・西洋料理', color: '#059669', enabled: true },
  { id: 'spanish', name: 'スペイン料理', category: '洋食・西洋料理', color: '#047857', enabled: false },
  { id: 'pizzeria', name: 'ピッツェリア', category: '洋食・西洋料理', color: '#065f46', enabled: false },
  { id: 'belgian', name: 'ベルギー料理', category: '洋食・西洋料理', color: '#dc2626', enabled: false },
  { id: 'portuguese', name: 'ポルトガル料理', category: '洋食・西洋料理', color: '#b91c1c', enabled: false },
  { id: 'german', name: 'ドイツ料理', category: '洋食・西洋料理', color: '#991b1b', enabled: false },
  { id: 'greek', name: 'ギリシャ料理', category: '洋食・西洋料理', color: '#7f1d1d', enabled: false },
  { id: 'hungarian', name: 'ハンガリー料理', category: '洋食・西洋料理', color: '#d97706', enabled: false },
  { id: 'moroccan', name: 'モロッコ料理', category: '洋食・西洋料理', color: '#b45309', enabled: false },
  { id: 'hawaiian', name: 'ハワイ料理', category: '洋食・西洋料理', color: '#92400e', enabled: false },
  { id: 'brazilian', name: 'ブラジル料理', category: '洋食・西洋料理', color: '#78350f', enabled: false },
  { id: 'oceanian', name: 'オセアニア料理', category: '洋食・西洋料理', color: '#7c3aed', enabled: false },
  { id: 'mediterranean', name: '地中海料理', category: '洋食・西洋料理', color: '#6d28d9', enabled: false },
  { id: 'american', name: 'アメリカ料理', category: '洋食・西洋料理', color: '#5b21b6', enabled: false },
  { id: 'british', name: 'イギリス料理', category: '洋食・西洋料理', color: '#4c1d95', enabled: false },
  { id: 'russian', name: 'ロシア料理', category: '洋食・西洋料理', color: '#0891b2', enabled: false },
  { id: 'western', name: '洋食', category: '洋食・西洋料理', color: '#0e7490', enabled: false },
  { id: 'trattoria', name: 'トラットリア', category: '洋食・西洋料理', color: '#155e75', enabled: false },
  
  // 和食・日本料理
  { id: 'sushi', name: '寿司・鮨', category: '和食・日本料理', color: '#be185d', enabled: true },
  { id: 'kaiseki', name: '懐石・会席料理', category: '和食・日本料理', color: '#9d174d', enabled: false },
  { id: 'creative_japanese', name: '創作和食', category: '和食・日本料理', color: '#831843', enabled: false },
  { id: 'yakitori', name: '焼鳥・串料理', category: '和食・日本料理', color: '#701a75', enabled: false },
  { id: 'shabu_shabu', name: 'しゃぶしゃぶ・すき焼き', category: '和食・日本料理', color: '#581c87', enabled: false },
  { id: 'tempura', name: '天ぷら', category: '和食・日本料理', color: '#4c1d95', enabled: false },
  { id: 'local_cuisine', name: '郷土料理', category: '和食・日本料理', color: '#ea580c', enabled: false },
  { id: 'kappo', name: '割烹・小料理', category: '和食・日本料理', color: '#c2410c', enabled: false },
  { id: 'izakaya', name: '居酒屋', category: '和食・日本料理', color: '#9a3412', enabled: false },
  { id: 'nabe', name: '鍋料理（専門店）', category: '和食・日本料理', color: '#7c2d12', enabled: false },
  { id: 'seafood', name: '海鮮・魚介料理', category: '和食・日本料理', color: '#059669', enabled: false },
  { id: 'unagi', name: 'うなぎ・鰻', category: '和食・日本料理', color: '#047857', enabled: false },
  
  // 中華料理
  { id: 'chinese', name: '中国料理', category: '中華料理', color: '#dc2626', enabled: true },
  { id: 'dim_sum', name: '点心・飲茶', category: '中華料理', color: '#b91c1c', enabled: false },
  { id: 'nouvelle_chinois', name: 'ヌーベルシノワ', category: '中華料理', color: '#991b1b', enabled: false },
  { id: 'hot_pot', name: '火鍋（専門店）', category: '中華料理', color: '#7f1d1d', enabled: false },
  { id: 'sichuan', name: '四川料理', category: '中華料理', color: '#450a0a', enabled: false },
  
  // アジア・エスニック
  { id: 'korean', name: '韓国料理', category: 'アジア・エスニック', color: '#d97706', enabled: false },
  { id: 'thai', name: 'タイ料理', category: 'アジア・エスニック', color: '#b45309', enabled: false },
  { id: 'vietnamese', name: 'ベトナム料理', category: 'アジア・エスニック', color: '#92400e', enabled: false },
  { id: 'mexican', name: 'メキシコ料理', category: 'アジア・エスニック', color: '#78350f', enabled: false },
  { id: 'indian', name: 'インド料理', category: 'アジア・エスニック', color: '#451a03', enabled: false },
  { id: 'turkish', name: 'トルコ料理', category: 'アジア・エスニック', color: '#7c3aed', enabled: false },
  { id: 'singaporean', name: 'シンガポール料理', category: 'アジア・エスニック', color: '#6d28d9', enabled: false },
  { id: 'indonesian', name: 'インドネシア料理', category: 'アジア・エスニック', color: '#5b21b6', enabled: false },
  
  // 肉料理
  { id: 'teppanyaki', name: '鉄板焼き', category: '肉料理', color: '#0891b2', enabled: false },
  { id: 'yakiniku', name: '焼肉', category: '肉料理', color: '#0e7490', enabled: false },
  { id: 'steak', name: 'ステーキ・グリル料理', category: '肉料理', color: '#155e75', enabled: false },
  { id: 'meat_bar', name: '肉バル', category: '肉料理', color: '#164e63', enabled: false },
  { id: 'genghis_khan', name: 'ジンギスカン', category: '肉料理', color: '#0f3460', enabled: false },
  { id: 'hormone', name: 'ホルモン', category: '肉料理', color: '#082f49', enabled: false },
  { id: 'churrasco', name: 'シュラスコ', category: '肉料理', color: '#0c4a6e', enabled: false },
  
  // その他
  { id: 'buffet', name: 'ビュッフェ', category: 'その他', color: '#be185d', enabled: false },
  { id: 'bar', name: 'BAR', category: 'その他', color: '#9d174d', enabled: false },
  { id: 'cafe', name: 'カフェ', category: 'その他', color: '#831843', enabled: false },
  { id: 'beer_hall', name: 'ビアホール・ビアバー', category: 'その他', color: '#701a75', enabled: false },
  { id: 'beer_garden', name: 'ビアガーデン・BBQ', category: 'その他', color: '#581c87', enabled: false },
  { id: 'sweets', name: 'スイーツ・デザート', category: 'その他', color: '#4c1d95', enabled: false },
  { id: 'pastry', name: 'ペストリーショップ', category: 'その他', color: '#3730a3', enabled: false },
  { id: 'oyster_bar', name: 'オイスターバー', category: 'その他', color: '#312e81', enabled: false },
  { id: 'wine_bar', name: 'ワインバー', category: 'その他', color: '#1e1b4b', enabled: false }
])

const genreSalesData = ref({
  // 洋食・西洋料理
  french: [1800, 1900, 2000, 2100, 2050, 2200],
  casual_french: [1200, 1250, 1300, 1350, 1320, 1400],
  bistro: [1000, 1050, 1100, 1150, 1120, 1200],
  italian: [1600, 1700, 1800, 1900, 1850, 2000],
  spanish: [800, 850, 900, 950, 920, 1000],
  pizzeria: [900, 950, 1000, 1050, 1020, 1100],
  belgian: [600, 650, 700, 750, 720, 800],
  portuguese: [500, 550, 600, 650, 620, 700],
  german: [700, 750, 800, 850, 820, 900],
  greek: [400, 450, 500, 550, 520, 600],
  hungarian: [300, 350, 400, 450, 420, 500],
  moroccan: [350, 400, 450, 500, 480, 550],
  hawaiian: [450, 500, 550, 600, 580, 650],
  brazilian: [550, 600, 650, 700, 680, 750],
  oceanian: [250, 300, 350, 400, 380, 450],
  mediterranean: [650, 700, 750, 800, 780, 850],
  american: [1100, 1150, 1200, 1250, 1220, 1300],
  british: [400, 450, 500, 550, 520, 600],
  russian: [300, 350, 400, 450, 420, 500],
  western: [1300, 1350, 1400, 1450, 1420, 1500],
  trattoria: [800, 850, 900, 950, 920, 1000],
  
  // 和食・日本料理
  sushi: [2200, 2300, 2400, 2500, 2450, 2600],
  kaiseki: [1500, 1600, 1700, 1800, 1750, 1900],
  creative_japanese: [1200, 1250, 1300, 1350, 1320, 1400],
  yakitori: [1000, 1050, 1100, 1150, 1120, 1200],
  shabu_shabu: [1400, 1450, 1500, 1550, 1520, 1600],
  tempura: [1100, 1150, 1200, 1250, 1220, 1300],
  local_cuisine: [800, 850, 900, 950, 920, 1000],
  kappo: [1300, 1350, 1400, 1450, 1420, 1500],
  izakaya: [1800, 1850, 1900, 1950, 1920, 2000],
  nabe: [900, 950, 1000, 1050, 1020, 1100],
  seafood: [1600, 1650, 1700, 1750, 1720, 1800],
  unagi: [700, 750, 800, 850, 820, 900],
  
  // 中華料理
  chinese: [1700, 1800, 1900, 2000, 1950, 2100],
  dim_sum: [1000, 1050, 1100, 1150, 1120, 1200],
  nouvelle_chinois: [800, 850, 900, 950, 920, 1000],
  hot_pot: [1200, 1250, 1300, 1350, 1320, 1400],
  sichuan: [900, 950, 1000, 1050, 1020, 1100],
  
  // アジア・エスニック
  korean: [1300, 1350, 1400, 1450, 1420, 1500],
  thai: [1100, 1150, 1200, 1250, 1220, 1300],
  vietnamese: [800, 850, 900, 950, 920, 1000],
  mexican: [900, 950, 1000, 1050, 1020, 1100],
  indian: [1000, 1050, 1100, 1150, 1120, 1200],
  turkish: [600, 650, 700, 750, 720, 800],
  singaporean: [500, 550, 600, 650, 620, 700],
  indonesian: [400, 450, 500, 550, 520, 600],
  
  // 肉料理
  teppanyaki: [1500, 1600, 1700, 1800, 1750, 1900],
  yakiniku: [1800, 1850, 1900, 1950, 1920, 2000],
  steak: [2000, 2100, 2200, 2300, 2250, 2400],
  meat_bar: [1200, 1250, 1300, 1350, 1320, 1400],
  genghis_khan: [700, 750, 800, 850, 820, 900],
  hormone: [600, 650, 700, 750, 720, 800],
  churrasco: [800, 850, 900, 950, 920, 1000],
  
  // その他
  buffet: [1400, 1450, 1500, 1550, 1520, 1600],
  bar: [1100, 1150, 1200, 1250, 1220, 1300],
  cafe: [900, 950, 1000, 1050, 1020, 1100],
  beer_hall: [1000, 1050, 1100, 1150, 1120, 1200],
  beer_garden: [800, 850, 900, 950, 920, 1000],
  sweets: [700, 750, 800, 850, 820, 900],
  pastry: [500, 550, 600, 650, 620, 700],
  oyster_bar: [600, 650, 700, 750, 720, 800],
  wine_bar: [1300, 1350, 1400, 1450, 1420, 1500]
})

// アコーディオンの開閉状態
const expandedCategories = ref<Set<string>>(new Set(['洋食・西洋料理', '和食・日本料理']))

const toggleCategory = (category: string) => {
  if (expandedCategories.value.has(category)) {
    expandedCategories.value.delete(category)
  } else {
    expandedCategories.value.add(category)
  }
}

const genreCategories = [
  '洋食・西洋料理',
  '和食・日本料理', 
  '中華料理',
  'アジア・エスニック',
  '肉料理',
  'その他'
]

const genreChartData = computed(() => {
  const enabledGenres = genres.value.filter(genre => genre.enabled)
  return {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: enabledGenres.map(genre => ({
      label: genre.name,
      data: genreSalesData.value[genre.id as keyof typeof genreSalesData.value],
      borderColor: genre.color,
      backgroundColor: genre.color + '20',
      tension: 0.4,
      fill: false,
      pointBackgroundColor: genre.color,
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 3
    }))
  }
})

const genreChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 15,
        font: {
          size: 12,
          weight: '500',
          family: 'Inter'
        },
        color: '#374151'
      }
    },
    title: {
      display: false
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
        color: '#6b7280',
        callback: function(value: any) {
          return '¥' + (value / 1000) + 'K'
        }
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

const salesData = {
  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
  datasets: [
    {
      label: '売上実績',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: '#059669',
      backgroundColor: 'rgba(5, 150, 105, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#059669',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2
    },
    {
      label: '目標値',
      data: [15000, 18000, 20000, 23000, 25000, 28000],
      borderColor: '#3b82f6',
      backgroundColor: 'transparent',
      tension: 0.4,
      fill: false,
      borderDash: [8, 4],
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      borderWidth: 2
    }
  ]
}

const chartOptions = {
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
    },
    title: {
      display: false
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
        color: '#6b7280',
        callback: function(value: any) {
          return '¥' + (value / 1000) + 'K'
        }
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

const analysisMetrics = ref([
  {
    title: 'プラン分析',
    color: 'primary',
    items: [
      { label: '人気プラン数', value: '15', trend: 'up', change: '+3', unit: '件' },
      { label: 'プラン平均単価', value: '5,000', trend: 'up', change: '+5%', unit: '円' },
      { label: '新規プラン率', value: '25', trend: 'down', change: '-2%', unit: '%' }
    ]
  },
  {
    title: '在庫状況',
    color: 'warning',
    items: [
      { label: '在庫切れ店舗', value: '23', trend: 'down', change: '-5', unit: '店舗' },
      { label: '在庫過多店舗', value: '45', trend: 'up', change: '+8', unit: '店舗' },
      { label: '適正在庫店舗', value: '3,932', trend: 'up', change: '+12', unit: '店舗' }
    ]
  },
  {
    title: '画像品質',
    color: 'success',
    items: [
      { label: '高品質画像率', value: '75', trend: 'up', change: '+8%', unit: '%' },
      { label: '更新必要店舗', value: '156', trend: 'down', change: '-23', unit: '店舗' },
      { label: '平均画像数', value: '12', trend: 'up', change: '+1', unit: '枚' }
    ]
  }
])

const quickInsights = ref([
  { text: '前月比 15% 増加', type: 'success', icon: 'trend-up' },
  { text: '要改善店舗 156件', type: 'warning', icon: 'alert' },
  { text: '新規プラン導入率 25%', type: 'info', icon: 'target' },
  { text: '人気プラン「春の特別コース」', type: 'primary', icon: 'star' }
])

const getTrendIcon = (trend: string) => {
  return trend === 'up' ? 'trend-up' : trend === 'down' ? 'trend-down' : 'minus'
}

const getTrendColor = (trend: string) => {
  return trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-secondary'
}

const getIcon = (iconName: string) => {
  const icons = {
    'trend-up': 'M23 6l-9.5 9.5-5-5L1 18',
    'trend-down': 'M23 18l-9.5-9.5-5 5L1 6',
    'minus': 'M5 12h14',
    'alert': 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
    'target': 'M22 12h-4l-3 9L9 3l-3 9H2',
    'star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
  }
  return icons[iconName as keyof typeof icons] || icons.minus
}
</script>

<template>
  <div class="analysis">
    <div class="analysis-header">
      <div>
        <h1 class="analysis-title">売上分析</h1>
        <p class="analysis-subtitle">詳細な売上データと傾向分析</p>
      </div>
      <div class="analysis-actions">
        <button class="btn btn-outline-primary">
          <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" fill="none"/>
            <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
          レポート生成
        </button>
        <button class="btn btn-primary">
          <svg class="me-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 4v6h-6M1 20v-6h6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
          データ更新
        </button>
      </div>
    </div>

    <div class="row mb-4">
      <!-- Main Chart -->
      <div class="col-lg-8 mb-4">
        <div class="card fade-in-up">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 class="card-title mb-1">月次売上推移</h5>
                <p class="card-subtitle mb-0">実績と目標の比較分析</p>
              </div>
            </div>
            <div style="height: 320px;">
              <Line :data="salesData" :options="chartOptions" />
            </div>
            <div class="row mt-4">
              <div class="col-md-4 text-center">
                <div class="metric-value text-success">¥30K</div>
                <div class="metric-label">今月売上</div>
                <div class="metric-change positive">
                  <svg class="me-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline :points="getIcon('trend-up')" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                  +25%
                </div>
              </div>
              <div class="col-md-4 text-center">
                <div class="metric-value text-primary">¥28K</div>
                <div class="metric-label">目標値</div>
                <div class="metric-change positive">達成率 107%</div>
              </div>
              <div class="col-md-4 text-center">
                <div class="metric-value text-info">¥22K</div>
                <div class="metric-label">前月実績</div>
                <div class="metric-change positive">+36% 向上</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Analysis -->
      <div class="col-lg-4 mb-4">
        <div class="card fade-in-up">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 class="card-title mb-1">クイック分析</h5>
                <p class="card-subtitle mb-0">重要な指標の概要</p>
              </div>
            </div>
            <div class="insights-list">
              <div v-for="(insight, index) in quickInsights" :key="index" 
                   class="insight-item"
                   :class="`insight-${insight.type}`">
                <div class="d-flex align-items-center">
                  <div class="insight-icon me-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path :d="getIcon(insight.icon)" stroke="currentColor" stroke-width="2" fill="none"/>
                    </svg>
                  </div>
                  <span class="insight-text">{{ insight.text }}</span>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <button class="btn btn-outline-primary w-100">詳細分析を見る</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Area Sales Chart -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="card fade-in-up">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 class="card-title mb-1">エリア別売上推移</h5>
                <p class="card-subtitle mb-0">半年間のエリア別売上比較</p>
              </div>
            </div>
            
            <!-- Area Selection Checkboxes -->
            <div class="area-selection mb-4">
              <h6 class="selection-title">表示エリア選択</h6>
              <div class="row">
                <div v-for="area in areas" :key="area.id" class="col-md-4 col-sm-6 mb-2">
                  <div class="form-check">
                    <input 
                      v-model="area.enabled" 
                      class="form-check-input" 
                      type="checkbox" 
                      :id="area.id"
                    >
                    <label class="form-check-label" :for="area.id">
                      <span class="area-color-indicator" :style="{ backgroundColor: area.color }"></span>
                      {{ area.name }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div style="height: 400px;">
              <Line :data="areaChartData" :options="areaChartOptions" />
            </div>
            
            <!-- Area Summary -->
            <div class="area-summary mt-4">
              <div class="row">
                <div v-for="area in areas.filter(a => a.enabled)" :key="area.id" class="col-md-3 col-sm-6 mb-3">
                  <div class="area-metric">
                    <div class="d-flex align-items-center mb-2">
                      <span class="area-color-dot" :style="{ backgroundColor: area.color }"></span>
                      <span class="area-name">{{ area.name }}</span>
                    </div>
                    <div class="area-stats">
                      <div class="stat-value">¥{{ areaSalesData[area.id][5] }}K</div>
                      <div class="stat-label">今月売上</div>
                      <div class="stat-change" :class="areaSalesData[area.id][5] > areaSalesData[area.id][4] ? 'positive' : 'negative'">
                        <svg class="me-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <polyline :points="areaSalesData[area.id][5] > areaSalesData[area.id][4] ? '23 6 13.5 15.5 8.5 10.5 1 18' : '23 18 13.5 8.5 8.5 13.5 1 6'" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                        {{ areaSalesData[area.id][5] > areaSalesData[area.id][4] ? '+' : '' }}{{ Math.round(((areaSalesData[area.id][5] - areaSalesData[area.id][4]) / areaSalesData[area.id][4]) * 100) }}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Genre Sales Chart -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="card fade-in-up">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 class="card-title mb-1">ジャンル別売上推移</h5>
                <p class="card-subtitle mb-0">半年間のジャンル別売上比較</p>
              </div>
            </div>
            
            <!-- Genre Selection Checkboxes -->
            <div class="genre-selection mb-4">
              <h6 class="selection-title">表示ジャンル選択</h6>
              
              <!-- Genre Categories Accordion -->
              <div class="genre-accordion">
                <div v-for="category in genreCategories" :key="category" class="genre-category-section mb-2">
                  <div class="category-header" @click="toggleCategory(category)">
                    <div class="d-flex align-items-center">
                      <h6 class="category-title mb-0">{{ category }}</h6>
                      <span class="genre-count ms-2">({{ genres.filter(g => g.category === category).length }}件)</span>
                    </div>
                    <svg 
                      class="accordion-arrow" 
                      :class="{ 'rotated': expandedCategories.has(category) }"
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="6,9 12,15 18,9" stroke="currentColor" stroke-width="2" fill="none"/>
                    </svg>
                  </div>
                  
                  <div v-if="expandedCategories.has(category)" class="category-content">
                    <div class="row">
                      <div v-for="genre in genres.filter(g => g.category === category)" :key="genre.id" class="col-md-3 col-sm-4 col-6 mb-2">
                        <div class="form-check">
                          <input 
                            v-model="genre.enabled" 
                            class="form-check-input" 
                            type="checkbox" 
                            :id="genre.id"
                          >
                          <label class="form-check-label" :for="genre.id">
                            <span class="genre-color-indicator" :style="{ backgroundColor: genre.color }"></span>
                            {{ genre.name }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div style="height: 400px;">
              <Line :data="genreChartData" :options="genreChartOptions" />
            </div>
            
            <!-- Genre Summary -->
            <div class="genre-summary mt-4">
              <div class="row">
                <div v-for="genre in genres.filter(g => g.enabled)" :key="genre.id" class="col-md-3 col-sm-6 mb-3">
                  <div class="genre-metric">
                    <div class="d-flex align-items-center mb-2">
                      <span class="genre-color-dot" :style="{ backgroundColor: genre.color }"></span>
                      <span class="genre-name">{{ genre.name }}</span>
                    </div>
                    <div class="genre-stats">
                      <div class="stat-value">¥{{ genreSalesData[genre.id][5] }}K</div>
                      <div class="stat-label">今月売上</div>
                      <div class="stat-change" :class="genreSalesData[genre.id][5] > genreSalesData[genre.id][4] ? 'positive' : 'negative'">
                        <svg class="me-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <polyline :points="genreSalesData[genre.id][5] > genreSalesData[genre.id][4] ? '23 6 13.5 15.5 8.5 10.5 1 18' : '23 18 13.5 8.5 8.5 13.5 1 6'" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                        {{ genreSalesData[genre.id][5] > genreSalesData[genre.id][4] ? '+' : '' }}{{ Math.round(((genreSalesData[genre.id][5] - genreSalesData[genre.id][4]) / genreSalesData[genre.id][4]) * 100) }}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Analysis Metrics -->
    <div class="row">
      <div v-for="metric in analysisMetrics" :key="metric.title" class="col-lg-4 mb-4">
        <div class="card fade-in-up">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="card-title mb-0">{{ metric.title }}</h5>
              <div class="status-indicator">
                <div class="status-dot" :class="`status-dot-${metric.color}`"></div>
              </div>
            </div>
            <div class="metrics-list">
              <div v-for="item in metric.items" :key="item.label" 
                   class="metric-item">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="metric-info">
                    <div class="metric-name">{{ item.label }}</div>
                    <div class="d-flex align-items-center mt-1">
                      <span :class="['metric-trend', 'me-2', getTrendColor(item.trend)]">
                        <svg class="me-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <polyline :points="getIcon(getTrendIcon(item.trend))" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                        {{ item.change }}
                      </span>
                    </div>
                  </div>
                  <div class="metric-value-container">
                    <span class="metric-value">{{ item.value }}</span>
                    <span class="metric-unit">{{ item.unit }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Key Insights -->
    <div class="row mt-4">
      <div class="col-12">
        <div class="card fade-in-up">
          <div class="card-body">
            <h5 class="card-title mb-4">重要な洞察</h5>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="alert alert-success">
                  <div class="d-flex align-items-start">
                    <svg class="me-3 mt-1" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" stroke-width="2" fill="none"/>
                    </svg>
                    <div>
                      <h6 class="alert-heading mb-2">売上好調</h6>
                      <p class="mb-0">前月比15%の売上増加を達成。特に「春の特別コース」が人気を集めています。</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="alert alert-warning">
                  <div class="d-flex align-items-start">
                    <svg class="me-3 mt-1" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" stroke-width="2" fill="none"/>
                      <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2"/>
                      <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <div>
                      <h6 class="alert-heading mb-2">注意が必要</h6>
                      <p class="mb-0">156店舗で改善が必要。主に在庫管理と画像品質の向上が課題です。</p>
                    </div>
                  </div>
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
.analysis {
  padding: 2rem;
  background-color: var(--bg-secondary);
  min-height: 100vh;
}

.analysis-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.analysis-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
}

.analysis-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 0;
}

.analysis-actions {
  display: flex;
  gap: 0.75rem;
}

.insights-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.insight-item {
  padding: 1rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  transition: var(--transition-fast);
}

.insight-item.insight-success {
  background-color: #f0fdf4;
  border-color: #bbf7d0;
}

.insight-item.insight-warning {
  background-color: #fffbeb;
  border-color: #fed7aa;
}

.insight-item.insight-info {
  background-color: #f0f9ff;
  border-color: #bae6fd;
}

.insight-item.insight-primary {
  background-color: #eff6ff;
  border-color: #dbeafe;
}

.insight-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.insight-text {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.9375rem;
}

.metrics-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.metric-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-light);
}

.metric-item:last-child {
  border-bottom: none;
}

.metric-name {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.metric-trend {
  font-size: 0.8125rem;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.metric-value-container {
  text-align: right;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.metric-unit {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  margin-left: 0.25rem;
}

.status-dot-primary { background-color: var(--accent-color); }
.status-dot-warning { background-color: var(--warning-color); }
.status-dot-success { background-color: var(--success-color); }

.alert-heading {
  font-weight: 600;
  font-size: 1rem;
}

.area-selection {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
}

.selection-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1rem;
}

.form-check {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
}

.form-check-input {
  margin-right: 0.75rem;
  width: 18px;
  height: 18px;
  border: 2px solid var(--border-medium);
  border-radius: 4px;
  background-color: var(--bg-primary);
  transition: var(--transition-fast);
}

.form-check-input:checked {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}

.form-check-input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-check-label {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;
  margin-bottom: 0;
}

.area-color-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.area-summary {
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-light);
}

.area-metric {
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  transition: var(--transition-fast);
}

.area-metric:hover {
  border-color: var(--border-medium);
  box-shadow: var(--shadow-sm);
}

.area-color-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.area-name {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.2;
}

.area-stats {
  margin-top: 0.5rem;
}

.area-stats .stat-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: 0.25rem;
}

.area-stats .stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.area-stats .stat-change {
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.area-stats .stat-change.positive {
  color: var(--success-color);
}

.area-stats .stat-change.negative {
  color: var(--danger-color);
}

.genre-selection {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
}

.genre-accordion {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  overflow: hidden;
}

.genre-category-section {
  border-bottom: 1px solid var(--border-light);
}

.genre-category-section:last-child {
  border-bottom: none;
}

.category-header {
  padding: 1rem 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: var(--transition-fast);
  background: var(--bg-primary);
}

.category-header:hover {
  background: var(--bg-secondary);
}

.category-content {
  padding: 0 1.5rem 1rem 1.5rem;
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

.category-title {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9375rem;
}

.genre-count {
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-weight: 400;
}

.accordion-arrow {
  transition: transform 0.3s ease;
  color: var(--text-secondary);
}

.accordion-arrow.rotated {
  transform: rotate(180deg);
}

.genre-color-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.genre-summary {
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-light);
}

.genre-metric {
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  transition: var(--transition-fast);
}

.genre-metric:hover {
  border-color: var(--border-medium);
  box-shadow: var(--shadow-sm);
}

.genre-color-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.genre-name {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.2;
}

.genre-stats {
  margin-top: 0.5rem;
}

.genre-stats .stat-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: 0.25rem;
}

.genre-stats .stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.genre-stats .stat-change {
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.genre-stats .stat-change.positive {
  color: var(--success-color);
}

.genre-stats .stat-change.negative {
  color: var(--danger-color);
}

@media (max-width: 768px) {
  .analysis {
    padding: 1rem;
  }
  
  .analysis-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .analysis-actions {
    width: 100%;
  }
  
  .analysis-actions .btn {
    flex: 1;
  }
  
  .analysis-title {
    font-size: 1.5rem;
  }
}
</style>