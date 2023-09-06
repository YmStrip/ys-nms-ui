

class ColorEdit {
	constructor(r,g,b,a=1,actions=[]) {
		this.r = r
		this.g = g
		this.b = b
		this.a = a
		this.actions = actions
	}
	actions: any[] = []
	r: number
	g: number
	b: number
	a: number
	setAlpha (a:number) {
		this.a = a
		this.actions.push({
			type: 'setAlpha',
			data: [a]
		})
		return this
	}
	addRgb2Hex (a:number) {
		return ColorUtils.addColorRgb([this.r,this.g,this.b,this.a],a)
	}
	dump () {
		return ColorUtils.rgb2hex(this)
	}
	copyActions () {
		let d = []
		for (let i in this.actions) {
			d.push(this.actions[i])
		}
		return d
	}
	setActions (d:any) {
		this.actions = d
		return this
	}
	runActions () {
		for (let i in this.actions) {
			if (this[this.actions[i].type]) {
				this[this.actions[i].type](...(this.actions[i].data||[]))
			}
		}
		return this
	}
	parse (data:any) {
		return ColorUtils.getRgb(data)
	}
	pipe (is=false) {
		if (is) {
			
			return  new ColorEdit(this.r,this.g,this.b,this.a,this.copyActions());
		}
		return new ColorEdit(this.r,this.g,this.b,this.a);
	}
	multiOpacity (key:number) {
		this.actions.push({
			type: 'multiOpacity',
			data: [key]
		})
		this.a *= key
		return this
	}
	dumpBack (active?:any) {
		if (active) {
			return this
				.parse(active)
				.multiOpacity(0.3)
				.dump()
		}
		else {
			return this
				.parse(
					ColorUtils
						.getColorType(this.dump())
						.backColor
				)
				.multiOpacity(0.1)
				.dump()
		}
	}
}

export type YsColor = {
	//主题色
	mainColor: string;
	//文字颜色
	textColor: string
	//背景颜色
	backColor: string
	//文字反色
	opColor: string
}

