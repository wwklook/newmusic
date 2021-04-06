import { createRouter, createWebHistory } from 'vue-router'

const Music = () => import('@/Music.vue')


const Mvs = () => import('@/views/Mvs.vue')
const Rank = () => import('@/views/Rank.vue')
const Playlist = () => import('@/views/Playlist.vue')
const PlaylistDetail = () => import('@/views/PlaylistDetail.vue')
const Recommend = () => import('@/views/Recommend.vue')
const Singers = () => import('@/views/Singers.vue')
const SingerDetail = () => import('@/views/SingerDetail.vue')
const Album = () => import('@/views/Album.vue')
const History = () => import('@/views/History.vue')
const Proflie = () => import('@/views/Profile.vue')
const Lrc = () => import('@/views/Lrc.vue')


const Search = () => import('@/views/Search.vue')
const SearchMusic = () => import('@/views/search/SearchMusic.vue')
const SearchAlbum = () => import('@/views/search/SearchAlbum.vue')
const SearchMv = () => import('@/views/search/SearchMv.vue')
const SearchPlaylist = () => import('@/views/search/SearchPlaylist.vue')
const SearchSinger = () => import('@/views/search/SearchSinger.vue')


const Rcm = () => import('@/views/profile/Rcm.vue')
const Love = () => import('@/views/profile/Love.vue')
const LikeRcm = () => import('@/views/profile/LikeRcm.vue')
const LikeSinger = () => import('@/views/profile/LikeSinger.vue')
const LikeAlbum = () => import('@/views/profile/LikeAlbum.vue')




const routes = [
  {
    path: '',
    redirect: '/music'
  }, {
    path: '/music',
    name: 'Music',
    component: Music,
    children: [
      {
        path: '',
        name: 'Recommend',
        component: Recommend
      }, {
        path: 'rank',
        name: 'Rank',
        component: Rank
      }, {
        path: 'playlist',
        name: 'Playlist',
        component: Playlist
      }, {
        path: 'mvs',
        name: 'Mvs',
        component: Mvs
      }, {
        path: 'singers',
        name: 'Singers',
        component: Singers
      }, {
        path: 'playlist_detail',
        name: 'PlaylistDetail',
        component: PlaylistDetail
      }, {
        path: 'history',
        name: 'History',
        component: History
      }, {
        path: 'singer_detail',
        name: 'SingerDetail',
        component: SingerDetail,
        children: []
      }, {
        path: 'album',
        name: 'Album',
        component: Album,
      }, {
        path: 'lrc',
        name: 'Lrc',
        component: Lrc,
      }, {
        path: 'profile',
        name: 'Proflie',
        component: Proflie,
        redirect: '/music/profile/love',
        children: [
          {
            path: 'love',
            name: 'Love',
            component: Love,
          }, {
            path: 'rcm',
            name: 'Rcm',
            component: Rcm,
          }, {
            path: 'like_rcm',
            name: 'LikeRcm',
            component: LikeRcm,
          }, {
            path: 'like_singer',
            name: 'LikeSinger',
            component: LikeSinger,
          }, {
            path: 'like_album',
            name: 'LikeAlbum',
            component: LikeAlbum,
          }
        ]
      }, {
        path: 'search',
        name: 'Search',
        component: Search,
        redirect: '/music/search/music',
        children: [
          {
            path: 'music',
            name: 'SearchMusic',
            component: SearchMusic,
          }, {
            path: 'album',
            name: 'SearchAlbum',
            component: SearchAlbum,
          }, {
            path: 'mv',
            name: 'SearchMv',
            component: SearchMv,
          }, {
            path: 'playlist',
            name: 'SearchPlaylist',
            component: SearchPlaylist,
          }, {
            path: 'singer',
            name: 'SearchSinger',
            component: SearchSinger,
          }
        ]
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
