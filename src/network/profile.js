import { requests } from './index'


// 获取用户信息
export function getUserInfo() {
	return requests({
		url: '/music_userinfo',
	})
}

// 登出
export function LogOut() {
	return requests({
		url: '/logout',
	})
}



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

export function getRcm() {
	return requests({
		url: '/like_rcm',
	})
}

export function addRcm(data) {
	return requests({
		url: '/like_rcm',
		data: JSON.stringify({ data }),
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
	})
}

export function delRcm(pid) {
	return requests({
		url: '/like_rcm',
		method: 'delete',
		params: { pid },
	})
}


// 收藏歌手
export function getSinger() {
	return requests({
		url: '/like_singer',
	})
}

export function addSinger(data) {
	return requests({
		url: '/like_singer',
		data: JSON.stringify({ data }),
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
	})
}

export function delSinger(aid) {
	return requests({
		url: '/like_singer',
		method: 'delete',
		params: { aid },
	})
}


// 收藏专辑
export function getAlbum() {
	return requests({
		url: '/like_album',
	})
}

export function addAlbum(data) {
	return requests({
		url: '/like_album',
		data: JSON.stringify({ data }),
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
	})
}

export function delAlbum(aid) {
	return requests({
		url: '/like_album',
		method: 'delete',
		params: { aid },
	})
}