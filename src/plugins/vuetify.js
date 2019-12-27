import Vue from 'vue'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

import Vuetify, {
    VBtn,
    VIcon,
    VLazy,
    VColorPicker,
    VProgressCircular,
    VResponsive,
    VImg,
    VCheckbox,
    VTabs,
    VTab,
    VTabsItems,
    VTabItem,
    VSkeletonLoader,
    VBoilerplate
} from 'vuetify/lib'

import { Ripple, Intersect } from 'vuetify/lib/directives'
Vue.use(Vuetify, {
    components: {
        VBtn,
        VIcon,
        VColorPicker,
        VProgressCircular,
        VLazy,
        VResponsive,
        VImg,
        VCheckbox,
        VTabs,
        VTab,
        VTabsItems,
        VTabItem,
        VSkeletonLoader,
        VBoilerplate
    },
    directives: {
        Ripple,
        Intersect
    }
})

const opts = {
    icons: {
        iconfont: 'mdi'
    }
}

export default new Vuetify(opts)
