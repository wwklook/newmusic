import { requests } from './index'


export function tagList() {
  return requests({
    url: '/api/tagList'
  })
}

export function tagPlayList(pid, pn, rn) {
  return requests({
    url: '/api/tagPlayList',
    params: { pid, pn, rn }
  })
}

export function playListInfo(pid, pn, rn) {
  return requests({
    url: '/api/playListInfo',
    params: { pid, pn, rn }
  })
}

export function recommendPlayList(pn, rn) {
  return requests({
    url: '/api/recommendPlayList',
    params: { pn, rn }
  })
}


export function artistTags() {
  return requests({
    url: '/api/artistTags'
  })
}

export function artistInfo(cid, pn, rn) {
  return requests({
    url: '/api/artistInfo',
    params: { cid, pn, rn }
  })
}


export function rankMenu() {
  return requests({
    url: '/api/rankMenu'
  })
}


export function rankList(bid, pn, rn) {
  return requests({
    url: '/api/rankList',
    params: { bid, pn, rn }
  })
}

export function artist(aid) {
  return requests({
    url: '/api/artist',
    params: { aid }
  })
}

export function artistMusic(aid, pn, rn) {
  return requests({
    url: '/api/artistMusic',
    params: { aid, pn, rn }
  })
}

export function artistAlbum(aid, pn, rn) {
  return requests({
    url: '/api/artistAlbum',
    params: { aid, pn, rn }
  })
}

export function artistMv(aid, pn, rn) {
  return requests({
    url: '/api/artistMv',
    params: { aid, pn, rn }
  })
}

export function albumInfo(aid, pn, rn) {
  return requests({
    url: '/api/albumInfo',
    params: { aid, pn, rn }
  })
}

export function searchKey(keyword) {
  return requests({
    url: '/api/searchKey',
    params: { keyword }
  })
}


export function searchMusic(keyword, pn, rn) {
  return requests({
    url: '/api/searchMusic',
    params: { keyword, pn, rn }
  })
}

export function searchAlbum(keyword, pn, rn) {
  return requests({
    url: '/api/searchAlbum',
    params: { keyword, pn, rn }
  })
}

export function searchMv(keyword, pn, rn) {
  return requests({
    url: '/api/searchMv',
    params: { keyword, pn, rn }
  })
}

export function searchRcm(keyword, pn, rn) {
  return requests({
    url: '/api/searchRcm',
    params: { keyword, pn, rn }
  })
}

export function searchSinger(keyword, pn, rn) {
  return requests({
    url: '/api/searchSinger',
    params: { keyword, pn, rn }
  })
}


export function tagMV() {
  return requests({
    url: '/api/tagMV'
  })
}

export function mvList(pid, pn, rn) {
  return requests({
    url: '/api/mvList',
    params: { pid, pn, rn }
  })
}

export function mvInfo(rid) {
  return requests({
    url: '/api/mv_info',
    params: { rid }
  })
}

export function musicUrl(rid, br="320kmp3") {
  return requests({
    url: '/api/music_url',
    params: { rid, br }
  })
}

export function songinfo(rid, br="320kmp3") {
  return requests({
    url: '/api/songinfo',
    params: { rid, br }
  })
}

export function indexInfo() {
  return requests({
    url: '/api/indexInfo'
  })
}