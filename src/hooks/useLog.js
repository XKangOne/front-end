export function useLog() {
	const tableData = ref([])
	const loading = ref(false)

	const currentPage = ref(1)
	const total = ref(0)
	const limit = ref(12)
	const title = ref('')

	onMounted(() => {
		getData()
	})

	const getData = (p = null) => {
		if (typeof p == 'number') {
			currentPage.value = p
		}
		loading.value = true

		getLogPage(currentPage.value, limit.value, title.value)
			.then(res => {
				tableData.value = res.data.list
				total.value = res.data.total
			})
			.finally(() => {
				loading.value = false
			})
	}

	return {
		tableData,
		loading,
		currentPage,
		title,
		limit,
		total,
		getData
	}
}
