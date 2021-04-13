import { requests } from './index'


export function tagList() {
  return requests({
    url: '/tagList'
  })
}

export function tagPlayList(pid, pn, rn) {
  return requests({
    url: '/tagPlayList',
    params: { pid, pn, rn }
  })
}

export function playListInfo(pid, pn, rn) {
  return requests({
    url: '/playListInfo',
    params: { pid, pn, rn }
  })
}

export function recommendPlayList(pn, rn) {
  return requests({
    url: '/recommendPlayList',
    params: { pn, rn }
  })
}


export function artistTags() {
  return requests({
    url: '/artistTags'
  })
}

export function artistInfo(cid, pn, rn) {
  return requests({
    url: '/artistInfo',
    params: { cid, pn, rn }
  })
}


export function rankMenu() {
  return requests({
    url: '/rankMenu'
  })
}


export function rankList(bid, pn, rn) {
  return requests({
    url: '/rankList',
    params: { bid, pn, rn }
  })
}

export function artist(aid) {
  return requests({
    url: '/artist',
    params: { aid }
  })
}

export function artistMusic(aid, pn, rn) {
  return requests({
    url: '/artistMusic',
    params: { aid, pn, rn }
  })
}

export function artistAlbum(aid, pn, rn) {
  return requests({
    url: '/artistAlbum',
    params: { aid, pn, rn }
  })
}

export function artistMv(aid, pn, rn) {
  return requests({
    url: '/artistMv',
    params: { aid, pn, rn }
  })
}

export function albumInfo(aid, pn, rn) {
  return requests({
    url: '/albumInfo',
    params: { aid, pn, rn }
  })
}

export function searchKey(keyword) {
  return requests({
    url: '/searchKey',
    params: { keyword }
  })
}


export function searchMusic(keyword, pn, rn) {
  return requests({
    url: '/searchMusic',
    params: { keyword, pn, rn }
  })
}

export function searchAlbum(keyword, pn, rn) {
  return requests({
    url: '/searchAlbum',
    params: { keyword, pn, rn }
  })
}

export function searchMv(keyword, pn, rn) {
  return requests({
    url: '/searchMv',
    params: { keyword, pn, rn }
  })
}

export function searchRcm(keyword, pn, rn) {
  return requests({
    url: '/searchRcm',
    params: { keyword, pn, rn }
  })
}

export function searchSinger(keyword, pn, rn) {
  return requests({
    url: '/searchSinger',
    params: { keyword, pn, rn }
  })
}


export function tagMV() {
  return requests({
    url: '/tagMV'
  })
}

export function mvList(pid, pn, rn) {
  return requests({
    url: '/mvList',
    params: { pid, pn, rn }
  })
}

export function mvInfo(rid) {
  return requests({
    url: '/mv_info',
    params: { rid }
  })
}

export function musicUrl(rid, br="320kmp3") {
  return requests({
    url: '/music_url',
    params: { rid, br }
  })
}

export function songinfo(rid, br="320kmp3") {
  return requests({
    url: '/songinfo',
    params: { rid, br }
  })
}

export function indexInfo() {
  return requests({
    url: '/indexInfo'
  })
}