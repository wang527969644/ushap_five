import baseUrl from './config'

const http=(option)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+option.url,
			method:option.method || 'GET',
			data:option.data||{},
			header:option.header ||{
				'concent-type':"application/x-www-form-urlencoded"
			},
			success:resolve,
			fail:reject
		})
	})
}

export {
	http
}