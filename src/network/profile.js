import { requests } from './index'


export function getLikeGroup() {
	return requests({
		url: '/likegroup',
	})
}


export function addLike(data, rid, group_id = 1) {
	return requests({
		url: '/addlike',
		data: JSON.stringify({ data, rid, group_id }),
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
	})
}


export function getIlove() {
	return requests({
		url: '/ilove',
	})
}

export function addIlove(data, rid) {
	return requests({
		url: '/ilove',
		data: JSON.stringify({ data, rid }),
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
	})
}

export function delILove(rid) {
	return requests({
		url: '/ilove',
		method: 'delete',
		params: { rid },
	})
}