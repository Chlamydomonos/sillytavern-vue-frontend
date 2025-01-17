<template>
    <div class="example-extension-settings">
        <div class="inline-drawer">
            <div class="inline-drawer-toggle inline-drawer-header">
                <b>Vue前端</b>
                <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
            </div>
            <div class="inline-drawer-content">
                <SettingPage />
                <hr class="sysHR" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SettingPage from './components/SettingPage.vue';
</script>
