<template>
  <div class="recycle-item" :class="{completed:item.isCompleted}">
    <div class="item-checkbox">
      <input type="checkbox" class="checkbox" disabled="disabled">
    </div>
    <div class="item-content">
      <div class="break-all">{{item.content}}</div>
    </div>
    <div class="item-revert" @click="revertItem" title="恢复"></div>
  </div>
</template>

<script>
  /**
   * @module TodoItem
   */
  module.exports = {
    name: 'TodoItem',

    props: {
      /**
       *  @type TodoItem
       */
      item: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        contentLocal: ''
      }
    },
    computed: {

    },

    methods: {
      /**
       * Deletes a todo item
       */
      revertItem() {
        // this.item.deletedAt = null;
        this.$emit('revert', this.item)
      }

    }
  }
</script>

<style>
  .recycle-item {
    display: flex;

    align-items: center;
    margin-bottom: 16px;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    position: relative;
  }

  .recycle-item.completed {
    text-decoration: line-through;
    opacity: .5;
  }

  .item-content {
    flex: 1;
    padding-left: 10px;
    padding-right: 30px;
  }

  .item-revert {
    cursor: pointer;
    width: 25px;
    height: 25px;
    background-image: url('./revert.png');
    position: absolute;
    background-size: 60% 60%;

    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
    right: 11px;
  }

  .item-revert:hover {
    background-color: #dbdbdb;
  }
</style>
