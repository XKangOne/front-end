export const useAdminStore = defineStore('admin', {
	state: () => ({
		//管理员信息
		adminInfo: {},
		sideWidth: '220px',
		menus: [],
		authorities: []
	}),
	actions: {
		// 登录
		storeLogin(username, password) {
			return new Promise((resolve, reject) => {
				login(username, password)
					.then(res => {
						setToken(res.data.accessToken)
						resolve(res)
					})
					.catch(err => reject(err))
			})
		},
		// 获取当前登录者信息
		getStoreInfo() {
			return new Promise((resolve, reject) => {
				getInfo()
					.then(res => {
						console.log(res)
						this.adminInfo = res.data.sysUserVO
						this.menus = res.data.nav
						this.authorities = res.data.authority
						resolve(res)
					})
					.catch(err => reject(err))
			})
		},
		//获取导航菜单
		getStoreNav() {
			return new Promise((resolve, reject) => {
				getNav()
					.then(res => {
						console.log(res.data)
						this.menus = res.data
						resolve(res)
					})
					.catch(err => reject(err))
			})
		},
		//获取所有授权信息
		getStoreAuthority() {
			return new Promise((resolve, reject) => {
				getAuthority()
					.then(res => {
						console.log(res.data)
						this.authorities = res.data
						resolve(res)
					})
					.catch(err => reject(err))
			})
		},
		// 退出登录
		storeLogout() {
			return new Promise((resolve, reject) => {
				logout()
					.then(() => {
						// 移除 cookie里的 token
						removeToken()
						//移除cookie里的tabList
						removeTabList()
						// 清空状态
						this.adminInfo = {}
						resolve()
					})
					.catch(err => reject(err))
			})
		},
		// 伸缩
		handleSideWidth() {
			this.sideWidth = this.sideWidth === '220px' ? '64px' : '220px'
		}
	}
})
