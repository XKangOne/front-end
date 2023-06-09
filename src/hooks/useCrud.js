// 通用列表，分页，新增，删除，修改 封装
export function useInitTable(opt = {}) {
	const tableData = ref([])
	const loading = ref(false)

	// 分页
	const currentPage = ref(1)
	const total = ref(0)
	const limit = ref(12)

	// 获取数据
	function getData(p = null) {
		if (typeof p == 'number') {
			currentPage.value = p
		}

		loading.value = true
		opt
			.getList(currentPage.value, limit.value, '')
			.then(res => {
				tableData.value = res.list
				total.value = res.total
			})
			.finally(() => {
				loading.value = false
			})
	}

	getData()

	// 删除
	const handleDelete = id => {
		loading.value = true
		opt
			.delete(id)
			.then(() => {
				toast('删除成功')
				getData()
			})
			.finally(() => {
				loading.value = false
			})
	}

	return {
		tableData,
		loading,
		currentPage,
		total,
		limit,
		getData,
		handleDelete
	}
}

// 新增，修改
export function useInitForm(opt = {}) {
	// 表单部分
	const formDrawerRef = ref(null)
	const formRef = ref(null)
	const defaultForm = opt.form
	const form = reactive({})
	const rules = opt.rules || {}
	const editId = ref(0)
	const drawerTitle = computed(() => (editId.value ? '修改' : '新增'))

	const handleSubmit = () => {
		formRef.value.validate(valid => {
			if (!valid) return

			formDrawerRef.value.showLoading()

			let body = {}
			if (opt.beforeSubmit && typeof opt.beforeSubmit == 'function') {
				body = opt.beforeSubmit({ ...form })
			} else {
				body = form
			}

			const fun = editId.value
				? opt.update({ id: editId.value, title: form.title, content: form.content })
				: opt.create(body)

			fun
				.then(() => {
					toast(drawerTitle.value + '成功')
					// 修改刷新当前页，新增刷新第一页
					opt.getData(editId.value ? false : 1)
					formDrawerRef.value.close()
				})
				.finally(() => {
					formDrawerRef.value.hideLoading()
				})
		})
	}

	// 重置表单
	function resetForm(row = false) {
		if (formRef.value) formRef.value.clearValidate()
		for (const key in defaultForm) {
			form[key] = row[key]
		}
	}

	// 新增
	const handleCreate = () => {
		editId.value = 0
		resetForm(defaultForm)
		formDrawerRef.value.open()
	}

	// 编辑
	const handleEdit = row => {
		editId.value = row.id
		resetForm(row)
		formDrawerRef.value.open()
	}

	return {
		formDrawerRef,
		formRef,
		form,
		rules,
		editId,
		drawerTitle,
		handleSubmit,
		resetForm,
		handleCreate,
		handleEdit
	}
}
