<template>
    <div id="index-content">
        <div class="index-section">
            <div class="index-block"  @click="get('resource')">
                <p class="header">资源管理</p>
                <div class="content">
                    <span class="tips">
                            这是资源管理这是资源管理这是资源管理这是资源管理
                    </span>
                    <div class="logo"><img src="../../assets/img/logo.png" /></div>
                </div>
            </div>
            <div class="index-block" @click="get('login')">
                <p class="header">资源管理</p>
                <!-- <div>
                          <span>
                            的罚款进度款拉进来开发男的呢就差你的基础那就亏大可口可乐家居快递费
                          </span>
                          <img src="../../assets/img/logo.png"/>
                      </div> -->
            </div>
            <div class="index-block">
                <p class="header">资源管理</p>
                <!-- <div>
                          <span>
                            的罚款进度款拉进来开发男的呢就差你的基础那就亏大可口可乐家居快递费
                          </span>
                          <img src="../../assets/img/logo.png"/>
                      </div> -->
            </div>
        </div>
        <div class="index-section">
            <div class="index-block">
                <p class="header">资源管理</p>
                <!-- <div>
                          <span>
                            的罚款进度款拉进来开发男的呢就差你的基础那就亏大可口可乐家居快递费
                          </span>
                          <img src="../../assets/img/logo.png"/>
                      </div> -->
            </div>
            <div class="index-block">
                <p class="header">资源管理</p>
                <!-- <div>
                          <span>
                            的罚款进度款拉进来开发男的呢就差你的基础那就亏大可口可乐家居快递费
                          </span>
                          <img src="../../assets/img/logo.png"/>
                      </div> -->
            </div>
            <div class="index-block">
                <p class="header">资源管理</p>
                
            </div>
        </div>
    </div>
</template>

<script>
export default{
    methods: {
        get(val){
            
             location.assign(window.g.path+val+'.html')
        },
        getModules(){
            this.$store.dispatch('getModules',{'route_code_id':'-1'})
        }
    },
    created(){
        this.getModules();
    }
}

</script>

<style lang="scss">


</style>
