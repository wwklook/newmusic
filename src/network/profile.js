import { requests } from './index'

// 自定义收藏分组
export function getLikeGroup() {
	return requests({
		url: '/like_group',
	})
}

export function addLikeGroup(name) {
	return requests({
		url: '/like_group',
		data: JSON.stringify({ name }),
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
	})
}

export function delLikeGroup(group_id) {
	return requests({
		url: '/like_group',
		method: 'delete',
		params: { group_id },
	})
}

export function getLike(group_id) {
	return requests({
		url: '/like_song',
		params: { group_id },
	})
}

export function addLike(data, group_id) {
	return requests({
		url: '/like_song',
		data: JSON.stringify({ data, group_id }),
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
	})
}

export function delLike(rid, group_id) {
	return requests({
		url: '/like_song',
		method: 'delete',
		params: { rid, group_id },
	})
}


// 我喜欢
export function getIlove() {
	return requests({
		url: '/ilove',
	})
}

export function addIlove(data) {
	return requests({
		url: '/ilove',
		data: JSON.stringify({ data }),
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

// 收藏歌单

export function getLikeRcm() {
	return requests({
		url: '/like_rcm',
	})
}

export function addLikeRcm(data) {
	return requests({
		url: '/like_rcm',
		data: JSON.stringify({ data }),
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
	})
}

export function delLikeRcm(pid) {
	return requests({
		url: '/like_rcm',
		method: 'delete',
		params: { pid },
	})
}


// 收藏歌手
export function getLikeSinger() {
	return requests({
		url: '/like_singer',
	})
}

export function addLikeSinger(data) {
	return requests({
		url: '/like_singer',
		data: JSON.stringify({ data }),
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
	})
}

export function delLikeSinger(aid) {
	return requests({
		url: '/like_singer',
		method: 'delete',
		params: { aid },
	})
}


// 收藏专辑
export function getLikeAlbum() {
	return requests({
		url: '/like_album',
	})
}

export function addLikeAlbum(data) {
	return requests({
		url: '/like_album',
		data: JSON.stringify({ data }),
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
	})
}

export function delLikeAlbum(aid) {
	return requests({
		url: '/like_album',
		method: 'delete',
		params: { aid },
	})
}