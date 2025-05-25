<script setup lang="ts">
const userProfileImage = 'https://placehold.co/150';
import {Search} from 'lucide-vue-next';
</script>

<template>
  <header class="h-14 flex justify-between items-center">
    <router-link to="/home" class="text-xl font-bold text-gray-500">
      Home
    </router-link>

    <div class="flex items-center gap-4">
      <router-link to="/search">
        <Search/>
      </router-link>

      <router-link
          to="/posts/create"
          class="px-2 py-1 border border-gray-300 rounded-sm text-sm"
      >
        새 글 작성
      </router-link>

      <router-link to="/me">
        <img
            :src="userProfileImage"
            alt="마이페이지"
            class="w-9 h-9 rounded-full object-cover"
        />
      </router-link>
    </div>
  </header>
</template>