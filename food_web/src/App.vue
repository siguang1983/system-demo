<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
	html, body { width: 100%; height: 100%;}
	#app {
		font-size: 14px;
		height: 100%;
		color: #4b4b4b;
	}

	body { margin: 0; }

	a {color: #707070; font-size: 14px;}
	a:hover { color: #000 }
</style>
