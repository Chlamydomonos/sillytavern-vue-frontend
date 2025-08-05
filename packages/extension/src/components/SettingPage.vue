<template>
    <div class="vf-outer-container">
        <div class="vf-inner-container">
            <div>
                <small>当前版本: v{{ version }}</small>
            </div>
            <div class="vf-switch-row">
                <div class="vf-text">启用</div>
                <el-switch v-model="settings.enabled" />
            </div>
            <div>
                <el-button @click="uploadFrontend">上传Vue前端到世界书</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { version } from '@/lib/version';
import { useSettingsStore } from '@/stores/setting';
import { uploadFrontend } from '@/tavern/upload-frontend';

const { settings } = useSettingsStore();
</script>

<style lang="scss">
.vf-outer-container {
    border: 1px solid gray;
    border-radius: 4px;
    margin: 2px;
    background-color: rgb(11, 24, 35);
    --stv-text-color-primary: #dcdcd2;
}

.vf-inner-container {
    margin: 5px;
}

.vf-switch-row {
    display: flex;
    justify-content: space-between;
}

.vf-text {
    line-height: 32px;
}
</style>
