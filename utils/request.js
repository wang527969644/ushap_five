import {
	http
} from './http.js'
import baseUrl from './config.js'

//请求首页快速导航列表
const getHomePageList = function() {
	return http({
		url: '/api/getcate'
	})
}
//请求轮播图
const getBannerList = function() {
	return http({
		url: '/api/getbanner'
	})
}
//处理图片
const imgUrl = function(url) {
	return url.map(item => {
		return baseUrl + item.img
	})
}
//请求的秒杀
const getSeckill = function() {
	return http({
		url: '/api/getseckill'
	})
}
//获取全部商品信息
const getIndexGoods = function() {
	return http({
		url: '/api/getindexgoods'
	})
}
//获取商品分类信息
const getcates = function() {
	return http({
		url: "/api/getcates"
	})
}
//获取一级分类下的所有商品（分页版本）
const getcategoods = function(data = {}) {
	return http({
		url: "/api/getcategoods",
		data
	})
}
//根据ID获取商品信息
const getgoodsinfo = function(data = {}) {
	return http({
		url: '/api/getgoodsinfo',
		data
	})
}
//发送验证吗
const getTelCode = function(data = {}) {
	return http({
		url: "/api/sms",
		data
	})
}
//登录
const submitBtn = function(data = {}) {
	return http({
		url: "/api/wxlogin",
		data
	})
}
//加入购物车
const addCar = function(token, data = {}) {
	return http({
		url: "/api/cartadd",
		data,
		header: {
			'content-type': "application/x-www-form-urlencoded",
			'authorization': token
		}

	})
}
//请求购物车列表
const cartlist = function(token, data = {}) {
	return http({
		url: "/api/cartlist",
		data,
		header: {
			'content-type': "application/x-www-form-urlencoded",
			'authorization': token
		}
	})
}
//修改购物车列表
const reclist = function(token, data = {}) {

	return http({
		url: "/api/cartedit",
		data,
		header: {
			'content-type': "application/x-www-form-urlencoded",
			'authorization': token
		}
	})
}
//购物车删除
const removelist = function(token, data = {}) {
	return http({
		url: "/api/cartdelete",
		data,
		header: {
			'content-type': "application/x-www-form-urlencoded",
			'authorization': token
		}
	})
}
//提交订单
const orderadd = function(token,data) {
	console.log(data)
	return http({
		url: "/api/orderadd",
		data,
		header: {
			'content-type': "application/x-www-form-urlencoded",
			'authorization': token
		}
	})

}
//搜索
const search = function(data){
	return http({
		url:"/api/search",
		data
	})
}
//日期格式化
const moment =  function() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
         + " " + date.getHours() + seperator2 + date.getMinutes()
         + seperator2 + date.getSeconds();
    return currentdate;
}
const getOrders = function(token,data){
	return http({
		url:"/api/orders",
		data,
		header: {
			'content-type': "application/x-www-form-urlencoded",
			'authorization': token
		}
	})
}
export default {
	getHomePageList,
	getBannerList,
	imgUrl,
	getSeckill,
	getIndexGoods,
	getcates,
	getgoodsinfo,
	getTelCode,
	submitBtn,
	getcategoods,
	addCar,
	cartlist,
	reclist,
	removelist,
	orderadd,
	search,
	moment,
	getOrders
}
