<template>
	<view class="">
		<!-- 搜索框区域 -->
		<view class="head">
			<image src="../../static/index/logo.jpg" mode="widthFix"></image>
			<view class="searchview">
				<input type="text" value="" placeholder="寻找商品" @focus="_getsearch" />
			</view>
		</view>
		<!-- 快速分类导航 滚动视图 -->
		<scroll-view scroll-x class="quicknav">
			<view @click="_clickHomePageList(index)" v-for="(item,index) in quicknav" :key="index"    >
				<text :class="index == topindex ? 'navactive' : '' ">{{item.catename}}</text>
			</view>
		</scroll-view>
		<!-- 轮播图 -->
		<swiper indicator-dots circular autoplay :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swipers" :key="index">
				<image :src="item" mode=widthFix></image>
			</swiper-item>
		</swiper>
		<!-- 功能导航 -->
		<view class="funnav">
			<view class="funnavrow" v-for="(item,index) in funNavList" :key="index" @click="_getGoodsClass(item.name)">
				<image :src="item.icon" mode="widthFix"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<!-- 秒杀商品推荐区域 -->
		<view class="seckill">
			<!-- 秒杀左侧区域 -->
			<view class="leftseckill">
				<view class="title">
					<image src="../../static/index/xianshi.jpg" mode="widthFix"></image>
					<text>限时秒杀</text>
				</view>
				<view class="info">
					<text>每天零点场，好货抢不停</text>
				</view>
				<view class="time">
					<view>00</view>:
					<view>00</view>:
					<view>00</view>
					<view>秒杀</view>
				</view>
				<image src="../../static/index/goods2.jpg" mode="widthFix" class="goodimg"></image>
			</view>
			<!-- 秒杀右侧区域 -->
			<view class="rightseckill">
				<view class="top">
					<view class="topinfo">
						<text>品牌上新 <text style="background: #f33182;font-size: 28rpx;color: white;">折</text></text>
						<text>每天九点，抢大牌</text>
					</view>
					<image src="../../static/index/goods1.jpg" mode="widthFix"></image>
				</view>
				<view class="bottom">
					<view class="bottomgood">
						<text>每日十件</text>
						<text>只为您好选</text>
						<image src="../../static/index/goods1.jpg" mode="widthFix"></image>
					</view>
					<view class="bottomgood">
						<text>每日十件</text>
						<text>只为您好选</text>
						<image src="../../static/index/goods1.jpg" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 广告图片推送区域 -->
		<view class="gg">
			<image src="../../static/index/swiper1.jpg" mode="widthFix"></image>
		</view>
		<!-- 推荐商品区域 -->
		<view class="recommendgood">
			<!-- 推荐导航 -->
			<view class="recommendnav">
				<view :class="switchIndex==0?'recommendactive':''" @click="setswitchIndex(0)">
					<text>热门推荐</text>
				</view>
				<view  :class="switchIndex==1?'recommendactive':''"  @click="setswitchIndex(1)">
					<text>上新推荐</text>
				</view>
				<view  :class="switchIndex==2?'recommendactive':''"  @click="setswitchIndex(2)">
					<text>所有商品</text>
				</view>
			</view>
			<view class="recommendlist" v-for="(item,index) in getGoods" :key="index" @click="goDetails(item.id)">
				<view class="recommendrow">
					<image :src="item.img[0]"  mode="widthFix"></image>
					<view class="recommendrowinfo">
						<text>{{item.goodsname}}</text>
						<text>现价格： ￥{{item.price}}</text>
						<text>原价格：￥{{item.market_price}}</text>
						<text>
							立即抢购
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Request from '../../utils/request'
	export default {
		data() {
			return {
				quicknav: [], //快速分类导航,
				topindex: 0,
				swipers: [],
				products: [], //热销、上新、所有商品数据
				funNavList: [{ //功能导航数据
						name: "限时抢购",
						icon: require("../../static/index/xiaohuoban.png")
					},
					{
						name: "积分商城",
						icon: require("../../static/index/jifentixicopy.png")
					},
					{
						name: "联系我们",
						icon: require("../../static/index/lianxiwomen.png")
					},
					{
						name: "商品分类",
						icon: require("../../static/index/-shangpinfenlei-gai.png")
					}
				],
				switchIndex:0
			}
		},
		onLoad() {
			this._getHomePageList()
			this._getBannerList()
			this._getSeckill()
			this._getIndexGoods()
		},
		computed:{
			getGoods:function(){
				if(this.products[this.switchIndex]){
					return this.products[this.switchIndex].content
				}else{
					return []
				}
			}
		},
		methods: {
			//搜索框获取焦点跳转至搜索页面
			_getsearch(){
				uni.navigateTo({
					url:'../search/search'
				})
			},
			//获取首页快速分类导航
			_getHomePageList: async function(){
				const res = await Request.getHomePageList()
				if(res.statusCode == 200 ){
					this.quicknav = res.data.list
				}
			},
			//点击首页快速分类导航,跳到相应的分类列表
			_clickHomePageList:function(index){
				this.topindex = index
				uni.navigateTo({
					url:'../product/product?id='+this.quicknav[index].id
				})
			},
			//请求轮播图列表
			_getBannerList:async function(){
				const res = await Request.getBannerList()
				if(res.statusCode == 200 ){
					this.swipers = Request.imgUrl(res.data.list)
				}
			},
			//请求显示秒杀
			_getSeckill:async function(){
				const res = await Request.getSeckill()
				//没有数据
			},
			//获取所有商品数据
			_getIndexGoods:async function(){
				const res = await Request.getIndexGoods()
				if(res.statusCode ==200){
					this.products = res.data.list
					this.products.forEach(item=>{
						for(let i =0;i <item.content.length;i++){
							item.content[i].img = Request.imgUrl([{'img':item.content[i].img}])
						}
					})
				}	
			},
			setswitchIndex:function(index){
				this.switchIndex = index
			},
			//商品分类
			_getGoodsClass:function(e){
				if(e == '商品分类'){
					uni.navigateTo({
						url:"../classify/classify"
					})
				}
			},
			//点击商品进入商品详情
			goDetails:function(id){
				uni.navigateTo({
					url:"../details/details?id="+id
				})
			}
		}
	}
</script>

<style>
@import url("../../common/css/index.css");
</style>
