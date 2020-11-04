<template>
	<view class="container">
		<!-- left左侧一级分类列表 -->
		<scroll-view scroll-y class="left">
			<!-- 循环遍历的 -->
			<view class="left_list" :class="activeIndex == ind ? 'activeList' : ''" v-for="(item,ind) in cateData" :key="ind"
			 @click="_firstMenu(item.id,ind)">
				<label for="">{{ item.catename }}</label>
			</view>
		</scroll-view>
		<!-- right右侧二级分类详情 -->
		<scroll-view scroll-y class="right">
			<view class="row">
				<view class="row_list" v-for="(item,index) in classify" :key="index" @click="_toDetils(item.pid)">
					<image :src="item.img|filter" mode="widthFix"></image>
					<text>{{item.catename}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import baseUrl from '../../utils/config.js'
	import Request from '../../utils/request.js'
	export default {
		data() {
			return {
				activeIndex: 0,
				cateData: [], //左侧一级分类数据
				classify: [] //右侧二级分类详情	
			}
		},
		onLoad() {
			this._getcates()
		},
		methods: {
			//获取商品分类数据列表
			_getcates: async function() {
				const res = await Request.getcates()
				if (res.data.code == 200) {
					this.cateData = res.data.list
					this._firstMenu(res.data.list[0].id,0)
				}
			},
			//左侧列表点击事件
			_firstMenu: function(id, index) {
				if (this.cateData[index].children) {
					var arr = this.cateData[index].children.map(item => {
						if(item.pid == this.cateData[index].id){
							return item
						}
					})
				}
				this.activeIndex=index
				arr?this.classify=arr:this.classify=[]
			},
			//点击进入商品详情
			_toDetils:function(pid){
				uni.navigateTo({
					url:'../product/product?fid='+pid
				})
			}
		},
		filters:{
			//处理照片
			filter(e){
				return baseUrl + e
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");

	/* 点击左侧导航，显示动态样式 */
	.activeList {
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
