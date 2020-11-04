]<template>
	<view>
		<uni-search-bar :radius="100" bgColor="#ffff" @confirm="search" @input="input" @cancel="cancel"></uni-search-bar>
		<view class="list" v-if="buffer">
			<view class="row" v-for="(item,index) in orders" :key="index">
				<view class="imagebox">
					<image :src="item.child[0].img|_img" mode="widthFix" ></image>
				</view>
				<view class="info">
					<text  space="nbsp">总计{{item.countnumber}}商品  </text>  
					<text>应付金额 ￥:{{item.countmoney}}</text>
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
		components: {uniSearchBar},
		data() {
			return {
				orders:[],
				buffer:true,//页面显示开关,
			}
		},
		onLoad() {
			this._getOrders()
		},
		methods: {
			_getOrders:async function(){
				const token = uni.getStorageSync('token')
				const uid = uni.getStorageSync("uid")
				const res = await Request.getOrders(token,{uid})
				console.log(res)
				if(res.data.code == 200){
					if(res.data.list){
						this.orders = res.data.list
						this.buffer = true
					}else{
						this.buffer = false
						this.orders = []
					}
					
				}
			}
		},
		filters:{
			_img(img){
				return baseUrl+img
			}
		}
		
	}
</script>

<style>

	.row{
		position: relative;
		margin: 10rpx 20rpx;
		height: 240rpx;
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
	}
	
	.imagebox{
		position: absolute;
		top: 10rpx;
		left:10rpx;
		display: flex;
		align-items: center;
	}
	image{
		width: 160rpx;
		margin-left: 10rpx;
	}
	.info{
		position: absolute;
		top: 180rpx;
		right: 50rpx;
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		width: 340rpx;
	}
	.info text:nth-of-type(2){
		color: red;
	}
	.info text:nth-of-type(3){
		font-size: 20rpx;
		color: #AAAAAA;
	}
	.api{
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
