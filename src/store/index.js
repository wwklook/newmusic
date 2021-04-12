import { createStore } from 'vuex'

export default createStore({
	state: {
		mvList: [],
		playList: [],
		playRid: [],
		playIndex: -1,
		ilovelist: [],
		iloverid: [],
		likegroup: [],
		isLogin: false,
		historyList: [],
		historyRid: [],
		setting: {},

		album_list: [],
		rcm_list: [],
		singer_list: [],
		album_id: [],
		rcm_id: [],
		singer_id: [],
		userinfo: {},
	},
	mutations: {
		Init(state, data) {
			state.isLogin = data.login
			state.ilovelist = data.love_list
			state.iloverid = data.love_list.map((item) => {
				return item.rid;
			});
			state.likegroup = data.group_list
			state.album_list = data.album_list
			state.rcm_list = data.rcm_list
			state.singer_list = data.singer_list
			state.album_id = data.album_list.map((item) => {
				return item.aid;
			});
			state.rcm_id = data.rcm_list.map((item) => {
				return item.pid;
			});
			state.singer_id = data.singer_list.map((item) => {
				return item.aid;
			});
			state.userinfo = data.userinfo
		},
		changeSetting(state, setting) {
			state.setting = setting
		},
		changeLoginState(state, isLogin) {
			state.isLogin = isLogin
		},
		changePlaylist(state, list) {
			state.playIndex = 0
			state.playList = [...list]
			state.playRid = state.playList.map((value) => {
				return value.rid
			})
		},
		changeIlovelist(state, list) {
			state.ilovelist = list
		},
		changeIloverid(state, list) {
			state.iloverid = list
		},
		changeLikeGroup(state, list) {
			state.likegroup = list
		},
		changeHistoryList(state, list) {
			state.historyList = list;
			state.historyRid = state.historyList.map((value) => {
				return value.rid
			})
		},
		changeMvList(state, list) {
			state.mvList = list
		},
		changePlayIndex(state, index) {
			state.playIndex = index
		},
		addPlaylist(state, data) {
			let index = state.playRid.indexOf(data.rid)
			if (index === -1) {
				state.playList.push(data)
				state.playRid.push(data.rid)
				state.playIndex = state.playList.length - 1
			} else {
				state.playIndex = index;
			}
		},
		addLove(state, data) {
			state.ilovelist.push({ data })
			state.iloverid.push(data.rid + "")
		},
		addLike(state, list, index) {
			state.likegroup[index].likesong.push(list)
		},
		addHistory(state, data) {
			let index = state.historyRid.indexOf(data.rid)
			if (index !== -1) {
				state.historyList.splice(index, 1)
				state.historyRid.splice(index, 1)
			}
			state.historyList.unshift(data)
			state.historyRid.unshift(data.rid)
			localStorage.setItem(
				"historyList",
				JSON.stringify(state.historyList)
			);
		},
		delPlaylist(state, index) {
			state.playList.splice(index, 1)
			if (index < state.playIndex) {
				state.playIndex -= 1
			}
			if (index !== state.playIndex) return
			if (state.playIndex = state.playList.length - 1) {
				state.playIndex = 0
			}
		},
		delLove(state, index) {
			state.ilovelist.splice(index, 1)
			state.iloverid.splice(index, 1)
		},
		delHistory(state, index) {
			state.historyList.splice(index, 1)
			state.historyRid.splice(index, 1)
			localStorage.setItem(
				"historyList",
				JSON.stringify(state.historyList)
			);
		},

		addAlbum(state, data) {
			state.album_list.push(data)
			state.album_id.push(data.albumid + "")
		},
		delAlbum(state, index) {
			state.album_list.splice(index, 1)
			state.album_id.splice(index, 1)
		},
		addSinger(state, data) {
			state.singer_list.push(data)
			state.singer_id.push(data.id + "")
		},
		delSinger(state, index) {
			state.singer_list.splice(index, 1)
			state.singer_id.splice(index, 1)
		},
		addRcm(state, data) {
			state.rcm_list.push(data)
			state.rcm_id.push(data.id + "")
		},
		delRcm(state, index) {
			state.rcm_list.splice(index, 1)
			state.rcm_id.splice(index, 1)
		},
	},
	actions: {
	},
	modules: {
	}
})
