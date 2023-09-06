

class speedCall {
	//激活函数
	stop() {
		this.isStop = true
	}
	
	emit(e?: any) {
		if (!this.currentTimer) this.init()
		this.currentEmit++
	}
	
	init() {
		this.isStop = false
		this.currentSpeed = this.baseSpeed
		this.currentEmit = 1
		this.currentEmitLast = 0
		this.remaining = this.currentSpeed
		//计算速度
		this.speedTimer = setInterval(() => {
			this.currentSpeed += this.a
		}, this.granularity)
		//计算拉却
		this.coolTimer = setInterval(() => {
			if (this.currentEmitLast == this.currentEmit) return this.reset()
			this.currentEmitLast = this.currentEmit
		}, this.cool)
		//计算call
		this.currentTimer = setInterval(() => {
			this.remaining = this.currentSpeed
			const range = Math.floor(this.currentSpeed)
			for (let i = 0; i < range; i++) {
				setTimeout(() => {
					if (!this.remaining >= 1) return
					if (this.isStop) return;
					this.remaining--
					this.callback()
				}, 1000 * i / range)
			}
		}, 1000)
	}
	
	reset() {
		clearInterval(this.coolTimer)
		clearInterval(this.currentTimer)
		clearInterval(this.speedTimer)
		delete this.currentTimer
		delete this.coolTimer
		delete this.speedTimer
		this.currentSpeed = this.baseSpeed
	}
	
	isStop: boolean
	granularity: number
	callback: any
	baseSpeed: number
	maxSpeed: number
	time: number
	cool: number
	currentSpeed: number
	currentEmit: number
	currentEmitLast: number
	remaining: number
	speedTimer: any
	currentTimer: any
	coolTimer: any
	a: number
	
	
	constructor(config: {
		//最大速度
		maxSpeed?: number,
		//初始速度
		baseSpeed?: number
		//加速时间
		time?: number
		//回调函数
		call: any
		//粒度
		granularity?: number
		//冷却检测
		cool?: number
	}) {
		this.callback = config.call || function () {
		}
		this.baseSpeed = config.baseSpeed || 1
		this.maxSpeed = config.maxSpeed || 50
		this.granularity = config.granularity || 250
		this.cool = config.cool || 500
		this.time = config.time || 5000
		this.a = (this.maxSpeed - this.baseSpeed) / this.time * 1000 / (1000 / this.granularity)
	}
}

class pressTimer {
	iter: any
	
	init(e?) {
		if (!this.iter) {
			this.iter = setInterval(() => {
				if(this.isCool) return
				this.call(e)
			}, this.time)
			this._start(e)
		}
	}
	
	//在reset/out 之前无法触发
	cool() {
		this.isCool = true
		this.isPress = false
	}
	
	private _stop(e?) {
		this.isPress = false
		this.stop(e)
	}
	
	private _start(e?) {
		this.isPress = true
		this.start(e)
	}
	
	reset(e?) {
		this.isCool = false
		if (this.iter) {
			clearInterval(this.iter)
			this.iter = null
			this._stop(e)
		}
		
	}
	
	stop
	start
	
	in(e?) {
		if (this.isCool) return
		this.init(e)
	}
	
	out(e?) {
		this.reset(e)
	}
	
	isPress = false
	isCool = false
	
	time: number
	call: any
	var:any = {}
	constructor(config: {
		time?: number
		call
		stop?
		start?
	}) {
		this.time = config.time || 150
		this.call = config.call || function () {
		}
		this.stop = config.stop || function () {
		}
		this.start = config.start || function () {
		}
	}
}

const initMessage = () => {
	if (!window.initTMessage) {
		window.initTMessage = true
		const dom = document.createElement('div')
		dom.setAttribute('id', 't-message-container')
		dom.style.position = 'absolute'
		dom.style.left = '0'
		dom.style.top = '0'
		dom.style.width = '100%'
		dom.style.height = '100%'
		dom.style.zIndex = '999'
		dom.style.pointerEvents = 'none'
		document.body.appendChild(dom)
	}
}