export const ColorUtils = new class {
	colorList = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff","beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887","cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff","darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f","darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1","darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff","feldspar":"#d19275","firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff","gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f","honeydew":"#f0fff0","hotpink":"#ff69b4","indianred":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c","lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2","lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslateblue":"#8470ff","lightslategray":"#778899","lightsteelblue":"#b0c4de","lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6","magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee","mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5","navajowhite":"#ffdead","navy":"#000080","oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6","palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1","saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4","tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0","violet":"#ee82ee","violetred":"#d02090","wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5","yellow":"#ffff00","yellowgreen":"#9acd32"}
	str2rgb(data: string | [number, number, number]) {
		let r = 0, g = 0, b = 0 , a = 1
		if (typeof data === "string") {
			if (this.isRgba(data)) {
				const colors = data.toLowerCase().replace(/rgba\(/g, "").replace(/\)/g, "").split(",")
				r = parseInt(colors[0])
				g = parseInt(colors[1])
				b = parseInt(colors[2])
				a = parseInt(colors[3])
			}
			//
			else if (this.isRgb(data)) {
				const colors = data.toLowerCase().replace(/rgb\(/g, "").replace(/\)/g, "").split(",")
				r = parseInt(colors[0])
				g = parseInt(colors[1])
				b = parseInt(colors[2])
				a = 1
			}
			//
			else if (this.isHex(data)) {
				r = parseInt(data.substring(1, 3), 16)
				g = parseInt(data.substring(3, 5), 16)
				b = parseInt(data.substring(5, 7), 16)
				a = (parseInt(data.substring(7, 9), 16) || 255) / 255
			} else return {r: 0, g: 0, b: 0,a}
		} else if (Array.isArray(data)) {
			return {r: data[0], g: data[1], b: data[2],a:data[3]||1}
		}
		return {r, g, b,a};
	}
	ColorEdit = ColorEdit
	formatColor(data: string | [number, number, number]) {
		let rgb = this.getRgb(data);
		return this.rgb2hex([rgb.r, rgb.g, rgb.b]);
	}
	
	rgb2hex(data: { r: number, g: number, b: number , a?: number } | number [] | string) {
		
		if (typeof data === 'string') return data
		let r = 0,g=0,b=0,a =1
		if (Array.isArray(data)) {
			r = data[0]
			g = data[1]
			b = data[2]
			a = data[3] || 1
		}
		else if (typeof data==='object') {
			r = data.r
			g = data.g
			b = data.b
			a = data.a || 1
		}
		else {
			return "#000000"
		}
		
		let _r = r.toString(16)
		let _g = g.toString(16)
		let _b = b.toString(16)
		let _A = Math.round((a*255))
		if (_A>255) _A = 255
		if (_A<0) _A = 0
		let _a = _A.toString(16)
		if (_r.length == 1) _r = '0' + _r
		if (_g.length == 1) _g = '0' + _g
		if (_b.length == 1) _b = '0' + _b
		if (_a.length == 1) _a = '0' + _a
		return `#${_r}${_g}${_b}${_a}`
	}
	
	getRgb(data: string | [number, number, number]) {
		if (typeof data==='string') {
			// @ts-ignore
			if (this.colorList[data.toLowerCase()]) data = this.colorList[data.toLowerCase()]
		}
		let r, g, b, a
		if (typeof data === 'string') {
			let obj = this.str2rgb(data)
			r = obj.r
			g = obj.g
			b = obj.b
			a = obj.a || 1
		} else if (Array.isArray(data)) {
			r = data[0]
			g = data[1]
			b = data[2]
			a = data[3] || 1
		} else {
			r = 0
			g = 0
			b = 0
			a = 1
		}
		if (!Number.isFinite(r + g + b)) {
			r = 0
			g = 0
			b = 0
			a = 1
		}
		return new ColorEdit(r,g,b,a)
	}
	isHex(data: string) {
		return data.toLowerCase().includes('#')
	}
	
	isRgb(data: string) {
		return data.toLowerCase().includes('rgb')
	}
	isRgba(data: string) {
		return data.toLowerCase().includes('rgba')
	}
	
	private getRgbKey(data: string | [number, number, number]) {
		let key: any = data
		if (Array.isArray(data)) {
			key = data.join(',')
		}
		return key
	}
	
	
	private Cache_getColorType: Record<string, any> = {}
	private Cache_addColorRgb: Record<string, any> = {}
	
	//获取一个颜色对象
	getColorType(data: string | [number, number, number] | YsColor): YsColor {
		if (typeof data === 'object') {
			if (!Array.isArray(data)) {
				return data
			}
		}
		let key = this.getRgbKey(data)
		if (this.Cache_getColorType[key]) return this.Cache_getColorType[key]
		
		let textColor, opColor, backColor,mainColor
		let {r, g, b} = this.getRgb(data)
		
		let grayLevel = (0.299 * r + 0.587 * g + 0.114 * b) / 255
		if (grayLevel > 0.5) {
			textColor = '#000000'
			opColor = '#ffffff'
			backColor = '#ffffff'
		} else {
			textColor = '#ffffff'
			opColor = '#000000'
			backColor = '#000000'
		}
		mainColor = this.rgb2hex({r, g, b})
		
		let res = {mainColor,textColor,backColor,opColor}
		this.Cache_getColorType[key] = res
		return res
	}
	
	//修正颜色亮度
	addColorRgb(data: string | number[], add: number) {
		let key = this.getRgbKey(data) + '-' + add
		if (this.Cache_addColorRgb[key]) return this.Cache_addColorRgb[key]
		let {r, g, b} = this.getRgb(data)
		
		if (!Number.isFinite(add)) add = 20
		add = Math.abs(add)
		let grayLevel = (0.299 * r + 0.587 * g + 0.114 * b) / 255
		//倍数
		if (grayLevel>=0&&grayLevel<=0.5) {
			add += 80
		}
		if (grayLevel < 0.5) {
			r += add
			g += add
			b += add
		} else {
			r -= add
			g -= add
			b -= add
		}
		
		if (r > 255) r = 255
		if (g > 255) g = 255
		if (b > 255) b = 255
		if (r < 0) r = 0
		if (g < 0) g = 0
		if (b < 0) b = 0
		
		let hex = this.rgb2hex({r, g, b})
		
		this.Cache_addColorRgb[key] = hex
		return hex
	}
	
	
	
}
