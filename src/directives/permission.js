// src 新建 directives 目录，新建 permission.js 自定义指令文件，
//和 store 中存储的 authorities 用户权限列表进行比对，
//如果有就显示该按钮（不一定是按钮，有可能是其他形式的组件）。
function hasPermission(value, el = false) {
	const store = useAdminStore()
	if (!Array.isArray(value)) {
		throw new ErrorEvent(`需要配置权限,例如 v-permisssion="['sys:notice:page']"`)
	}

	const hasAuth = value.findIndex(v => store.authorities.includes(v)) != -1
	if (el && !hasAuth) {
		el.parentNode && el.parentNode.removeChild(el)
	}
	return hasAuth
}

export default {
	install(app) {
		app.directive('permission', {
			mounted(el, binding) {
				hasPermission(binding.value, el)
			}
		})
	}
}
