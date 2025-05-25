<script setup lang="ts">
import { ref } from 'vue';
import { TrendingUp, Clock, ChevronDown } from 'lucide-vue-next';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

// 탭 데이터
const tabs = [
  { label: '좋아요', value: 'like', icon: TrendingUp },
  { label: '최신', value: 'new', icon: Clock },
];

// 탭/카테고리 상태
const selectedTab = ref('like');
const categories = [
  { name: '자유게시판', value: 'free' },
  { name: '공부게시판', value: 'study' },
  { name: '기타', value: 'etc' },
];
const selectedCategory = ref(categories[0]);
function selectCategory(cat) {
  selectedCategory.value = cat;
}
</script>

<template>
  <div class="flex items-center justify-between py-2">

    <div class="flex items-center gap-6">
      <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="selectedTab = tab.value"
          class="flex items-center gap-1 pb-1 border-b-2 transition font-semibold text-gray-500"
          :class="selectedTab === tab.value
          ? 'border-black text-gray-800'
          : 'border-transparent text-gray-400'"
      >
        <component :is="tab.icon" class="w-5 h-5" />
        {{ tab.label }}
      </button>
    </div>

    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="inline-flex justify-center gap-x-2 rounded-md bg-white px-4 py-2 text-sm text-gray-800 ring-1 ring-gray-300 min-w-32">
          {{ selectedCategory.name }}
          <ChevronDown class="-mr-2 w-6 h-5 text-gray-400" aria-hidden="true" />
        </MenuButton>
      </div>
      <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div class="py-1">
            <MenuItem
                v-for="cat in categories"
                :key="cat.value"
                v-slot="{ active }"
            >
              <button
                  @click="selectCategory(cat)"
                  :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block w-full px-4 py-2 text-left text-sm'
                ]"
              >
                {{ cat.name }}
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>