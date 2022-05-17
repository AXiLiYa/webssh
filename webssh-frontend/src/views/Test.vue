<script setup lang="ts">
import { useStore } from '../store/app';
import { storeToRefs } from 'pinia';

const appStore = useStore();
const { counter } = storeToRefs(appStore);
</script>

<template>
  This page just show the counter: <code>{{ counter }}</code>
</template>