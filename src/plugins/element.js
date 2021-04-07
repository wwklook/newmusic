import { ElAside, ElAutocomplete, ElButton, ElCarousel, ElCarouselItem, ElCollapse, ElCollapseItem, ElContainer, ElDialog, ElFooter, ElForm, ElHeader, ElInfiniteScroll, ElLoading, ElMain, ElMessage, ElMessageBox, ElPagination, ElPopover, ElRadio, ElSlider, ElTooltip } from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale'

export default (app) => {
  locale.use(lang)
  app
    .use(ElButton)
    .use(ElMain)
    .use(ElHeader)
    .use(ElContainer)
    .use(ElFooter)
    .use(ElCarousel)
    .use(ElCarouselItem)
    .use(ElCollapse)
    .use(ElCollapseItem)
    .use(ElAside)
    .use(ElPagination)
    .use(ElSlider)
    .use(ElTooltip)
		.use(ElAutocomplete)
		.use(ElPopover)
		.use(ElRadio)
		.use(ElDialog)
		.use(ElForm)
    .directive('infinite-scroll', ElInfiniteScroll)

		app.config.globalProperties.$message = ElMessage
		app.config.globalProperties.$confirm = ElMessageBox.confirm
		app.config.globalProperties.$prompt = ElMessageBox.prompt
    app.config.globalProperties.$loading = ElLoading.service
}