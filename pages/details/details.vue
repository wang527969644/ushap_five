<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="menu.img | _img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{menu.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{menu.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>
		</view>

		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
					<label class="jian" @click="_numberDel">-</label>
					<label class="zhi">{{number}}</label>
					<label class="jia" @click="_numberAdd">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label></label>
					<view class="bg">红色</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<image :src="productDetailImage.detailImage" mode="widthFix" style="width: 100%;" />
		</view>

		<view class="productEval">
			<view class="eval">商品评价</view>
			<view v-for="(item,index) in evals" :key="index">
				<label class="evalUsername">{{item.name}}</label>
				<label class="evalUsertitle">{{item.title}}</label>
				<view class="evalImage">
					<image v-for="(i,ind) in item.img" :key="ind" :src="i">
				</view>
				<label class="evalTime">{{item.time}}</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="_addCar">加入购物车</button>
			<button class="footbtn2" @click="_butGoods">立即购买</button>
		</view>
	</view>
</template>

<script>
	import baseUrl from '../../utils/config.js'
	import Request from '../../utils/request.js'
	export default {
		data() {
			return {
				bg: 'threed3i1', //商品属性背景色
				productDetailImage: {
					detailImage: "../../static/detail/2.jpg"
				},
				evals: [{ //评价内容
					name: '小李白',
					title: '效果很好，物流到位，下次继续来',
					img: ["../../static/detail/pingjia1.jpg", "../../static/detail/pingjia1.jpg", "../../static/detail/pingjia1.jpg",
						"../../static/detail/pingjia1.jpg", "../../static/detail/pingjia2.jpg", "../../static/detail/pingjia3.jpg"
					],
					time: '2020-01-13'
				}],
				//商品对象属性
				menu: {},
				//购买数量
				number: 1
			}
		},
		onLoad: function(options) {
			this._getgoodsinfo(options.id)
		},
		onShow() {

		},
		filters: {
			//处理图片
			_img(img) {
				return baseUrl + img
			}
		},
		methods: {
			_getgoodsinfo: async function(id) {
				const res = await Request.getgoodsinfo({
					id
				})
				if (res.data.code == 200) {
					this.menu = res.data.list[0]
				}
			},
			//加入购物车
			_addCar: async function() {
				const token = uni.getStorageSync("token")
				if (!token) {
					uni.showToast({
						title: "请登录",
						icon: "none"
					})
					setTimeout(() => {
						uni.navigateTo({
							url: "../../pagesA/login/login"
						})
					}, 1000)
				} else {
					let token = uni.getStorageSync("token")
					let uid = uni.getStorageSync("uid")
					let num = this.number
					let goodsid = this.menu.id
					const res = await Request.addCar(token, {
						uid,
						num,
						goodsid
					})
					console.log(res)
					if (res.data.code == 200) {
						uni.showToast({
							title: "添加成功"
						})
						return
					} else {
						uni.navigateTo({
							title: "登陆过期，请重新登录",
							icon: "none"
						})
						setTimeout(() => {
							uni.navigateTo({
								url: "../../pagesA/login/login"
							})
						}, 1000)
					}
				}
			},
			//立即购买
			_butGoods: function() {				
			},
			_numberDel:async function() {
				if (this.number > 1) {
					this.number--
					return
				} else {
					this.number = 1
					return
				}
			},
			_numberAdd: function() {
				this.number++
			}
		}

	}
</script>

<style>
	@import url("../../common/css/details.css");
</style>
