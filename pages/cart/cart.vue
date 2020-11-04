<template>
	<view class="container" v-if="buffer">
		<view class="top" v-for="(item,index) in cartList" :key="index">
			<scroll-view class="scroll-view_H" scroll-x="true" :scroll-left="scrollLeft">
				<view class="cartInfo" id="demo1">
					<!-- 明日来写购物车基本信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch type="checkbox" :checked="item.status?true:false" @click="_pitchItem(index)" />
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common">
							<image :src="item.img|_img" mode="widthFix"></image>
						</view>

						<!-- 信息 -->
						<view class="cartInfo_info">
							<label style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label style="font-size: 24rpx; color: #ccc;">规格：不错的商品</label>
							<label style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label @click="_Del(index)">-</label>
								<label>{{item.num}}</label>
								<label @click="_Add(index)">+</label>
							</view>
						</view>
					</view>

				</view>
				<view class="cartDel" id="demo2" @click="_remiveShop(item.id,index)">
					<label for="">删除</label>
				</view>
			</scroll-view>
		</view>

		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked="pitchAll" @click="_pitchAllBtn" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">总计：<label style="color: red;">{{_total}}</label></view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3">
				<!-- 被选中的商品的个数 -->
				<label @click="_goConfirm">去结算({{goodsNum}}件)</label>
			</view>
		</view>

	</view>
	<view v-else>
		<image src="/static/kk.jpg" mode="widthFix"></image>
	</view>
</template>

<script>
	import baseUrl from '../../utils/config.js'
	import Request from "../../utils/request.js"
	export default {
		data() {
			return {
				//购物车数据
				cartList: [],
				scrollLeft: 0, //默认横向滚动 0,
				buffer: true, //检测购物车是否有数据
				//全选按钮
				pitchAll: true,
				//商品件数
				goodsNum: 0
			}
		},
		onLoad() {
			this._cartlist()
		},
		// 页面显示时
		onShow() {
			this._cartlist()
		},
		methods: {
			//进入页面请求的数据
			_cartlist: async function() {
				let token = uni.getStorageSync("token")
				if (token) {
					this.buffer = true
					let uid = uni.getStorageSync("uid")
					const res = await Request.cartlist(token, {
						uid
					})
					if (res.data.code == 200) {
						this.cartList = res.data.list
						this._itemNum()
					}
				} else {
					this.buffer = false
				}
			},
			//点击全选按钮时
			_pitchAllBtn: function() {
				this.pitchAll = !this.pitchAll
				this.cartList.forEach(item => {
					item.status = Number(this.pitchAll)
				})
				this._itemNum()
			},
			//点击商品选择按钮
			_pitchItem: function(e) {
				this.cartList[e].status = !this.cartList[e].status
				let num = 0
				let a = this.cartList.forEach(item => {
					num += item.status
				})
				if (num == this.cartList.length) {
					this.pitchAll = true
				} else {
					this.pitchAll = false
				}
				this._itemNum()
			},
			//商品的数量
			_itemNum: function() {
				this.goodsNum = 0
				this.cartList.forEach(item => {
					if (item.status == 1) {
						this.goodsNum += item.num
					}
				})
			},
			//商品增加
			_Del: async function(index) {
				const token = uni.getStorageSync("token")
				const id = this.cartList[index].id
				const res = await Request.reclist(token, {
					type: 1,
					id
				})
				if (res.data.code == 200) {
					let num = this.cartList[index].num
					console.log()
					if (num > 1) {
						this.cartList[index].num--
						this._itemNum()
						return
					} else {
						this.cartList[index].num = 1
						this._itemNum()
						return
					}
				}

			},
			//商品减小
			_Add: async function(index) {
				const token = uni.getStorageSync("token")
				const id = this.cartList[index].id
				const res = await Request.reclist(token, {
					type: 2,
					id
				})
				if (res.data.code == 200) {
					this.cartList[index].num++
					this._itemNum()
				}
			},
			//购物车删除
			_remiveShop: function(id, index) {
				const token = uni.getStorageSync("token")
				uni.showModal({
					title: "提示",
					content: "确定要删除吗？",
					success: async (res) => {
						if (res.confirm) {
							const res = await Request.removelist(token, {
								id
							})
							if (res.data.code == 200) {
								this.cartList.splice(index, 1)
							}
						} else {
							return
						}
					}
				})
			},
			//跳转结算页面
			_goConfirm: function() {
				let  list =  this.cartList.filter(item=>{
					if(item.status ==1){
						return item
					}
				})
				list =JSON.stringify({list})
				uni.navigateTo({
					url:"../../pagesA/confirm/confirm?list="+list
				})
			}
		},
		filters: {
			_img(img) {
				return baseUrl + img
			}
		},
		computed: {
			_total() {
				let x = 0
				this.cartList.forEach(item => {
					if (item.status == 1) {
						x += item.num * item.price
					}
				})
				return x
			}
		}
	}
</script>

<style>
	@import url("../../common/css/cart.css");

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}
</style>
