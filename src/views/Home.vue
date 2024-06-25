<template>
    <div class="main-container">
        <div class="munch-button">
            <MunchButton />
        </div>
        <div class="side-content">
            <SideContent />
        </div>
    </div>
</template>

<script>
import MunchButton from '@/components/MunchButton.vue';
import SideContent from '@/components/SideContent.vue';

export default {
    components: {
        MunchButton, SideContent
    },
}
</script>

<style>
.main-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
}

.munch-button {
    flex: 1;
    margin-right: 20px;
}

.side-content {
    padding-top: 40px;
    flex-shrink: 0;
}
</style>
