<template>
	<view class="container">
		<!-- 顶部头像部分 -->
		<view class="mineTop">
			<view class="mineTop_left"  @click="_login">
				<view class="mineTop_left_image">
					<image :src="userinfo.img" mode="widthFix"></image>
				</view>
				<view class="mineTop_left_info">
					<label for="" style="color: #fff;">{{userinfo.phone}}</label>
				</view>
			</view>
			<view class="mineTop_right">
				<view class="mineTop_right_info">
					<label for="">今日签到</label>
				</view>
			</view>
		</view>

		<!-- 订单状态 -->
		<view class="order_state">
			<view class="order_state_list" v-for="(item,ind) in orderList" :key="ind">
				<image :src="item.icon" mode=""></image>
				<text class="list_text">{{item.name}}</text>
			</view>
		</view>

		<!-- 个人信息 -->
		<view class="person_msg">
			<view class="person_msg_list" v-for="(item,ind) in personMsgList" :key="ind">
				<view class="person_msg_list_info">
					<image :src="item.icon" alt class="MsgItemLogo" />
					<label>{{item.name}}</label>
				</view>
				<view class="MsgItemRight">
					<label class="remaB" v-show="item.remaBala">200余额</label>
					<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {
					phone: '请登录',
					img: '/static/mine/tou.png'
				},
				// 订单状态信息
				orderList: [{
						name: "全部订单",
						icon: "../../static/mine/quanbudingdan.png"
					},
					{
						name: "待付款",
						icon: "../../static/mine/daifukuan.png"
					},
					{
						name: "待收货",
						icon: "../../static/mine/daishouhuo.png"
					}
				],
				//   个人信息
				personMsgList: [{
						name: "地址管理",
						icon: "../../static/mine/dizhiguanli.png"
					},
					{
						name: "我的钱包",
						icon: "../../static/mine/zu.png",
						remaBala: "200余额"
					},
					{
						name: "我的优惠券",
						icon: "../../static/mine/wodeyouhuiquan.png",
					},
					{
						name: "我的二维码",
						icon: "../../static/mine/wodeerweima.png",
					},
					{
						name: "我的小伙伴",
						icon: "../../static/mine/xiaohuoban.png"
					}
				],
			}
		},
		onLoad() {
		},
		onShow() {
			const token = uni.getStorageSync('token')
			if (token) {
				this.userinfo.phone = "已登录"
			} else {
				this.userinfo.phone = "请登录"
			}
		},
		methods: {
			_login: function() {
				if (this.userinfo.phone == '请登录') {
					uni.navigateTo({
						url: '../../pagesA/login/login'
					})
				}
			}
		}
	}
</script>

<style>
	@import url("../../common/css/mine.css");
</style>
