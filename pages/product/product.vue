<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" @input="_searchGoods($event)" value="" placeholder="搜索商品" placeholder-class="placeholder" />
		</view>
		<view class="list">
			<view class="row" v-for="item in arrList" @click="_goDetails(item.id)">
				<!-- <view class="row"> -->
				<image :src="item.img | _img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>
					<text>￥{{item.price}}</text>
					<text>3565评论</text>
				</view>
			</view>
		</view>
		<!-- <view class="api">
			暂无商品数据！
		</view> -->
	</view>
</template>

<script>
	import Request from '../../utils/request.js'
	import baseUrl from '../../utils/config.js'
	export default {
		data() {
			return {
				//进入时携带的pid
				fid: '',
				//请求的分类列表
				itemList: [],
				//展示的分类列表
				arrList: [],
				//用户搜索的字符串
				searchGoods: ''
			}
		},
		onLoad(options) {
			console.log(options)
			this.fid = options.fid
			this._getcategoods()
		},
		methods: {
			_getcategoods: async function() {
				let fid = this.fid
				const res = await Request.getcategoods({
					fid
				})
				if (res.data.code == 200) {
					this.itemList = res.data.list
					this.arrList = res.data.list
				}
			},
			//搜索商品
			_searchGoods: function(e) {
				let value = e.detail.value
				if (value.trim()) {
					this.arrList = this.itemList.filter((item) => {
						if (item.goodsname.search(value) != -1) {
							return item
						}
					}) 
					return
				} else {
					this.arrList = this.itemList
				}

			},
			_goDetails:function(id){
				uni.navigateTo({
					url:"../details/details?id="+id
				})
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
	.search {
		margin: 65rpx;
		height: 75rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	icon {
		margin: 0 10rpx 0 250rpx;
	}

	.placeholder {
		color: white;
		font-size: 25rpx;
	}

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
