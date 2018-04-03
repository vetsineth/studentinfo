<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<body>
<div id="app">
  {{ message }}
</div>
</body>
<script>
  var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
</script>