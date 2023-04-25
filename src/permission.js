import { router, addRoutes } from '@/router'

// 全局前置守卫
let hasGetInfo = false
router.beforeEach(async (to, from, next) => {
	// const store = useAdminStore()

	// const { getAdminInfo } = store

	const token = getToken()

	console.log(token)
	// 没有登录，强制跳转回登录页
	if (!token && to.path != '/login') {
		toast('请先登录', 'error')
		return next({ path: '/login' })
	}

	// 防止重复登录
	if (token && to.path == '/login') {
		toast('请勿重复登录', 'error')
		return next({ path: from.path ? from.path : '/' })
	}

	if (to.path == '/login') {
		hasGetInfo = false
	}

	const { getStoreInfo } = useAdminStore()

	// 如果用户登录了，则获取用户信息并存储在 pinia 中
	// if (token) {

	// 	getAdminInfo()
	// }

	let hasNewRoutes = false
	if (token && !hasGetInfo) {
		console.log('come')
		const res = await getStoreInfo()
		hasGetInfo = true
		//动态添加路由
		hasNewRoutes = addRoutes(res.data.nav)
	}
	//设置页面标题
	let title = '后台系统-' + to.meta.title ? to.meta.title : ''
	document.title = title
	hasNewRoutes ? next(to.fullPath) : next()
})
//全局后置守卫
router.afterEach(() => hideFullLoading())
