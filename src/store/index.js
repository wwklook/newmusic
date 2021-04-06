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
		setting: {}
	},
	mutations: {
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
			state.ilovelist.push(data)
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
		}
	},
	actions: {
	},
	modules: {
	}
})
