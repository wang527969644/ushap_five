<template>
	<view>
		<uniSearchBar :radius="100" bgColor="#ffff" @confirm="search" @input="_input($event)"></uniSearchBar>
		<view class="list" v-if="buffer">
			<view class="row" v-for="(item,index) in searchList" :key='index'>
				<image :src="item.img|_img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>
					<text>￥{{item.price}}</text>
					<text>3565评论</text>
				</view>
			</view>
		</view>
		<view class="api" v-else>
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import baseUrl from '../../utils/config.js'
	import Request from '../../utils/request.js'
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	export default {
		components: {
			uniSearchBar
		},
		data() {
			return {
				buffer: true, //页面显示开关,
				//搜索列表
				searchList: []
			}
		},
		onLoad(options) {

		},

		methods: {
			_input: async function(e) {
				console.log(e)
				const res = await Request.search({
					keywords: e.value
				})
				console.log(res)
				if (res.data.code == 200) {
					this.buffer = true
					this.searchList = res.data.list
				} else {
					this.buffer = false
				}
			}
		},
		filters: {
			_img(img) {
				return baseUrl + img
			}
		}

	}
</script>

<style>
	.row {
		position: relative;
		margin: 10rpx 20rpx;
		height: 190rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}

	image {
		position: absolute;
		top: 0;
		left: 10rpx;
		width: 160rpx;
	}

	.info {
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
	}

	.info text:nth-of-type(2) {
		color: red;
	}

	.info text:nth-of-type(3) {
		font-size: 20rpx;
		color: #AAAAAA;
	}

	.api {
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
