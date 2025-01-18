<template>
    <el-config-provider namespace="stv">
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
    </el-config-provider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import SettingPage from './components/SettingPage.vue';
import { listenEvents } from './tavern/listen-events';

onMounted(listenEvents);
</script>

<style lang="scss" scoped></style>
