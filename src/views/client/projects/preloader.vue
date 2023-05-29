<template>
    <div>
        <content-placeholders :animated="true" :rounded="true">
            <el-row :gutter="20" align="middle" type="flex">
                <el-col :span="24" type="success">
                    <content-placeholders-heading />
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row type="flex" align="center">
                <el-col :span="24" style="padding:15px">
                    <el-row :gutter="20">
                        <el-col :span="24" :sm="9" :md="10" :lg="7">
                            <div class="featured_image">
                                <content-placeholders-img />
                            </div>
                        </el-col>
                        <el-col :span="24" :sm="15" :md="14" :lg="17">
                            <div class="mb-1 content_short">
                                <content-placeholders-text :lines="3" />
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <div style="margin-top: 2rem;">
                <content-placeholders-text :lines="10" />
            </div>
        </content-placeholders>
    </div>
</template>
<style scoped lang="scss">
.content_short {
    @media all and (max-width: 768px) {
        margin-top: 0.5rem;
    }
}

.vue-content-placeholders-img {
    background: #94a3b8 !important;
}
</style>
