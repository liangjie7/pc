<template>
    <div class="version-wrapper">
        <el-row class="version-header version-tr" >
            <el-col :span="6">
                <div class="grid-content ">版本编号</div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content ">上传时间</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content ">上传者</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content ">版本详情</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content ">下发升级</div>
            </el-col>
        </el-row>
        <div class="version-tbody">
            <el-row class="version-tr" >
                <el-col :span="6">
                    <div class="grid-content ">201912912</div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content ">数据库接</div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content ">1.0G</div>
                </el-col>
                
                <el-col :span="4">
                    <div class="grid-content "><button>查看详情</button></div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content "><button>下发升级</button></div>
                </el-col>
            </el-row>
           
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style>

</style>
