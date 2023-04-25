import axios from '@/utils/axios'

export function getNoticeList() {
	return axios.get('/sys/notice/list')
}

export function getNoticePage(page, limit, title) {
	return axios.get(`/sys/notice/page?page=${page}&limit=${limit}&title=${title}`)
}

export function saveNotice(data) {
	return axios.post('/sys/notice', data)
}

export function updateNotice(data) {
	return axios.put('/sys/notice', data)
}

export function deleteNotice(id) {
	return axios.delete(`/sys/notice/${id}`)
}

export function importNotice(file) {
	return axios.post('/sys/notice/import', file)
}

export function exportNitice() {
	return axios.get('/sys/notice/export')
}
