// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


// Define Global Components
import InOutSelector from "@/common/components/InOutSelector"
// Register Global Components
Vue.component("in-out-selector", InOutSelector);

// Define Global Directives
import UxUi from "@/common/directives/UxUi"
// Register Global Directives
Vue.directive("ux-ui", UxUi);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
