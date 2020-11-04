<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input v-model="tel.value" type="text" @input="_blurTel" />
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text @click="_validation">{{authCode.msg}}</text>
			</view>
			<input type="text" placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<button @click="_submitBtn" type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;">通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	import Request from '../../utils/request.js'
	export default {
		data() {
			return {
				//用户输入的手机号
				tel: {
					value: '',
					check: false
				},
				//发送验证码
				authCode: {
					msg: "获取验证码",
					status: 0
				},
				//用户输入的验证码
				code: {
					value: '',
					check: false
				}
			}
		},
		onLoad() {},
		methods: {
			_blurTel: function() {
				//手机号匹配的正则
				const telReg = /^1[356789]\d{9}$/
				if (telReg.test(this.tel.value)) {
					this.tel.check = true
				} else {
					this.tel.check = false
				}
			},
			_validation: async function() {
				if (this.tel.check) {
					if (this.authCode.status) {
						return
					}
					const res = await Request.getTelCode({
						"phone": this.tel.value
					})
					if (res.data.code == 200) {
						this.authCode.status = 1
						uni.setStorageSync("code", res.data.list)
						let s = 60
						let timer = setInterval(() => {
							if (s <= 1) {
								clearInterval(timer)
								this.authCode.msg = "获取验证码"
								s = 60
								this.authCode.status = 0
								uni.removeStorageSync("code")
								return
							}
							s--
							this.authCode.msg = "重新发送" + s + "秒"
						}, 1000)
					}
				} else {
					uni.showToast({
						title: "请输入正确的手机号",
						icon: "none"
					})
				}
			},
			//登录
			_submitBtn: async function() {
				let code = uni.getStorageSync('code')
				if (this.code.value == code) {
					const res = await Request.submitBtn({
						'phone': this.tel.value
					})
					if (res.data.code == 200) {
						console.log(res)
						uni.setStorageSync("token", res.data.list.token)
						uni.setStorageSync("phone", res.data.list.phone)
						uni.setStorageSync("uid", res.data.list.uid)
						uni.showToast({
							title: "登陆成功"
						})
						uni.navigateBack({
							delta: 2
						})
					}
				}
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box {
		position: relative;
	}

	.row {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}

	.send {
		display: flex;
		justify-content: space-between;
	}

	.send text:nth-of-type(2) {
		color: #00BB00;
	}

	text {
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}

	input {
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
</style>
