export function useNotice() {
	//表格数据
	const tableData = ref([])
	const loading = ref(false)

	//分页信息相关变量
	const currentPage = ref(1)
	const total = ref(0)
	const limit = ref(12)
	const title = ref('')

	//页面挂载后，调用获取数据的方法
	onMounted(() => {
		getData()
	})

	//获取数据
	const getData = (p = null) => {
		if (typeof p == 'number') {
			currentPage.value = p
		}
		loading.value = true

		//调用api
		getNoticePage(currentPage.value, limit.value, title.value)
			.then(res => {
				tableData.value = res.data.list
				total.value = res.data.total
			})
			.finally(() => {
				loading.value = false
			})
	}

	//表单部分
	const formDrawerRef = ref(null)
	const formRef = ref(null)
	const form = reactive({
		title: '',
		content: ''
	})
	const rules = {
		title: [
			{
				required: true,
				message: '通知标题不能为空',
				trigger: 'blur'
			}
		],
		content: [
			{
				required: true,
				message: '通知内容不能为空',
				trigger: 'blur'
			}
		]
	}

	//切换抽屉的标题
	const editId = ref(0)
	const drawerTitle = computed(() => (editId.value ? '修改' : '新增'))

	//编辑按钮事件
	const handleEdit = row => {
		editId.value = row.id
		resetForm(row)
		formDrawerRef.value.open()
	}

	//新增和修改复用以下代码
	const handleSubmit = () => {
		formRef.value.validate(valid => {
			if (!valid) {
				return
			}

			formDrawerRef.value.showLoading()

			//根据 editId的值，调用不同的函数（fun 会指向不同的api）
			const fun = editId.value
				? updateNotice({ id: editId.value, title: form.title, content: form.content })
				: saveNotice(form)
			fun
				.then(res => {
					if (res.code === 1) {
						toast(drawerTitle.value + '成功')
						//修改操作刷新当前页，新增操作刷新第一页
						getData(editId.value ? false : 1)
						//关闭抽屉
						formDrawerRef.value.close()
					}
				})
				.finally(() => {
					formDrawerRef.value.hideLoading()
				})
		})
	}

	//重置表单
	function resetForm(row = false) {
		if (formRef.value) {
			formRef.value.clearValidate()
		}
		if (row) {
			for (const key in form) {
				form[key] = row[key]
			}
		}
	}

	//新增按钮事件
	const handleCreate = () => {
		editId.value = 0
		resetForm({
			title: '',
			content: ''
		})
		formDrawerRef.value.open()
	}

	//删除按钮事件
	const handleDelete = id => {
		loading.value = true

		//调用api
		deleteNotice(id)
			.then(res => {
				if (res.code === 1) {
					toast('删除成功')
					//重新请求数据
					getData()
				}
			})
			.finally(() => {
				loading.value = false
			})
	}

	const importNotice = () => {
		console.log('导入数据')
	}
	const exportNotice = () => {
		console.log('导出数据')
	}

	return {
		tableData,
		loading,
		currentPage,
		total,
		limit,
		title,
		form,
		formRef,
		formDrawerRef,
		rules,
		drawerTitle,
		getData,
		handleEdit,
		handleSubmit,
		handleCreate,
		handleDelete,
		importNotice,
		exportNotice
	}
}