const message = (m: any = '', config: {
	title?: string
	type?: 'success' | 'warn' | 'info' | 'error'
	pos?: {
		left?
		right?
		top?
		bottom?
	}
	icon?: string
	time?: number
	height?: number
	width?: number
	description?: string
} = {}) => {
	initMessage()
	const time = config.time || ((message.length < 25) ? 5 * 1000 : message.length / 5 * 1000)
	const pos = config?.pos || {right: 0, top: 0}
	const height = config?.height || 150
	const width = config.width || 250
	const title = config.title || '提示'
	const id = Math.random().toString().substr(2)
	const color = {
		info: 'blue',
		warn: 'orange',
		success: 'green',
		error: 'red'
	}[config.type] || 'blue'
	const dom = document.createElement('div')
	dom.setAttribute('id', id)
	dom.style.transitionDuration = '0.3s'
	dom.onclick = () => {
		close()
	}
	const reopen = () => {
		message(m, config)
	}
	const close = () => {
		const dom: HTMLElement = document.querySelector(`[id="${id}"]`)
		if (!dom) return
		dom.style.opacity = '0'
		setTimeout(() => {
			dom.remove()
		}, 500)
	}
	document.querySelector(`[id="t-message-container"]`).appendChild(dom)
	
	createApp({
		render: () => h('div', {
			id,
			style: {
				width: '100%',
				height: height + 'px',
				position: 'relative'
			}
		}, [
			h(TIconCard, {
				icon: config.icon,
				description: config.description || '新消息',
				title,
				color,
				style: Object.assign({}, {
					width: width + 'px',
					height: height + 'px',
					position: 'absolute',
				}, pos)
			}, [
				h('div', {
					style: {
						color: 'white'
					}
				}, m)
			])
		])
	})
		.mount(`[id="${id}"]`)
	setTimeout(() => {
		close()
	}, time)
	return {close, reopen}
}

const playDuangSound = () => {
	// 创建 AudioContext 对象
	const audioContext = new (window.AudioContext || window.webkitAudioContext)();
	
	// 创建 OscillatorNode 对象
	const oscillator = audioContext.createOscillator();
	
	// 创建 GainNode 对象
	const gain = audioContext.createGain();
	
	// 创建 BiquadFilterNode 对象（共振滤波器）
	const filter = audioContext.createBiquadFilter();
	filter.type = 'bandpass'; // 设置为带通滤波器
	filter.frequency.value = 1000; // 设置频率
	filter.Q.value = 10; // 设置共振强度
	
	// 设置正弦波参数
	oscillator.type = 'sine'; // 设置为正弦波
	oscillator.frequency.value = 500; // 设置频率
	
	// 设置音量参数
	gain.gain.value = 1; // 设置音量大小
	
	// 连接节点
	oscillator.connect(filter);
	filter.connect(gain);
	gain.connect(audioContext.destination);
	
	// 开始播放
	oscillator.start();
	
	// 停止播放
	setTimeout(() => {
		oscillator.stop();
	}, 500);
}

export const NUtils = new class {
	text2rgb(name, key: number = 180) {
		name += 'ABCDEPKAPEFP和'
		let sum = 0;
		for (let s of name) sum += s.codePointAt(0);
		return [sum % (key), sum % (key + 1), sum % (key + 2)];
	}
	
	//加速度函数
	speedCall = speedCall
	pressTimer = pressTimer
	playDuangSound = playDuangSound
	message = message
	alert (...arg) {
		alert(...arg)
	}
	parseClass (d) {
		if (typeof d === 'string') {
			let a = d.split(' ')
			let res = {}
			a.map((q)=>{
				res [q] = true
			})
			return res
		}
		return d || {}
	}
}


