<template>
	<div class="tabs-content-item" v-html="product.description" />
</template>

<script>
export default {
  props: {
    product: {}
  }
}
</script>
