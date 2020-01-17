<template>
  <div class="recycle">
    <div class="title">
      回收站
    </div>
    <div class="no-data" v-if="recycleItems.length == 0">暂无已删除的事项</div>
    <ritem v-for="item in recycleItems" :key="item.id" :item="item" @revert="revertItem"></ritem>

  </div>
</template>

<script>
  /**
   *  回收站页面组件
   */
  module.exports = {
    name: 'recycle',// 组件的名称，尽量和文件名一致
    components: {
      ritem: httpVueLoader('../components/ritem.vue')
    },
    data() {
      return {
        recycleItems: []// 已删除事项的列表
      }
    },
    mounted() {
      // 接收到删除事件后，增加对应的逻辑
      this.$EventBus.$on('addDelete', (obj) =>{
        // 往已删除列表中添加数据
        this.recycleItems.push(obj)
      })
      this.fetchData()
    },
    watch: {
      // 监听recycleItems
      recycleItems(val) {
        this.storeItems(val)// 一旦有改动立刻调用更新存储
      }
    },
    methods: {
      /**
       * 从存储中获取已删除事项数据
       */
      fetchData() {
        this.recycleItems = this.$dataUtils.getItem('recycleList') || []
      },
      /**
       * 恢复事项
       */
      revertItem(obj) {
        // 创建一个新数组
        let newArray = []
        // 将需要恢复的事项从已删除事项列表中剔除
        this.recycleItems.forEach((item) =>{
          if (item.id != obj.id) {
            newArray.push(item)
          }
        })
        // 赋值新数组
        this.recycleItems = newArray

        this.$EventBus.$emit('addRevert', obj)
      },
      /**
       * 存储已删除事项列表
       */
      storeItems(array) {
        this.$dataUtils.setItem('recycleList', array)
      }
    }
  }
</script>
<style>
  .recycle .title {
    font-size: 24px;
    font-weight: 600;
    line-height: 27px;
    margin-bottom: 24px;
    text-align: center;
  }

  .recycle .no-data {
    text-align: center;
  }
</style>
