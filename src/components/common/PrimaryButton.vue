<script setup>
// 부모 컴포넌트에서 넘겨준 disabled를 받음
defineProps({
  disabled: Boolean,
  type: { type: String, default: 'button' }, // 기본 type="button"
});
</script>
<template>
  <div class="PrimaryButton">
    <!-- 부모가 전달한 disabled prop에 따라 버튼 비활성화 -->
    <!-- 버튼 클릭 시 부모 컴포넌트에 click 이벤트 전달 -->
    <button
      :type="type"
      :disabled="disabled"
      class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm shadow hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
      @click="$emit('click')"
    >
      <!-- 부모가 <PrimaryButton>저장</PrimaryButton>처럼 버튼 안에 내용을 넣을 수 있음 -->
      <slot />
    </button>
  </div>
</template>
