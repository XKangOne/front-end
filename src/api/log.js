import axios from '@/utils/axios'

export function getLogPage(page, limit, title) {
	return axios.get(`/sys/log/login/page?page=${page}&limit=${limit}&title=${title}`)
}
